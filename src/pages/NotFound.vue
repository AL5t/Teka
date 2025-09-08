<script setup></script>

<template>
  <div class="not-found">
    <div class="not-found__title">404 NOT FOUND</div>
    <RouterLink to="/">Return to home page</RouterLink>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  @include flex(column, normal, center, 1rem);
  
  &__title {
    font-size: 2rem;
    text-align: center;
  }
}
</style>