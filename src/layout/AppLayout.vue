<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useRepositoryStore } from '@/store/RepositoryStore';
import { useItemStore } from '@/store/ItemStore';

const router = useRouter();
const route = useRoute();
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
  <header class="header" :style="{borderColor: RepositoryStore.selectedRepository?.id && route.path !== '/home' ? '#333' : 'transparent'}">
    <div style="width: 120px;">
      <Button icon="pi pi-building-columns" variant="text" @click="goToIntroPage"></Button>
      <Button icon="pi pi-image" variant="text" @click="goToHomePage"></Button>
    </div>
    <div>
      <span v-if="RepositoryStore.selectedRepository?.id && route.path !== '/home'" class="header__title_rep">{{ RepositoryStore.selectedRepository?.name }}</span>
      <span v-else class="header__title_home">Teka</span>
    </div>
    <div style="width: 120px;">
      <template v-if="RepositoryStore.selectedRepository?.id && route.path !== '/home'">
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
  @include flex(row, space-between, center);
  background-color: var(--bg-color);
  border-bottom: 2px solid transparent;

  &__title_home {
    font-size: 3rem;
  }
  
  &__title_rep {
    font-size: 2.5rem;
  }
}

.router-view {
  height: calc(100% - 60px);
}
</style>