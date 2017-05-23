import get from 'lodash/get';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class ImageUpload extends Vue {
  @Prop()
  public value: string;

  public hasErrors: boolean = false;
  private client: filestack.FileStack;

  get uploaded(): boolean {
    return !!this.value;
  }

  public mounted() {
    this.client = filestack.init(process.env.NUSWHISPERS_FILESTACK_KEY);
  }

  public onChoose() {
    this.client.pick({
      accept: 'image/*',
      maxSize: 1024 * 1024,
    }).then((result) => {
      if (result.filesFailed.length) {
        this.hasErrors = true;
        return;
      }

      this.$emit('input', get(result, 'filesUploaded[0].url'));
    }).catch(() => this.hasErrors = true);
  }

  public onRemove() {
    this.$emit('input', '');
  }
}
