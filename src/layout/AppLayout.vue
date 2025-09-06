<script setup>
import { useRouter } from 'vue-router';
import { useRepositoryStore } from '@/store/RepositoryStore';
import { useItemStore } from '@/store/ItemStore';

const router = useRouter();
const RepositoryStore = useRepositoryStore();
const ItemStore = useItemStore();

function goToIntroPage() {
  router.push('/');
}

function goToHomePage() {
  router.push('/home');
}

</script>

<template>
  <header class="header">
    <div style="width: 120px;">
      <Button icon="pi pi-building-columns" variant="text" @click="goToIntroPage"></Button>
      <Button icon="pi pi-image" variant="text" @click="goToHomePage"></Button>
    </div>
    <div class="header__title">
      <span v-if="RepositoryStore.selectedRepository?.id" style="font-size: 2.5rem;">{{ RepositoryStore.selectedRepository?.name }}</span>
      <span v-else>Teka</span>
    </div>
    <div style="width: 120px;">
      <template v-if="RepositoryStore.selectedRepository?.id">
        <Button icon="pi pi-list" variant="text" :severity="RepositoryStore.isListView ? 'success' : 'secondary'" @click="RepositoryStore.isListView = true"></Button>
        <Button icon="pi pi-th-large" variant="text" :severity="!RepositoryStore.isListView ? 'success' : 'secondary'" @click="RepositoryStore.isListView = false"></Button>
        <Button icon="pi pi-plus" variant="text" severity="secondary" @click="ItemStore.openItemFormDialog('create')"></Button>
      </template>
    </div>
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