<script setup>
import { computed, inject, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import FileUpload from 'primevue/fileupload';
import { useRepositoryStore } from '@/store/RepositoryStore';
import { useItemStore } from '@/store/ItemStore';

import showUrl from '@/composables/showUrl';

const RepositoryStore = useRepositoryStore();
const ItemStore = useItemStore();

const emit = defineEmits(['updateData']);

const addedItem = ref({
  name: null,
  note: null,
  tags: [],
  image: null
});

const newTag = ref();
const allTags = ref([]);
const srcUploadingFile = ref();
const isSelectImage = ref(false);

const isVisibleItemFormDialog = computed({
  get: () => ItemStore.activeDialog === 'itemForm',
  set: (value) => {
    if(!value) {
      ItemStore.activeDialog = null;
    }
  },
});

const callHandler = inject('callHandler');
function updateItemData() {
  callHandler('PreviewItem', 'updateItemData');
}

function addNewTag() {
  const normalizedTag = newTag.value?.trim();
  if (normalizedTag && !addedItem.value.tags.includes(normalizedTag)) {
    addedItem.value.tags.push(normalizedTag);
    if (!allTags.value.includes(normalizedTag)) {
      allTags.value.push(normalizedTag);
    }
    newTag.value = null;
  }
}

function selectImage(event) {
  addedItem.value.image = event.files[0];
  isSelectImage.value = true;
};

function removeImage() {
  addedItem.value.image = null;
  isSelectImage.value = false;
}

async function addItem() {
  if(!addedItem.value.name || !addedItem.value.tags?.length) return;

  await ItemStore.addItem(
    uuidv4(),
    RepositoryStore.selectedRepository.id,
    addedItem.value.name,
    addedItem.value.note,
    Array.from(addedItem.value.tags),
    addedItem.value.image
  );

  emit("updateData");

  closeItemFormDialog();
}

async function editItem() {
  await ItemStore.updateItem(
    RepositoryStore.selectedRepository.id,
    addedItem.value.name,
    addedItem.value.note,
    Array.from(addedItem.value.tags),
    addedItem.value.image
  );

  emit("updateData");

  updateItemData();

  closeItemFormDialog();
}

async function showItemFormDialog() {
  allTags.value = await RepositoryStore.getAllUniqueTagsByRepId();

  if(ItemStore.mode === 'edit') {
    addedItem.value = {
      name: ItemStore.selectedItem.name,
      note: ItemStore.selectedItem.note,
      tags: ItemStore.selectedItem.tags,
      image: ItemStore.selectedItem.image
    }
  }
}

function closeItemFormDialog() {
  ItemStore.activeDialog = null;
  ItemStore.mode = null;
  addedItem.value = {
    name: null,
    note: null,
    tags: [],
    image: null
  };
  srcUploadingFile.value = null;
  isSelectImage.value = false;
}
</script>

<template>
  <Dialog
    v-model:visible="isVisibleItemFormDialog"
    @show="showItemFormDialog()"
    @after-hide="closeItemFormDialog()"
    modal
    :draggable="false"
    style="width: 75%; border-radius: 0;"
  >
    <template #header>
      <div v-if="ItemStore.mode === 'create'">Add item</div>
      <div v-if="ItemStore.mode === 'edit'">Edit item</div>
    </template>
    <div class="dialog-content">
      <div>
        <div v-if="ItemStore.mode === 'edit' && addedItem.image" class="image-container">
          <img :src="showUrl(ItemStore.selectedItem?.image)" class="responsive-image" />
          <Button icon="pi pi-times" variant="text" severity="danger" @click="addedItem.image = null" />
        </div>
        <div v-else>
          <FileUpload
            @select="selectImage"
            @remove="removeImage"
            :showUploadButton="false"
            :showCancelButton="false"
            :multiple="false"
            :fileLimit="1"
            :disabled="isSelectImage"
            :pt=" {
              content: {
                style: {padding: 0, border: 0}
              }
            }"
          ></FileUpload>
        </div>
      </div>
      <div style="display: flex; gap: 1rem;">
        <div style="width: 50%; display: flex; flex-direction: column; gap: 1rem;">
          <InputText
            v-model="addedItem.name"
            type="text"
            autocomplete="off"
            placeholder="Name"
            class="dialog-content__input"
          />
          <Textarea
            v-model="addedItem.note"
            rows="4"
            autocomplete="off"
            placeholder="Note"
            class="dialog-content__textarea"
          />
        </div>
        <div style="width: 50%; display: flex; flex-direction: column; gap: 1rem;">
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="display: flex; gap: 2rem">
              <MultiSelect
                v-model="addedItem.tags"
                showClear
                :options="allTags"
                filter
                placeholder="Add tags"
                :maxSelectedLabels="0"
                :selectedItemsLabel="addedItem.tags?.length + ' tags'"
                style="width: 100%;"
              >
                <template #footer>
                  <div class="p-3 flex justify-between">
                    <InputGroup style="width: 100%;">
                      <InputText v-model="newTag" placeholder="Add new tag" />
                      <InputGroupAddon>
                        <Button icon="pi pi-plus" severity="secondary" variant="text" @click="addNewTag" />
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                </template>
              </MultiSelect>
            </div>
            <div class="tags">
              <Tag
                v-for="(tag, ind) in addedItem.tags"
                :key="ind"
                :value="tag"
                class="tag"
              ></Tag>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Close" severity="danger" @click="closeItemFormDialog()" autofocus />
      <Button v-if="ItemStore.mode === 'create'" label="Add" severity="success" @click="addItem()" :disabled="!addedItem.name || !addedItem.tags?.length" autofocus />
      <Button v-if="ItemStore.mode === 'edit'" label="Edit" severity="success" @click="editItem()" :disabled="!addedItem.name || !addedItem.tags?.length" autofocus />
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
.dialog-content {
  @include flex(column, normal, stretch, 1rem);
}

.image-container {
    width: 100%;
    height: 100px;
    @include flex(row, space-between, center);
    flex-shrink: 0;
    overflow: hidden;

    .responsive-image {
      width: auto;
      height: 100%;
    }
  }
</style>
