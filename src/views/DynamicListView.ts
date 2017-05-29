import Vue, { Component } from 'vue';
import { Route } from 'vue-router';
import ASyncComponent, { InitialDataProps } from '../components/ASyncComponent';
import List from '../components/List/index.vue';
import meta from '../mixins/meta';
import title from '../mixins/title';
import { Confession } from '../store/state';
import capitalize from '../utils/capitalize';

/**
 * A factory function for creating dynamic list views (eg. Tag, Category, etc)
 */
export default function createDynamicListView(type: string, parseTitle: (vm: Vue) => string): Component {
  const niceType = capitalize(type);

  @ASyncComponent({
    components: {
      List,
    },
    mixins: [meta, title],
  })
  class DynamicListView extends Vue {
    public loading: boolean = false;

    get items(): Confession[] {
      return this.$store.getters[`listBy${niceType}`](this.$route.params.id);
    }

    public beforeRouteUpdate(to: Route, from: Route, next: () => void) {
      // Fetch data if category ID is different from the previous one.
      if (to.params.id !== from.params.id) {
        return this.fetchInitialData({ store: this.$store, route: to }).then(() => next());
      }
      next();
    }

    public fetchInitialData({ store, route }: InitialDataProps): Promise<any> {
      this.loading = true;

      return store
        .dispatch(`getBy${niceType}`, route.params.id)
        .then(() => this.loading = false);
    }

    public fetchMore() {
      if (this.loading) {
        return;
      }

      this.loading = true;

      this.$store
        .dispatch(`getNextBy${niceType}`, this.$route.params.id)
        .then(() => this.loading = false);
    }

    public title(): string {
      return parseTitle(this);
    }
  }

  return DynamicListView;
}
