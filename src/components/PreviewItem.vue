<script setup>
import { ref, onBeforeMount } from 'vue';
import DB from '@/composables/db';
import showUrl from '@/composables/showUrl';
import { useItemStore } from '@/store/ItemStore';

const ItemStore = useItemStore();

const itemData = ref();

onBeforeMount(async () => {
  itemData.value = await DB.getItem(ItemStore.selectedItem?.id);
})
</script>

<template>
  <div class="preview-container">
    <div class="preview-container__image-container">
      <img v-if="itemData?.image" :src="showUrl(itemData?.image)" class="responsive-image" />
    </div>
    <div class="preview-container__title">{{ itemData?.name }}</div>
    <div v-if="itemData?.tags" class="tags preview-container__tags">
      <Tag
        v-for="(tag, ind) in itemData?.tags"
        :key="ind"
        :value="tag"
        class="tag"
      ></Tag>
    </div>
    <div class="preview-container__note">{{ itemData?.note }}</div>
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
      max-height: 100%;
      object-fit: contain;
    }
  }

  &__title {
    max-height: 7rem;
    flex-shrink: 0;
    font-size: 3rem;
    overflow: auto;
  }

  &__tags {
    max-height: 56px;
    flex-shrink: 0;
    overflow: auto;
  }

  &__note {
    overflow: auto;
    padding-right: 0.5rem;
  }
}
</style>
