import Vue from 'vue';
import Component from 'vue-class-component';
import { mapGetters } from 'vuex';

@Component({
  computed: {
    ...mapGetters({
      tags: 'tags',
    }),
  },
})
export default class TagCloud extends Vue {
  public mounted() {
    // Attempt to retrieve tags if not generated from the server.
    this.$store.dispatch('getTags');
  }
}
