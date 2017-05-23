import Vue from 'vue';
import { createRenderer } from 'vue-server-renderer';
import Box from '../index.vue';

describe('Box', () => {
  const renderer = createRenderer();

  it('renders correctly', () => {
    const vm = new Vue({
      render: (h) => h(Box, 'hello'),
    });
    renderer.renderToString(vm, (err: Error | undefined, html: string) => {
      expect(html).toMatchSnapshot();
    });
  });
});
