<template>
  <div class="tag">
    <list :loading="loading" :items="items" @fetchMore="fetchMore" />
  </div>
</template>

<script lang="ts" src="./Tag.ts" />
