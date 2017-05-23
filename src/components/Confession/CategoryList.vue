<template>
  <div v-if="categories.length">
    <template v-for="(category, idx) in categories">
      <router-link :to="'/category/' + category.confessionCategoryId">{{ category.confessionCategory }}</router-link><span v-if="idx + 1 < categories.length">, </span>
    </template>
  </div>
  <div v-else>
    No Category
  </div>
</template>

<script lang="ts" src="./CategoryList.ts" />
