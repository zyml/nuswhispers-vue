import Vue from 'vue';
import { mapGetters } from 'vuex';
import ASyncComponent, { InitialDataProps } from '../../components/ASyncComponent';
import List from '../../components/List/index.vue';
import meta from '../../mixins/meta';
import title from '../../mixins/title';
import { Store } from '../../store';

@ASyncComponent({
  components: {
    List,
  },
  computed: {
    ...mapGetters({
      items: 'featured',
    }),
  },
  mixins: [meta, title],
  title: 'Featured - NUSWhispers',
})
export default class Featured extends Vue {
  public loading: boolean = false;

  public fetchInitialData({ store }: InitialDataProps): Promise<any> {
    this.loading = true;
    return store.dispatch('getFeatured').then(() => this.loading = false);
  }

  public fetchMore() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.$store.dispatch('getNextFeatured').then(() => this.loading = false);
  }
}
