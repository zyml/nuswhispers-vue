declare module 'vue-infinite-scroll' {
  import { VNodeDirective, VNode } from 'vue';

  export function bind(
    el: HTMLElement,
    binding: VNodeDirective,
    vnode: VNode,
    oldVnode: VNode
  ): void;

  export function unbind(
    el: HTMLElement,
    binding: VNodeDirective,
    vnode: VNode,
    oldVnode: VNode
  ): void;
}
