import autosize from 'autosize';
import flow from 'lodash/flow';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import escapeHtml from '../../utils/escape-html';

const autofix = (content: string) => {
  return String(content)
    .replace(/nus\s*whispers?\b/gi, 'NUSWhispers')
    .replace(/nus\s*mods?\b/gi, 'NUSMods');
};

const highlightTags = (content: string): string => {
  const tags = flow(escapeHtml, autofix)(content).split(/(#\w+)/);
  let formatted = '';

  tags.map((tag) => {
    formatted += /(#\w+)/.test(tag) ?
      `<span class="highlight">${tag}</span>` :
      tag;
  });

  return formatted;
};

@Component
export default class StoryTextArea extends Vue {
  @Prop()
  public value: string;

  get story(): string {
    return this.value;
  }

  set story(val: string) {
    if (this.value !== val) {
      this.$emit('input', val);
    }
  }

  get formattedStory(): string {
    return highlightTags(this.story);
  }

  public mounted() {
    autosize(this.$refs.story as Element);
  }
}
