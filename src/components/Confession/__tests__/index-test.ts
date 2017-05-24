import format from 'date-fns/format';
import subDays from 'date-fns/sub_days';
import Vue from 'vue';
import { createRenderer } from 'vue-server-renderer';
import Vuex from 'vuex';
import createStore from '../../../store';
import Confession from '../index.vue';

Vue.use(Vuex);

// Mock current date to 2017-05-03 00:00:00.
Date.now = jest.fn(() => 1493769600);

describe('Confession', () => {
  const renderer = createRenderer();

  it('renders correctly', () => {
    const Ctor = Vue.extend(Confession);
    const vm = new Ctor({
      propsData: {
        item: {
          categories: [],
          confessionId: 1,
          content: 'Hello World!',
          createdAt: '2017-05-01 00:00:00',
          facebookInformation: '1',
          favourites: [],
          fbCommentCount: 0,
          fbLikeCount: 0,
          fbPostId: 1,
          images: null,
          status: 'Approved',
          statusUpdatedAt: '2017-05-11 11:15:02',
          statusUpdatedAtTimestamp: '1494501302',
          updatedAt: '2017-05-12 13:01:57',
          views: 10,
        },
      },
      store: createStore(),
    });

    renderer.renderToString(vm, (err: Error | undefined, html: string) => {
      expect(html).toMatchSnapshot();
    });
  });
});
