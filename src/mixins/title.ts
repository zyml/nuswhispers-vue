import Vue, { ComponentOptions } from 'vue';

export function getTitle(vm: Vue): string | undefined {
  const { title } = vm.$options;

  return title && typeof title === 'function' ?
    title.call(vm) :
    title;
}

const serverMixin: ComponentOptions<Vue> = {
  created() {
    const title = getTitle(this);
    if (title) {
      this.$ssrContext.title = title;
    }
  },
};

const clientMixin: ComponentOptions<Vue> = {
  mounted() {
    const title = getTitle(this);
    if (title) {
      document.title = title;
    }
  },
};

export default process.env.VUE_ENV === 'server' ? serverMixin : clientMixin;
