import Vue from 'vue';
import { createRenderer } from 'vue-server-renderer';
import ConfessionContent from '../ConfessionContent.vue';

describe('ConfessionContent', () => {
  const renderer = createRenderer();
  const Ctor = Vue.extend(ConfessionContent);

  it('renders correctly with normal text', () => {
    const vm = new Ctor({
      propsData: {
        content: 'Hello World!',
      },
    });

    renderer.renderToString(vm, (err: Error | undefined, html: string) => {
      expect(html).toMatchSnapshot();
    });
  });

  it('renders correctly with tags', () => {
    const vm = new Ctor({
      propsData: {
        content: 'Hello! #firstworldproblems',
      },
    });

    renderer.renderToString(vm, (err: Error | undefined, html: string) => {
      expect(html).toMatchSnapshot();
    });
  });

  it('renders correctly with HTML tags', () => {
    const vm = new Ctor({
      propsData: {
        content: 'Hello! #foo <script>console.log("YOLO");</script>',
      },
    });

    renderer.renderToString(vm, (err: Error | undefined, html: string) => {
      expect(html).toMatchSnapshot();
    });
  });

  it('renders correctly with URLs', () => {
    const vm = new Ctor({
      propsData: {
        content: 'Hello! https://www.google.com.sg/',
      },
    });

    renderer.renderToString(vm, (err: Error | undefined, html: string) => {
      expect(html).toMatchSnapshot();
    });
  });
});
