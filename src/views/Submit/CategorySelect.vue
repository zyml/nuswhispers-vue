<template>
  <ul :class="$style.wrapper">
    <li :class="$style.item" v-for="category in categories" :key="category.confessionCategoryId">
      <input :class="$style.checkbox" :id="'confession-category-' + category.confessionCategoryId" type="checkbox" :value="category.confessionCategoryId" v-model="selected" />
      <label :class="$style.label" :for="'confession-category-' + category.confessionCategoryId">
        <span />
        {{ category.confessionCategory }}
      </label>
    </li>
  </ul>
</template>

<style module>
/* Simplified version of: http://codepen.io/north-of-rapture/pen/rWqega/ */
.wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  margin: .5rem;
  padding: 0;
}

.item {
  font-weight: 700;
  line-height: 26px;
  padding: .5rem 0 0;
  width: calc(100% / 3);
}

.item label {
  cursor: pointer;
  display: inline-block;
  position: relative;
}

.item label span {
  display: inline-block;
  position: relative;
  background-color: #efefef;
  width: 25px;
  height: 25px;
  transform-origin: center;
  border: 2px solid #eee;
  border-radius: 50%;
  vertical-align: -9px;
  margin-right: 5px;
}

.item label span:before {
  content: '';
  width: 0px;
  height: 2px;
  border-radius: 2px;
  background: #fff;
  position: absolute;
  transform: rotate(45deg);
  top: 13px;
  left: 9px;
  transform-origin: 0% 0%;
}

.item label span:after {
  content: "";
  width: 0;
  height: 2px;
  border-radius: 2px;
  background: #fff;
  position: absolute;
  transform: rotate(305deg);
  top: 16px;
  left: 10px;
  transform-origin: 0% 0%;
}
.checkbox {
  display: none;
}

.checkbox:checked + label span {
  background: #2e8fc2;
}

.checkbox:checked + label span:before {
  width: 5px;
  background: #fff;
}

.checkbox:checked + label span:after {
  width: 10px;
  background: #fff;
}

.checkbox:checked span {
  background-color: #fff;
}

@media (max-width: 480px) {
  .wrapper {
    margin: 0;
  }

  .item {
    width: 100%;
  }
}
</style>

<script lang="ts" src="./CategorySelect.ts" />
