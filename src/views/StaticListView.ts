import Vue, { Component } from 'vue';
import { mapGetters } from 'vuex';
import ASyncComponent, { InitialDataProps } from '../components/ASyncComponent';
import List from '../components/List/index.vue';
import meta from '../mixins/meta';
import title from '../mixins/title';
import capitalize from '../utils/capitalize';

/**
 * A factory function for creating static list views (eg. Featured, Latest, etc)
 */
export default function createStaticListView(type: string): Component {
  const niceType = capitalize(type);

  @ASyncComponent({
    components: {
      List,
    },
    computed: {
      ...mapGetters({
        items: type,
      }),
    },
    mixins: [meta, title],
    title: `${niceType} - NUSWhispers`,
  })
  class StaticListView extends Vue {
    public loading: boolean = false;

    public fetchInitialData({ store }: InitialDataProps): Promise<any> {
      this.loading = true;
      return store.dispatch(`get${niceType}`).then(() => this.loading = false);
    }

    public fetchMore() {
      if (this.loading) {
        return;
      }

      this.loading = true;
      this.$store.dispatch(`getNext${niceType}`).then(() => this.loading = false);
    }
  }

  return StaticListView;
}
