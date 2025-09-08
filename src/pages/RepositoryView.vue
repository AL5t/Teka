<script setup>
import { onBeforeMount, onUnmounted, ref, provide, computed } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import { useRepositoryStore } from '@/store/RepositoryStore';
import { useItemStore } from '@/store/ItemStore';

import DB from '@/composables/db';
import showUrl from '@/composables/showUrl';
import changeColorShade from '@/composables/changeColorShade';

import PreviewItem from '@/components/PreviewItem.vue';
// import SidePanel from '@/components/SidePanel.vue';
import ItemFormDialog from '@/components/ItemFormDialog.vue';

const confirm = useConfirm();
const RepositoryStore = useRepositoryStore();
const ItemStore = useItemStore();

const allTags = ref([]);
const selectedTags = ref([]);
const containerRepRef = ref();

let repData;
const items = ref();
const backgroundUrl = ref();
const backgroundStyle = computed(() => {
  return {
    backgroundImage: backgroundUrl.value,
  };
});

const handlers = {};
function registerHandler(childName, methods) {
  handlers[childName] = methods;
}
function callHandler(childName, methodName, ...args) {
  if (handlers[childName]?.[methodName]) {
    handlers[childName][methodName](...args);
  }
}
provide('registerHandler', registerHandler);
provide('callHandler', callHandler);

// const selectedCategorySidePanelValue = ref();
// const handleValueUpdate = (val) => {
//   selectedCategorySidePanelValue.value = val;
// };


async function searchByTags() {
  if(selectedTags.value?.length) {
    items.value = await DB.searchItemsByTags(RepositoryStore.selectedRepository?.id, selectedTags.value);
  } else {
    await getItemsAndAllTags();
  }
}

const confirmDeleteItem = () => {
  confirm.require({
    message: 'Do you want to delete this item?',
    header: 'Delete item',
    icon: 'pi pi-info-circle',
    rejectProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
    },
    acceptProps: {
        label: 'Delete',
        severity: 'danger'
    },
    accept: async () => {
      if(ItemStore.selectedItem.id) {
        await DB.deleteItem(ItemStore.selectedItem.id);
        await getItemsAndAllTags();
        ItemStore.setSelectedItem(null);
      }
    },
  });
};

async function getItemsAndAllTags() {
  const [tags, sortedItems] = await Promise.all([
    DB.getAllUniqueTagsByRepId(RepositoryStore.selectedRepository?.id),
    DB.getItemsByRepId(RepositoryStore.selectedRepository?.id)
  ]);
  allTags.value = tags;
  items.value = sortedItems;
}

onBeforeMount(async () => {
  repData = await DB.getRep(RepositoryStore.selectedRepository?.id);
  // containerRepRef.value.style.setProperty('--bg-color', "#" + repData.background);
  document.body.style.setProperty('--bg-color', "#" + (repData.background || 'fff'));
  document.body.style.setProperty('--bg-card-color', changeColorShade(repData.background, 25));

  backgroundUrl.value = `url("${repData.backgroundImage}")`;

  await getItemsAndAllTags();
});

onUnmounted(() => {
  ItemStore.$reset();
  RepositoryStore.setSelectedRepository(null);
  document.body.style.setProperty('--bg-color', "#fff");
});
</script>

<template>
  <div class="container-rep" ref="containerRepRef" :style="backgroundStyle">
    <!-- <SidePanel @update-selected-category="handleValueUpdate" /> -->
    <div class="main-panel">
      <!-- <div class="main-panel__title">{{ repData?.name }}</div> -->
      <div class="main-panel__toolbar">
        <MultiSelect
          v-model="selectedTags"
          showClear
          :options="allTags"
          filter
          placeholder="Select tags"
          @value-change="searchByTags"
          :maxSelectedLabels="0"
          :selectedItemsLabel="selectedTags?.length + ' tags'"
          class="toolbar__multiselect"
        />
      </div>
      <div class="main-panel__content">
        <template v-if="items?.length">
          <div v-if="RepositoryStore.isListView" class="list-view">
            <div class="list-view__panel">
              <div
                v-for="(item, index) in items"
                :key="index"
                class="list-view__item"
                :class="ItemStore.selectedItem?.id === item.id ? 'list-view__item_selected' : ''"
                @click="ItemStore.selectedItem?.id === item.id ? ItemStore.setSelectedItem(null) : ItemStore.setSelectedItem(item)"
              >
                <div class="item__container-image">
                  <img :src=showUrl(item?.image) class="responsive-image" />
                </div>
                <div class="item__text-content">
                  <div class="item__top-block">
                    <span class="item__name" v-tooltip="item.name">{{ item.name }}</span>
                    <div>
                      <Button icon="pi pi-pencil" severity="secondary" variant="text" @click.stop="ItemStore.openItemFormDialog('edit', item)"></Button>
                      <Button icon="pi pi-trash" severity="secondary" variant="text" @click.stop="confirmDeleteItem()"></Button>
                    </div>
                  </div>
                  <div class="tags item__tags">
                    <Tag
                      v-for="(tag, ind) in item.tags"
                      :key="ind"
                      :value="tag"
                      class="tag"
                    ></Tag>
                  </div>
                  <div class="item__note">{{ item.note }}</div>
                </div>
              </div>
            </div>
            <div class="list-view__preview">
              <PreviewItem v-if="ItemStore.selectedItem?.id" :key="ItemStore.selectedItem?.id" />
            </div>
          </div>
          <div v-else class="tiles-view">
            <div
              v-for="(item, index) in items"
              :key="index"
              class="tiles-view__item"
            >
              <div class="item__container-image tiles" @click="ItemStore.setSelectedItem(item); ItemStore.isVisibleItemViewDialog = true">
                <img :src=showUrl(item?.image) class="responsive-image" />
              </div>
              <div style="width: 100%; padding: 0.5rem; display: flex; flex-direction: column; gap: 1rem; background-color: var(--bg-card-color);">
                <div class="item__name-block">
                  <span
                    v-tooltip="item.name"
                    @click="ItemStore.setSelectedItem(item); ItemStore.isVisibleItemViewDialog = true"
                    class="item__name"
                  >{{ item.name }}</span>
                  <div class="item__buttons">
                    <Button class="item__button" icon="pi pi-pencil" severity="secondary" variant="text" @click.stop="ItemStore.openItemFormDialog('edit', item)"></Button>
                    <Button class="item__button" icon="pi pi-trash" severity="secondary" variant="text" @click.stop="confirmDeleteItem()"></Button>
                  </div>
                </div>
                <div class="item__tags-block">
                  <div class="tags" style="height: 26px; overflow: hidden;">
                    <Tag
                      v-for="(tag, ind) in item.tags"
                      :key="ind"
                      :value="tag"
                      class="tag"
                    ></Tag>
                  </div>
                  <Button
                    v-if="item.tags.join('').length > 13"
                    label="..."
                    variant="outlined"
                    severity="secondary"
                    @click="ItemStore.setSelectedItem(item); ItemStore.isVisibleItemViewDialog = true;"
                    autofocus
                    class="tags__button"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="empty-content">
            <div class="empty-content__text">No items</div>
          </div>
        </template>
      </div>
    </div>
    <ConfirmDialog></ConfirmDialog>
    <ItemFormDialog @update-data="getItemsAndAllTags()" />
    <Dialog
      v-model:visible="ItemStore.isVisibleItemViewDialog"
      modal
      :draggable="false"
      style="width: 50rem; height: 85%; border-radius: 0;"
      :pt="{
        root: {
          style: {'background-color': 'var(--bg-color)'}
        },
        content: {
          style: {'flex-grow': 1},
        }
      }"
    >
      <template #header>
        <div></div>
      </template>
      <PreviewItem />
    </Dialog>
  </div>
</template>

<style scoped lang="scss">
.container-rep {
  width: 100%;
  display: flex;
  background-color: var(--bg-color);
  background-image: var(--bg-image);
  background-repeat: repeat;
  background-size: 200px 200px;
}

.main-panel {
  width: 100%;
  height: 100%;
  padding: 1rem;

  &__title {
    text-align: center;
    font-size: 2rem;
  }

  &__toolbar {
    padding: 1rem 0;
    @include flex(row, space-between);

    .toolbar__multiselect {
      width: 11rem;
    }
  }

  &__content {
    display: flex;
    height: calc(100% - 37px - 68.5px);
  }
}

.empty-content {
  width: 100%;
  height: 100%;
  @include flex(row, center, center);

  &__text{
    padding: 1rem;
    font-size: 2rem;
    background-color: var(--bg-card-color);
  }
}

.list-view {
  width: 100%;
  display: flex;
  overflow: hidden;

  &__panel {
    width: 60%;
    padding-right: 1rem;
    @include flex(column, normal, stretch, 1rem);
    overflow: auto;
  }

  &__preview {
    width: 40%;
    height: 100%;
  }

  &__item {
    display: flex;
    cursor: pointer;
    border: solid transparent 2px;

    &_selected {
      border-color: #000;
      background-color: #00000010;
    }
  }
}

.item {
  &__container-image {
    width: 20%;
    height: 200px;
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
    width: 80%;
    height: 200px;
    padding: 0 1rem;
    @include flex(column, normal, stretch, 1rem);
    background-color: var(--bg-card-color);

    .item__top-block {
      @include flex(row, space-between, stretch, 1rem);

      .item__name {
        max-width: calc(100% - 1rem - 80px);
        flex-shrink: 0;
        font-size: 2rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .item__tags {
      max-height: 3.5rem;
      overflow: auto;
      flex-shrink: 0;
    }

    .item__note {
      padding-right: 0.5rem;
      overflow: auto;
    }
  }

}

.tiles {
  width: 100%;
  height: 200px;
}

.tiles-view {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 250px);
  grid-template-rows: repeat(auto-fit, 300px);
  gap: 1rem 1rem;
  justify-content: space-between;
  overflow: auto;

  &__item {
    @include flex(column, normal, flex-start, 0.5rem);
    cursor: pointer;

    .item__name-block {
      width: 100%;
      @include flex(row, space-between, stretch, 0.5rem);

      .item__name {
        max-width: calc(100% - 0.5rem - 56px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.5rem;
      }

      .item__buttons {
        flex-shrink: 0;
        @include flex(row, normal, center);

        .item__button {
          padding: 0;
          width: 28px;
          height: 28px;
        }
      }
    }

    .item__tags-block {
      @include flex(row, normal, stretch, 0.5rem);
    }
  }
}
</style>