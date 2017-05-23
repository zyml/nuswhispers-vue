import State from '../src/store/state';

declare global {
  interface Window {
    __INITIAL_STATE__: State;
  }
}
