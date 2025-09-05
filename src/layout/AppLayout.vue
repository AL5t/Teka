<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToIntroPage() {
  router.push('/');
}

function goToHomePage() {
  router.push('/home');
}

</script>

<template>
  <header class="header">
    <div>
      <Button icon="pi pi-building-columns" variant="text" @click="goToIntroPage"></Button>
      <Button icon="pi pi-image" variant="text" @click="goToHomePage"></Button>
    </div>
    <div class="header__title">Teka</div>
    <div style="width: 80px;"></div>
  </header>
  <RouterView class="router-view" />
</template>

<style scoped lang="scss">
.header {
  height: 60px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bg-color);

  &__title {
    font-size: 3rem;
  }
}

.router-view {
  height: calc(100% - 60px);
}
</style>