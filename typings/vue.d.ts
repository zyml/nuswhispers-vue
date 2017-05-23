import Vue from 'vue';

interface Dictionary<T> { [key: string]: T; }

interface SSRContext {
  title?: string;
  meta?: string;
}

declare module 'vue/types/vue' {
  interface Vue {
    $ssrContext: SSRContext;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    title?: string | ((this: V) => string | undefined);
    meta?: Array<Dictionary<string>> | ((this: V) => Array<Dictionary<string>> | undefined);
  }
}
