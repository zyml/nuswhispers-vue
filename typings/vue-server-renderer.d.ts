declare module 'vue-server-renderer' {
  import Vue from 'vue';

  type Bundle = string | object;
  type RenderCallback = (err: Error | undefined, res: string) => any;

  class BundleRenderer {
    renderToString(cb: RenderCallback): void;
    renderToString(context: object, cb: RenderCallback): void;

    renderToStream(context?: object): ReadableStream;
  }

  class Renderer {
    renderToString(vm: Vue, cb: RenderCallback): void;
    renderToString(vm: Vue, context: object, cb: RenderCallback): void;

    renderToStream(vm: typeof Vue, context?: object): ReadableStream;
  }

  interface RenderCache {
    get: (key: string, cb?: Function) => string | void;
    set: (key: string, val: string) => void;
    has?: (key: string, cb?: Function) => boolean | void;
  }

  interface RenderOptions {
    template?: string;
    clientManifest?: string;
    inject?: boolean;
    shouldPreload?: (file: string, type: string) => boolean;
    runInNewContext?: boolean | string;
    basedir?: string;
    cache?: RenderCache;
    directives?: any;
  }

  export function createRenderer(options?: RenderOptions): Renderer;
  export function createBundleRenderer(
    bundle: Bundle,
    options?: RenderOptions
  ): BundleRenderer;
}
