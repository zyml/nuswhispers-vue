<template>
  <button :class="$style.submit" :disabled="disabled" type="submit">
    {{ submitLabel }}
  </button>
</template>

<style module>
.submit {
  background: #3198CF;
  border: 1px solid #2e8fc2;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: .875rem;
  font-weight: 400;
  margin-right: .75rem;
  padding: .5rem .75rem;
  transition: all .1s ease-in-out;
}

.submit:hover {
  border-color: #f70;
  background: #f70;
}

.submit:disabled {
  border-color: #ccc;
  background: #ddd;
  color: #ccc;
  cursor: default;
}
</style>

<script lang="ts" src="./SubmitButton.ts" />
