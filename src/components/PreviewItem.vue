<script setup>
import { ref, onBeforeMount, inject } from 'vue';
import DB from '@/composables/db';
import showUrl from '@/composables/showUrl';
import { useItemStore } from '@/store/ItemStore';

const ItemStore = useItemStore();

const itemData = ref();
const registerHandler = inject('registerHandler');

async function getItemData() {
  itemData.value = await DB.getItem(ItemStore.selectedItem?.id);
}

async function updateItemData() {
  await getItemData();
} 

onBeforeMount(async () => {
  await getItemData();
  registerHandler('PreviewItem', { updateItemData });
})
</script>

<template>
  <div class="preview-container">
    <div class="preview-container__image-container">
      <img v-if="itemData?.image" :src="showUrl(itemData?.image)" class="responsive-image" />
    </div>
    <div class="preview-container__text-content">
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
  </div>
</template>

<style scoped lang="scss">
.preview-container {
  height: 100%;
  @include flex(column, normal, stretch, 1rem);

  &__image-container {
    width: 100%;
    height: 50%;
    @include flex(row, center, center);
    flex-shrink: 0;
    overflow: hidden;

    .responsive-image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }

  &__text-content {
    width: 100%;
    max-height: 50%;
    padding: 1rem 1rem;
    @include flex(column, normal, stretch, 1rem);
    background-color: var(--bg-card-color);
  }

  &__title {
    max-height: 7rem;
    flex-shrink: 0;
    font-size: 2.5rem;
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
