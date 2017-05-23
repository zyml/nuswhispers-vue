<template>
  <a v-if="external" :href="to" target="_blank" rel="noopener noreferrer">
    <icon :id="icon" :class="$style.icon" />
  </a>
  <router-link v-else :to="to">
    <icon :id="icon" :class="$style.icon" />
  </router-link>
</template>

<style module>
.icon {
  fill: rgba(255, 255, 255, .5);
  height: 28px;
  transition: fill .2s;
  width: 28px;
  vertical-align: -40%;
}

.icon:hover {
  fill: #fff;
}
</style>

<script lang="ts" src="./NavIcon.ts" />
