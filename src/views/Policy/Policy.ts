import Vue from 'vue';
import Component from 'vue-class-component';

import meta from '../../mixins/meta';
import title from '../../mixins/title';

@Component({
  mixins: [meta, title],
  title: 'Privacy Policy - NUSWhispers',
})
export default class Policy extends Vue {
}
