<template>
  <div v-if="exceeded" :class="$style.box">
    You've submitted too many confessions today! Please try again tomorrow.
  </div>
  <form v-else class="submit" @submit.prevent="onSubmit">
    <div :class="$style.box">
      <div :class="$style.subtitle">Submit a Confession</div>
      <p>Have an interesting story to share or just need to get something off your chest? Tell us your story here! No one will know it was you.</p>
      <p>Please be reminded to be socially responsible. No racial, religious or other forms of sensitive material. These entries will be rejected (and make us sad).</p>
      <p>If you are an official organization / body that wish to submit a confession to NUSWhispers. Please verify your authenticity and submit via <a href="mailto:nuswhispers@googlegroups.com">email</a>. Otherwise, they will be rejected.</p>
    </div >
    <div :class="$style.box">
      <div :class="$style.subtitle">Your Story</div>
      <div :class="$style.storyPlaceholder">
        <story-text-area v-model="story" />
      </div>
      <image-upload v-model="image" />
    </div>
    <div :class="$style.box">
      <div :class="$style.subtitle">Categories</div>
      <category-select v-model="categories" />
    </div>
    <div :class="$style.box">
      <div :class="$style.subtitle">Don't Spam</div>
      <vue-recaptcha ref="recaptcha" :class="$style.recaptcha" :sitekey="recaptchaKey" @verify="onRecaptchaVerified" @expired="onRecaptchaExpired" />
    </div>
    <div :class="$style.box">
      <submit-button :disabled="!canSubmit" :loading="loading" />
      Your confession is anonymous.
      <p v-if="hasErrors" :class="$style.error">Oops, there seems to be a problem posting your confession. Please try again later.</p>
    </div>
  </form>
</template>

<style module>
.box {
  background: #fff;
  margin-bottom: 1rem;
  padding: 1rem;
}

.box p:first-child {
  margin-top: 0;
}

.box p:last-child {
  margin-bottom: 0;
}

.error {
  color: #cc0000;
}

.helpText {
  display: inline-block;
}

.recaptcha {
  margin-top: 1rem;
}

.storyPlaceholder {
  margin: 1rem .5rem;
}

.subtitle {
  border-bottom: 1px solid #efefef;
  color: #aaa;
  font-size: .75rem;
  font-weight: 700;
  margin-bottom: .25rem;
  padding-bottom: .25rem;
  text-transform: uppercase;
}

@media (max-width: 767px) {
  .helpText {
    display: none;
  }
}
</style>

<script lang="ts" src="./Submit.ts" />
