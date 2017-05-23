import Vue from 'vue';
import { createRenderer } from 'vue-server-renderer';
import NavIcon from '../NavIcon.vue';

describe('NavIcon', () => {
  const renderer = createRenderer();

  it('renders correctly', () => {
    const vm = new Vue({
      propsData: {
        icon: 'zoom-outline',
        to: '/search',
      },
      render: (h) => h(NavIcon),
    });
    renderer.renderToString(vm, (err: Error | undefined, html: string) => {
      expect(html).toMatchSnapshot();
    });
  });
});
