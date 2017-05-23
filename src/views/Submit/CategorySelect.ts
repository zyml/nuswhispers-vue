import isEqual from 'lodash/isEqual';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  computed: {
    ...mapGetters({
      categories: 'categories',
    }),
  },
})
export default class CategorySelect extends Vue {
  @Prop()
  public value: string[];

  get selected(): string[] {
    return this.value;
  }

  set selected(val: string[]) {
    if (!isEqual(this.value, val)) {
      this.$emit('input', val);
    }
  }
}
