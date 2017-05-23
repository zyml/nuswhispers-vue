<template>
  <div class="featured">
    <list :loading="loading" :items="items" @fetchMore="fetchMore" />
  </div>
</template>

<script lang="ts" src="./Featured.ts" />
