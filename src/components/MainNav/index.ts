import Vue from 'vue';
import Component from 'vue-class-component';
import { mapGetters } from 'vuex';
import Logo from './Logo.vue';
import NavIcon from './NavIcon.vue';
import WriteBtn from './WriteBtn.vue';

@Component({
  components: {
    Logo,
    NavIcon,
    WriteBtn,
  },
  computed: {
    ...mapGetters({
      categories: 'categories',
    }),
  },
})
export default class MainNav extends Vue {
  public mounted() {
    // Attempt to retrieve categories if not generated from the server.
    this.$store.dispatch('getCategories');
  }
}
