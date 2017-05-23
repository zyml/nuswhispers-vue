import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    external: Boolean,
    icon: String,
    to: String,
  },
})
export default class NavIcon extends Vue {
}
