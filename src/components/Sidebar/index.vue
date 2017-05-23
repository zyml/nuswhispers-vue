<template>
  <div :class="$style.sidebar">
    <tag-cloud />
    <div
      class="fb-page"
      data-href="https://www.facebook.com/nuswhispers/"
      data-small-header="false"
      data-adapt-container-width="true"
      data-hide-cover="false"
      data-show-facepile="true"
    />
    <footer :class="$style.footer">
      NUSWhispers © 2015 – 2017 •
      <router-link to="/policy">Privacy Policy</router-link> •
      <a href="mailto:nuswhispers@googlegroups.com" target="_blank">Feedback</a>
    </footer>
  </div>
</template>

<style module>
.sidebar {
  text-align: center;
}

.footer {
  border-top: 1px solid #ddd;
  color: #999;
  font-size: .75rem;
  margin-top: .75rem;
  padding: .75rem 0;
}

.footer a {
  color: #999;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
</style>

<script lang="ts" src="./index.ts" />
