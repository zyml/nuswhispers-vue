import startsWith from 'lodash/startsWith';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Route } from 'vue-router';
import title from '../../mixins/title';
import MainNav from '../MainNav/index.vue';
import Sidebar from '../Sidebar/index.vue';

@Component({
  components: {
    MainNav,
    Sidebar,
  },
  name: 'app',
})
export default class App extends Vue {
  public loading: boolean = false;

  public mounted() {
    this.$router.beforeEach((to: Route, from: Route, next: () => void) => {
      if (!startsWith(to.path, '/search') || !startsWith(from.path, '/search')) {
        this.loading = true;
      }
      next();
    });

    this.$router.afterEach(() => {
      this.loading = false;
    });
  }
}
