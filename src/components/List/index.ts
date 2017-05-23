import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import Confession from '../../components/Confession/index.vue';
import infiniteScroll from '../../directives/infinite-scroll';
import { Confession as ConfessionState } from '../../store/state';

@Component({
  components: {
    Confession,
  },
  directives: {
    infiniteScroll,
  },
  props: {
    items: Array,
    loading: Boolean,
  },
})
export default class List extends Vue {
  public loading: boolean = false;
  private hasMore: boolean = true;

  public get disabled(): boolean {
    return this.loading || !this.hasMore;
  }

  public fetchMore() {
    if (this.disabled) {
      return;
    }

    this.$emit('fetchMore');
  }

  @Watch('items')
  public onItemsChanged(newItems: ConfessionState[], items: ConfessionState[]) {
    // Listen when items count has been changed.
    // We do not want to continously fetch more confessions if the length is the same.
    if (newItems.length === items.length) {
      this.hasMore = false;
    }
  }
}
