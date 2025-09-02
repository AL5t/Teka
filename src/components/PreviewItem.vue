<script setup>
import { ref, onBeforeMount } from 'vue';
import DB from '@/composables/db';
import showUrl from '@/composables/showUrl';
import { useItemStore } from '@/store/ItemStore';
import { useRepositoryStore } from '@/store/RepositoryStore';

const ItemStore = useItemStore();
const RepositoryStore = useRepositoryStore();

const repData = ref();

onBeforeMount(async () => {
  repData.value = await DB.getRep(RepositoryStore.selectedRepository?.id)
})
</script>

<template>
  <div class="preview-container">
    <div class="preview-container__image-container">
      <img :src="showUrl(ItemStore.selectedItem?.image)" class="responsive-image" />
    </div>
    <div class="preview-container__title">{{ ItemStore.selectedItem?.name }}</div>
    <div v-if="ItemStore.selectedItem?.tags" class="tags preview-container__tags">
      <Tag
        v-for="(tag, ind) in ItemStore.selectedItem?.tags"
        :key="ind"
        :value="tag"
        class="tag"
      ></Tag>
    </div>
    <div class="preview-container__note">{{ ItemStore.selectedItem?.note }}</div>
  </div>
</template>

<style scoped lang="scss">
.preview-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__image-container {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    overflow: hidden;

    .responsive-image {
      max-width: 100%;
      height: auto;
    }
  }

  &__title {
    max-height: 7rem;
    font-size: 3rem;
    overflow: auto;
  }

  &__tags {
    max-height: 56px;
    overflow: auto;
  }

  &__note {
    overflow: auto;
    padding-right: 0.5rem;
  }
}
</style>
