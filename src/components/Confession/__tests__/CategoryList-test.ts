import Vue from 'vue';
import { createRenderer } from 'vue-server-renderer';
import Vuex from 'vuex';
import createStore from '../../../store';
import CategoryList from '../CategoryList.vue';

Vue.use(Vuex);

describe('CategoryList', () => {
  const renderer = createRenderer();
  const store = createStore();
  store.state.categories = {
    '1': { confessionCategory: 'Foo', confessionCategoryId: '1' }, // tslint:disable-line
    '2': { confessionCategory: 'Bar', confessionCategoryId: '2' }, // tslint:disable-line
  };

  it('renders correctly with categories', () => {
    const Ctor = Vue.extend(CategoryList);
    const vm = new Ctor({
      propsData: {
        ids: ['1', '2'],
      },
      store,
    });

    renderer.renderToString(vm, (err: Error | undefined, html: string) => {
      expect(html).toMatchSnapshot();
    });
  });

  it('renders correctly with one category', () => {
    const Ctor = Vue.extend(CategoryList);
    const vm = new Ctor({
      propsData: {
        ids: ['1'],
      },
      store,
    });

    renderer.renderToString(vm, (err: Error | undefined, html: string) => {
      expect(html).toMatchSnapshot();
    });
  });

  it('renders correctly with no categories', () => {
    const Ctor = Vue.extend(CategoryList);
    const vm = new Ctor({
      propsData: { ids: [] },
      store,
    });

    renderer.renderToString(vm, (err: Error | undefined, html: string) => {
      expect(html).toMatchSnapshot();
    });
  });
});
