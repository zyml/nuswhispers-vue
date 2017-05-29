import Vue from 'vue';
import createDynamicListView from '../DynamicListView';

export default createDynamicListView('category', (vm: Vue) =>
  `${vm.$store.getters.categoryById(vm.$route.params.id).confessionCategory} - NUSWhispers`,
);
