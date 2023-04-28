import MarkdownIt from 'markdown-it';
import highlightjsLineNumbers from 'highlightjs-line-numbers2.js';
import ClipboardJS from 'clipboard';
import '@/assets/hljs.css';

// 路径设置
import link from 'markdown-it-replace-link';

// 任务列表
import todo from 'markdown-it-todo';
import '@/assets/todo-list.css';

// Tip 提示插件
import tips from 'markdown-it-tips';
import '@/assets/tip.css';
import type { HLJSApi } from 'highlight.js';

const md = new MarkdownIt()
  .use(todo)
  .use(tips)
  .use(link, {
    processHTML: true, // defaults to false for backwards compatibility
    replaceLink: function (link: string, env: any, token: any, htmlToken: any) {
      if (link.slice(0, 4) !== 'http') {
        return import.meta.env.BASE_URL.slice(0, import.meta.env.BASE_URL.length - 1) + link;
      }
      return link;
    }
  });

//摘自CSDN
/*生成复制按钮*/
//复制按钮
function codecopy_func() {
  const btn = `<div class="codecopy-btn" data-title="复制" data-clipboard-action="copy" data-clipboard-target="#code_index" onclick="let t=this;t.innerHTML='复制成功';setTimeout(function(){t.innerHTML='复制';},1500);">复制</div>`;
  //获取所有的代码区域的pre元素节点
  const codecopys = document.getElementsByTagName('pre');
  //遍历DOM（pre节点）节点
  for (let i = 0; i < codecopys.length; i++) {
    //pre元素对象
    const codecopy = codecopys[i];

    // console.log(codecopy);

    //生成复制按钮
    const html_temp = btn.replace(/index/g, i + '');

    //找到code元素，并添加id属性，id的值和复制按钮的属性 data-clipboard-target 的值是一样的
    //判断pre标签内是否含有code标签，如是则执行

    if (codecopy.querySelector('code')?.nodeName == 'CODE') {
      //  @ts-ignore
      codecopy.querySelector('code').id = 'code_' + i;
      //将复制按钮追加至页面
      const html = codecopy.innerHTML + html_temp;

      codecopy.innerHTML = html;
    }
  }
  /*初始化复制功能*/
  const clipboardJs = new ClipboardJS('.codecopy-btn'); //注意：ClipboardJS替代了Clipboard

  /*复制失败事件*/
  clipboardJs.on('error', function (e) {
    console.log(e);
  });
}

export function mdParse(con: string) {
  // 如果是开发环境或者不使用cdn就引入
  if (import.meta.env.DEV || import.meta.env.VITE_APP_CDN !== 'true') {
    import('github-markdown-css/github-markdown-light.css');
  }

  return md.render(con);
}

export async function getHljs() {
  let hljs: HLJSApi;

  if (import.meta.env.VITE_APP_CDN === 'true' && !import.meta.env.DEV) {
    hljs = window.hljs;
  } else {
    hljs = (await import('highlight.js/lib/common')).default; //通用语言
  }

  setTimeout(() => {
    hljs.highlightAll();
    highlightjsLineNumbers.init(hljs); //需要将 highlight.js 传入进行方法替换

    // 折叠代码块
    import('@/assets/collapser.css');
    const collapserHtml = `<div class="collapser" onclick="
   this.classList[1] ? this.classList.remove('no-collapser') : this.classList.add('no-collapser');
    let t=this.nextElementSibling; t.style.display==='block'?t.style.setProperty('display','none','important'):t.style.setProperty('display','block','important');
    let x=t.nextElementSibling; x.style.display=x.style.display==='block'?'none':'block';
    "><span class="no-triangle">▼</span><span class="triangle">▶</span> 点击展开/折叠代码</div>`;
    const codeblocks = document.getElementsByTagName('code');
    for (let i = 0; i < codeblocks.length; i++) {
      const codeblock = codeblocks[i];
      const parent = codeblock.parentElement;
      if (parent?.nodeName === 'PRE') {
        parent.innerHTML = collapserHtml + parent.innerHTML;
      }
    }

    codecopy_func();
    //@ts-ignore
    hljs.initLineNumbersOnLoad();
  }, 0);
}
