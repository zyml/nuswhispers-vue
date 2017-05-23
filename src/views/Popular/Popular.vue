<template>
  <div class="popular">
    <list :loading="loading" :items="items" @fetchMore="fetchMore" />
  </div>
</template>

<script lang="ts" src="./Popular.ts" />
