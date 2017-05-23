import truncate from 'lodash/truncate';
import Vue from 'vue';
import { Route } from 'vue-router';
import ASyncComponent, { InitialDataProps } from '../../components/ASyncComponent';
import Confession from '../../components/Confession/index.vue';
import meta from '../../mixins/meta';
import title from '../../mixins/title';
import { Store } from '../../store';
import { Confession as ConfessionState } from '../../store/state';
import * as metaUtils from '../../utils/meta';

@ASyncComponent({
  components: {
    Confession,
  },
  mixins: [meta, title],
})
export default class ConfessionView extends Vue {
  public loading: boolean = false;

  get item(): ConfessionState {
    return this.$store.getters.listById(this.$route.params.id);
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
    return store.dispatch('getById', route.params.id).then(() => this.loading = false);
  }

  public title(): string {
    return `#${this.$route.params.id} - NUSWhispers`;
  }

  public meta(): Array<{ [key: string]: string }> {
    const imageTags = this.item.images ?
        metaUtils.generateImage(this.item.images) :
        metaUtils.defaultImage();

    return [
      ...metaUtils.generateTitle(`#${this.$route.params.id} - NUSWhispers`),
      ...metaUtils.generateDescription(truncate(this.item.content, { length: 240 })),
      ...imageTags,
      {
        content: this.item.images ? 'summary_large_image' : 'summary',
        property: 'twitter:card',
      },
    ];
  }
}
