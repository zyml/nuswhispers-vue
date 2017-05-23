import Vue from 'vue';
import Component from 'vue-class-component';

import TagCloud from './TagCloud.vue';

@Component({
  components: {
    TagCloud,
  },
})
export default class Sidebar extends Vue {
}
