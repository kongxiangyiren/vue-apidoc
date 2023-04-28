/// <reference types="vite/client" />

declare module 'highlightjs-line-numbers2.js';
declare module 'jsonsql';
declare module 'markdown-it-todo';
declare module 'markdown-it-tips';
declare module 'markdown-it-replace-link';

interface Window {
  hljs: import('highlight.js').HLJSApi;
}
