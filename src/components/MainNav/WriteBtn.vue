<template>
  <router-link to="/submit" :class="$style.btn">
    <icon :class="$style.icon" id="pencil" />
    New Confession
  </router-link>
</template>

<style module>
.btn {
  background: #f70;
  border-radius: 3px;
  color: #fff;
  display: inline-block;
  font-weight: 700;
  font-size: .75rem;
  line-height: 1rem;
  padding: .5rem .5rem;
  transition: background .2s, color .2s;
  text-decoration: none;
  text-transform: uppercase;
}

.icon {
  fill: #fff;
  height: 16px;
  transition: fill .2s;
  vertical-align: -20%;
  width: 16px;
}

.btn:hover {
  background: #fff;
  color: #f70;
  text-decoration: none;
}

.btn:hover .icon {
  fill: #f70;
}

@media (max-width: 767px) {
  .btn {
    background: transparent;
    font-size: 0;
    padding: 0;
  }

  .icon {
    fill: rgba(255, 255, 255, .5);
    height: 24px;
    width: 24px;
    vertical-align: -50%;
  }

  .btn:hover {
    background: transparent;
  }

  .btn:hover .icon {
    fill: #fff;
  }
}
</style>
