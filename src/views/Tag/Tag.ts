import Vue from 'vue';
import createDynamicListView from '../DynamicListView';

export default createDynamicListView('tag', (vm: Vue) =>
  `#${vm.$route.params.id} - NUSWhispers`,
);
