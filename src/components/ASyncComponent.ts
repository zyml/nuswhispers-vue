import Vue, { ComponentOptions } from 'vue';
import Component from 'vue-class-component';
import { Route } from 'vue-router';
import { Store } from '../store';

type VueClass = { new(): Vue } & typeof Vue;

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteUpdate',
  'beforeRouteLeave',
  'title',
  'meta',
]);

export const $staticMethods = [
  'fetchInitialData',
];

export interface InitialDataProps {
  store: Store;
  route: Route;
}

export declare interface ASyncComponent extends VueClass {
  fetchInitialData(props: InitialDataProps): Promise<any>;
}

/**
 * Wrap native JavaScript classes as Vue components and expose static
 * route methods for server-side rendering.
 */
function ASyncComponent<U extends Vue>(options: ComponentOptions<U>): <V extends VueClass>(target: V) => V {
  return (target: VueClass) => {
    const wrappedComponent = Component(options)(target) as ASyncComponent;

    $staticMethods.forEach((method) => {
      if (target.prototype[method]) {
        wrappedComponent[method] = target.prototype[method];
      }
    });

    return wrappedComponent;
  };
}

export default ASyncComponent;
