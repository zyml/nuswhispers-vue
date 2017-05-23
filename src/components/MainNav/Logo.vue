<template>
  <h1 :class="$style.logo">
    <router-link to="/">
      NUS<span :class="$style.highlight">Whispers</span>
    </router-link>
  </h1>
</template>

<style module>
.logo {
  margin: 0;
  min-width: 165px;
}

.logo a:before {
  background: url('../../assets/logo.svg') no-repeat;
  background-size: 28px;
  content: ' ';
  display: inline-block;
  height: 28px;
  margin-right: .05rem;
  vertical-align: -25%;
  width: 28px;
}

.logo a {
  color: #fff;
  display: block;
  font-size: 1.25rem;
  font-weight: 600;
  text-decoration: none;
}

.highlight {
  color: rgba(255, 255, 255, .5);
}

@media (max-width: 480px) {
  .logo a {
    height: 28px;
    overflow: hidden;
    width: 28px;
  }
}
</style>
