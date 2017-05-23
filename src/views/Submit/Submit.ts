import store from 'store';
import Vue from 'vue';
import Component from 'vue-class-component';
import VueRecaptcha from 'vue-recaptcha';
import meta from '../../mixins/meta';
import title from '../../mixins/title';
import CategorySelect from './CategorySelect';
import ImageUpload from './ImageUpload';
import StoryTextArea from './StoryTextArea';
import SubmitButton from './SubmitButton';

const confessionLimit = (): number => {
  const reset = !store.get('confessionLimit.date') ||
    store.get('confessionLimit.date') !== (new Date()).toDateString();

  if (reset) {
    store.set('confessionLimit.count', 0);
    store.set('confessionLimit.date', (new Date()).toDateString());
  }

  return store.get('confessionLimit.count');
};

const bumpLimit = (): void => {
  store.set('confessionLimit.count', confessionLimit() + 1);
};

@Component({
  components: {
    CategorySelect,
    ImageUpload,
    StoryTextArea,
    SubmitButton,
    VueRecaptcha,
  },
  mixins: [meta, title],
  title: 'Submit Confession - NUSWhispers',
})
export default class Submit extends Vue {
  public image: string = '';
  public story: string = '';
  public categories: string[] = [];
  public token: string = '';
  public loading: boolean = false;
  public hasErrors: boolean = false;

  get canSubmit(): boolean {
    return Boolean(this.story) &&
      this.categories.length > 0 &&
      this.verified &&
      !this.loading;
  }

  get exceeded(): boolean {
    return confessionLimit() > (parseInt(process.env.NUSWHISPERS_CONFESSION_LIMIT, 10));
  }

  get recaptchaKey(): string {
    return process.env.NUSWHISPERS_RECAPTCHA_KEY || '';
  }

  get submitLabel(): string {
    return this.loading ? 'Loading...' : 'Submit';
  }

  get verified(): boolean {
    return !!this.token;
  }

  public onRecaptchaExpired() {
    this.token = '';
  }

  public onRecaptchaVerified(response: any) {
    this.token = response;
  }

  public onSubmit() {
    this.loading = true;

    this.$store.dispatch('submitConfession', {
      captcha: this.token,
      categories: this.categories,
      content: this.story,
      image: this.image,
    })
    .then(() => {
      bumpLimit();
      this.$router.push('/success');
    })
    .catch(() => {
      this.hasErrors = true;
      this.loading = false;

      // Programmatically reset the recaptcha input.
      (this.$refs.recaptcha as any).reset();
    });
  }
}
