<template>
  <div class="search">
    <form :class="$style.form" @submit.prevent="onSubmit">
      <input :class="$style.query" v-model="query" type="text" />
      <button :class="$style.btn" type="submit">Search</button>
    </form>
    <spinner v-if="loading" />
    <template v-if="canShowResults">
      <list v-if="items.length" :loading="loadingMore" :items="items" @fetchMore="fetchMore" />
      <box v-else>No search results found. Try another?</box>
    </template>
  </div>
</template>

<style module>
.heading {
  font-size: .75rem;
  font-weight: 600;
  margin: 0 0 1rem;
  text-transform: uppercase;
}

.form {
  display: flex;
  margin-bottom: 1rem;
}

.btn,
.query {
  font-family: -apple-system, BlinkMacSystemFont, 'Open Sans', 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 1rem;
}

.query {
  border: 2px solid #2e8fc2;
  outline: none;
  padding: .5rem;
  width: 100%;
}

.btn {
   background: #2e8fc2;
   border: none;
   color: #fff;
   cursor: pointer;
   font-weight: 700;
   padding: .5rem 1rem;
   transition: background .1s ease-in-out;
}

.btn:hover {
  background: #3198CF;
}
</style>

<script lang="ts" src="./Search.ts" />
