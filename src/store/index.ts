import Vue from 'vue';
import Vuex, { Module, Plugin } from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import State from './state';

Vue.use(Vuex);

// Export Store type to avoid generics when needed.
export type Store = Vuex.Store<State>;

export default function createStore(): Vuex.Store<State> {
  return new Vuex.Store<State>({
    actions,
    getters,
    mutations,
    plugins: [],
    state: new State(),
  });
}
