import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import parse from 'date-fns/parse';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Confession } from '../../store/state';
import CategoryList from './CategoryList';
import ConfessionContent from './ConfessionContent';

@Component({
  components: {
    CategoryList,
    ConfessionContent,
  },
  name: 'confession',
  props: {
    item: Object,
  },
})
export default class ConfessionComponent extends Vue {
  public item: Confession;

  get fbLink(): string {
    return `https://www.facebook.com/nuswhispers/posts/${this.item.fbPostId}`;
  }

  get humanCreatedAt(): string {
    // Pad a 'Z' at the end to set it as UTC (which is returned from the API).
    return distanceInWordsStrict(Date.now(), parse(this.item.createdAt + 'Z'), { addSuffix: true });
  }
}
