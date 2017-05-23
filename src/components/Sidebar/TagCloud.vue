<template>
  <div :class="$style.container">
    <div :class="$style.heading">
      Popular Tags
    </div>
    <div :class="$style.content">
      <router-link
        v-for="tag in tags"
        :key="tag.confessionTagId"
        :class="$style.tag"
        :to="'/tag/' + tag.confessionTag.toLowerCase().substring(1)"
      >
        {{tag.confessionTag}}
      </router-link>
    </div>
  </div>
</template>

<style module>
.container {
  margin: 0 0 1rem;
  text-align: left;
}

.heading {
  font-size: .75rem;
  font-weight: 600;
  margin: 0 0 1rem;
  text-transform: uppercase;
}

.tag {
  background: #ddd;
  border-radius: 3px;
  color: #666;
  display: inline-block;
  font-size: .688rem;
  margin: 0 .25rem .5rem 0;
  padding: .25rem .5rem;
  text-transform: uppercase;
}

.tag:hover {
  color: #333;
  text-decoration: none;
}
</style>

<script lang="ts" src="./TagCloud.ts" />
