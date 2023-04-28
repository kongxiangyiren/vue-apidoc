/// <reference types="vite/client" />

declare module 'highlightjs-line-numbers2.js';
declare module 'jsonsql';
declare module 'markdown-it-todo';
declare module 'markdown-it-tips';

interface Window {
  hljs: import('highlight.js').HLJSApi;
}
