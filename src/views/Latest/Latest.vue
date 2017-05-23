<template>
  <div class="latest">
    <list :loading="loading" :items="items" @fetchMore="fetchMore" />
  </div>
</template>

<script lang="ts" src="./Latest.ts" />
