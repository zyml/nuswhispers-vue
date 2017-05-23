<template>
  <div class="category">
    <list :loading="loading" :items="items" @fetchMore="fetchMore" />
  </div>
</template>

<script lang="ts" src="./Category.ts" />
