import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'icon',
  props: {
    id: String,
  },
})
export default class Icon extends Vue {
}
