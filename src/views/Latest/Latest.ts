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
      items: 'latest',
    }),
  },
  mixins: [meta, title],
  title: 'Latest - NUSWhispers',
})
export default class Latest extends Vue {
  public loading: boolean = false;

  public fetchInitialData({ store }: InitialDataProps): Promise<any> {
    this.loading = true;
    return store.dispatch('getLatest').then(() => this.loading = false);
  }

  public fetchMore() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.$store.dispatch('getNextLatest').then(() => this.loading = false);
  }
}
