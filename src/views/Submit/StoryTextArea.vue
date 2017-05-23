<template>
  <div>
    <div :class="$style.overlay" v-html="formattedStory" />
    <textarea ref="story" v-model="story" :class="$style.story" placeholder="Tell us your story..." rows="5" />
  </div>
</template>

<style module>
.overlay,
.story {
  font-family: -apple-system, BlinkMacSystemFont, 'Open Sans', 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 1.25rem;
  line-height: 27px;
}

.overlay {
  color: transparent;
  position: absolute;
  z-index: 0;
}

.overlay :global(.highlight) {
  background: yellow;
}

.story {
  background-color: transparent;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="27"><line x1="0" y1="27" x2="10" y2="27" stroke="#ccc" stroke-width="1px" stroke-linecap="round" stroke-dasharray="5, 10" /></svg>');
  border: none;
  color: #111;
  outline: none;
  padding: 0;
  position: relative;
  resize: none;
  width: 100%;
  z-index: 10;
}
</style>

<script lang="ts" src="./StoryTextArea.ts" />

