<template>
  <div :class="$style.wrapper">
    <template v-if="uploaded">
      <button :class="$style.choose" type="button" @click.prevent="onChoose">
        Choose another Image
      </button>
      <button :class="$style.remove" type="button" @click.prevent="onRemove">
        Remove Image
      </button>
      <div :class="$style.preview">
        <img :src="value" alt="Image preview" />
      </div>
    </template>
    <template v-else>
      <button :class="$style.choose" type="button" @click.prevent="onChoose">
        Choose an Image
      </button>
      <template v-if="hasErrors">
        <p :class="$style.error">There seems to be a problem uploading your images. Please try again.</p>
      </template>
      <template v-else>
        <span :class="$style.helpText">You may add a suitable image to express yourself.</span>
      </template>
    </template>
  </div>
</template>

<style module>
.wrapper {
  margin: 0 .5rem;
}

.choose,
.remove {
  background: #fff;
  border: 1px solid #2e8fc2;
  border-radius: 4px;
  color: #2e8fc2;
  cursor: pointer;
  font-size: .875rem;
  font-weight: 400;
  margin-right: .75rem;
  padding: .5rem .75rem;
  transition: all .1s ease-in-out;
}

.choose:hover {
  border-color: #f70;
  color: #f70;
}

.error {
  color: #cc0000;
}

.remove {
  border: 1px solid #990000;
  color: #990000;
}

.remove:hover {
  border-color: #cc0000;
  color: #cc0000;
}

.preview {
  background: #efefef;
  border: 1px solid #ccc;
  margin: 1rem 0 0;
}

.preview:after {
  color: #999;
  content: 'Image Preview';
  display: inline-block;
  font-size: .625rem;
  line-height: 1rem;
  text-align: center;
  text-transform: uppercase;
  width: 100%;
}

.preview img {
  display: block;
  width: 100%;
  height: auto;
}

.helpText {
  display: inline-block;
}

@media (max-width: 767px) {
  .helpText {
    display: none;
  }
}
</style>

<script lang="ts" src="./ImageUpload.ts" />
