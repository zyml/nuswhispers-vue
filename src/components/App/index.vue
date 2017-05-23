<template>
  <div id="app" :class="$style.app">
    <main-nav />
    <div :class="$style.wrapper">
      <main :class="$style.main">
        <spinner v-if="loading" />
        <router-view v-else />
      </main>
      <div :class="$style.sidebar">
        <sidebar />
      </div>
    </div>
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
}

body {
  background-color: #f5f5f5;
  color: #666;
  font-family: -apple-system, BlinkMacSystemFont, 'Open Sans', 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: .875rem;
  line-height: 1.4rem;
  margin-top: 120px;
  -webkit-font-smoothing: subpixel-antialiased;
}

a {
  color: #50b3e5;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  body {
    margin-top: 105px;
  }
}
</style>

<style module>
.column {
  padding: .75rem;
}

.wrapper {
  display: flex;
  margin: 1rem auto;
  max-width: 1000px;
}

.main {
  composes: column;
  flex: 2;
}

.sidebar {
  composes: column;
  flex: 1;
}

@media (max-width: 767px) {
  .wrapper {
    flex-direction: column;
  }
}
</style>

<!-- Workaround to be able to lint the TS files using TSLint -->
<script lang="ts" src="./index.ts" />
