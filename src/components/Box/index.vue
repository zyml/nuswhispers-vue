<template>
  <div :class="$style.box">
    <slot />
  </div>
</template>

<style module>
.box {
  background: #fff;
  padding: 1rem;
}

.box p:first-child {
  margin-top: 0;
}

.box p:last-child {
  margin-bottom: 0;
}
</style>
