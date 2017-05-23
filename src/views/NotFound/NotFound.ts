import Vue from 'vue';
import Component from 'vue-class-component';

import meta from '../../mixins/meta';
import title from '../../mixins/title';

@Component({
  mixins: [meta, title],
  title: '404 - NUSWhispers',
})
export default class NotFound extends Vue {
}
