// windi.config.ts
import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
  // darkMode: 'class',
  attributify: {
    // 前缀 修改后重启编辑器
    prefix: 'wi-'
  }
});
