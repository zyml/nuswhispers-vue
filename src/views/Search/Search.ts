import Vue from 'vue';
import { Route } from 'vue-router';
import ASyncComponent, { InitialDataProps } from '../../components/ASyncComponent';
import List from '../../components/List/index.vue';
import meta from '../../mixins/meta';
import title from '../../mixins/title';
import { Store } from '../../store';
import { Confession } from '../../store/state';
import escapeHtml from '../../utils/escape-html';

@ASyncComponent({
  components: {
    List,
  },
  mixins: [meta, title],
})
export default class Search extends Vue {
  public query: string = this.$route.params.keyword || '';
  public loading: boolean = false;
  public loadingMore: boolean = false;

  get items(): Confession[] {
    return this.$store.getters.listByKeyword(this.$route.params.keyword);
  }

  get keyword(): string {
    return escapeHtml(this.$route.params.keyword);
  }

  get canShowResults(): boolean {
    return !this.loading && !!this.keyword;
  }

  public beforeRouteUpdate(to: Route, from: Route, next: () => void) {
    // Fetch data if keyword is different from the previous one.
    if (to.params.keyword !== from.params.keyword) {
      return this.fetchInitialData({ store: this.$store, route: to }).then(() => next());
    }
    next();
  }

  public fetchInitialData({ store, route }: InitialDataProps): Promise<any> {
    if (route.params.keyword) {
      this.loading = true;
      return store.dispatch('getByKeyword', route.params.keyword).then(() => this.loading = false);
    }

    return Promise.resolve();
  }

  public fetchMore() {
    if (this.loading || this.loadingMore) {
      return;
    }

    this.loadingMore = true;
    this.$store.dispatch('getNextByKeyword', this.$route.params.keyword).then(() => this.loadingMore = false);
  }

  public onSubmit() {
    this.loading = true;
    this.$router.push(`/search/${encodeURIComponent(this.query)}`);
  }

  public title(): string {
    return this.$route.params.keyword ?
      `${this.$route.params.keyword} - NUSWhispers` :
      'Search - NUSWhispers';
  }
}
