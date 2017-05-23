<template>
  <div v-infinite-scroll="fetchMore" :infinite-scroll-disabled="disabled">
    <div v-for="item in items">
      <confession :item="item" />
    </div>
    <spinner v-if="loading" />
  </div>
</template>

<script lang="ts" src="./index.ts" />
