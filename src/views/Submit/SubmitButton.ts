import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    disabled: Boolean,
    loading: Boolean,
  },
})
export default class SubmitButton extends Vue {
  public loading: boolean = false;

  get submitLabel(): string {
    return this.loading ? 'Loading...' : 'Submit';
  }
}
