import flow from 'lodash/flow';
import Vue from 'vue';
import Component from 'vue-class-component';
import escapeHtml from '../../utils/escape-html';

const linkTags = (content: string): string => {
  const tags = content.split(/(#\w+)/);
  let formatted = '';

  tags.map((tag) => {
    formatted += /(#\w+)/.test(tag) ?
      `<a href="/tag/${tag.substring(1)}">${tag}</a>` :
      tag;
  });

  return formatted;
};

const linkUrls = (content: string): string => {
  const regex = /(\b(https?|ftp):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim;
  if (content.match(regex)) {
    content = content.replace(regex, '<a rel=\"noopener noreferrer\" href=\"$1\" target=\"_blank\">$1</a>');
  }
  return content;
};

@Component({
  props: {
    content: String,
  },
})
export default class ConfessionContent extends Vue {
  public content: string;

  get formattedContent(): string {
    return flow(escapeHtml, linkTags, linkUrls)(this.content);
  }
}
