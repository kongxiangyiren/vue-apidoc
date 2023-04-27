import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

import WindiCSS from 'vite-plugin-windicss';
import importToCDN from 'vite-plugin-cdn-import';
import { createHtmlPlugin } from 'vite-plugin-html';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig(mode => {
  const env = loadEnv(mode.mode, process.cwd());
  let CDN;

  if (env.VITE_APP_CDN === 'true') {
    CDN = importToCDN({
      modules: [
        // vue
        {
          name: 'vue',
          var: 'Vue',
          path: 'https://unpkg.com/vue@3.2.47/dist/vue.global.prod.js'
        },

        // vue-router
        {
          name: 'vue-router',
          var: 'VueRouter',
          path: 'https://unpkg.com/vue-router@4.1.6/dist/vue-router.global.prod.js'
        },
        // axios
        {
          name: 'axios',
          var: 'axios',
          path: 'https://unpkg.com/axios@1.3.6/dist/axios.min.js'
        },
        // marked
        {
          name: 'marked',
          var: 'marked',
          path: 'https://unpkg.com/marked@4.3.0/lib/marked.umd.js'
        },
        {
          name: 'highlight.js',
          var: 'hljs',
          path: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js'
        },
        // clipboard
        {
          name: 'clipboard',
          var: 'ClipboardJS',
          path: 'https://unpkg.com/clipboard@2.0.11/dist/clipboard.min.js'
        }
      ]
    });
  }

  return {
    plugins: [
      vue(),
      WindiCSS(),
      CDN, // index.html 注入
      createHtmlPlugin({
        minify: true,
        /**
         * 需要注入 index.html ejs 模版的数据
         */
        inject: {
          data: {
            githubMarkdownCss:
              env.VITE_APP_CDN === 'true'
                ? '<link rel="stylesheet" href="https://unpkg.com/github-markdown-css@5.2.0/github-markdown-light.css">'
                : undefined
          }
        }
      }),
      viteCompression({
        disable: false, // 是否禁用 false:启用 ture:禁用
        verbose: false, // 是否在控制台输出压缩结果
        filter: /.(js|css|md|json)$/i, // 压缩文件的过滤规则
        threshold: 100, // 文件大小阈值，以字节为单位
        algorithm: 'gzip', // 压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
        ext: '.gz', // 	生成的压缩包后缀
        compressionOptions: {
          // 压缩选项
          level: 9 // 压缩等级，范围1-9,越小压缩效果越差，但是越大处理越慢，所以一般取中间值;
        },
        deleteOriginFile: true // 是否删除原始文件
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 1000,
      host: true
    },
    build: {
      // 打包目录
      outDir: './dist',

      // 静态文件管理,assetsDir和rollupOptions二选一
      // assetsDir:"assets",
      // rollupOptions: {
      //   output: {
      //     chunkFileNames: 'assets/js/[name]-[hash].js',
      //     entryFileNames: 'assets/js/[name]-[hash].js',
      //     assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      //   }
      // },

      // 移除log
      minify: 'terser',
      terserOptions: {
        compress: {
          //生产环境时移除console.log()
          drop_console: true,
          //生产环境时移除debugger
          drop_debugger: false
        }
      }
    }
  };
});
