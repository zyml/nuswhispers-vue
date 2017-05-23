<template>
  <div :class="$style.container">
    <nav :class="$style.top">
      <div :class="$style.wrapper">
        <logo :class="$style.logo" />
        <ul :class="$style.topRight">
          <li>
            <nav-icon to="https://github.com/nusmodifications/nuswhispers" icon="social-github" external />
          </li>
          <li>
            <nav-icon to="/search" icon="zoom-outline" />
          </li>
          <li>
            <write-btn />
          </li>
        </ul>
      </div>
    </nav>
    <nav :class="$style.bottom">
      <div :class="$style.wrapper">
        <ul :class="$style.bottomLeft">
          <li><router-link to="/" exact>Featured</router-link></li>
          <li><router-link to="/latest">Latest</router-link></li>
          <li><router-link to="/popular">Popular</router-link></li>
          <!--<li><router-link to="/favourites">Favourites</router-link></li>-->
          <li v-for="category in categories" :key="category.confessionCategoryId">
            <router-link :to="'/category/' + category.confessionCategoryId">
              {{category.confessionCategory}}
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style module>
.container {
  max-height: 105px;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}

.top {
  background: #2e8fc2;
}

.inlineList {
  list-style: none;
  margin: 0;
  padding: 0;
}

.inlineList li {
  display: inline-block;
  margin: 0 .75rem 0 0;
  padding: 0;
}

.topRight {
  composes: inlineList;
  flex: 4;
  text-align: right;
}

.bottom {
  background: #3198CF;
  overflow-x: auto;
  white-space: nowrap;
}

.bottomLeft {
  composes: inlineList;
  height: 50px;
  margin-left: .75rem;
}

.bottomLeft li {
  margin-right: 1.5rem;
}

.bottomLeft li a {
  color: rgba(255, 255, 255, .5);
  font-size: .875rem;
  font-weight: 600;
  text-decoration: none;
  transition: color .2s;
}

.bottomLeft li a:hover,
.bottomLeft :global(.router-link-active) {
  color: #fff;
}

.logo {
  flex: 1;
  padding-left: .75rem;
}

.wrapper {
  display: flex;
  margin: 0 auto;
  max-width: 1000px;
  padding: .75rem 0;
}

@media(max-width: 480px) {
  .container {
    max-height: 100px;
  }
}
</style>

<script lang="ts" src="./index.ts" />
