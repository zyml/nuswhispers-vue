import Vue from 'vue';
import Component from 'vue-class-component';
import { Category } from '../../store/state';

@Component({
  props: {
    ids: Array,
  },
})
export default class CategoryList extends Vue {
  public ids: string[];

  get categories(): Category[] {
    return this.$store.getters.categoriesByIds(this.ids);
  }
}
