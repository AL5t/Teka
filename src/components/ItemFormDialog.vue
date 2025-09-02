<script setup>
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import FileUpload from 'primevue/fileupload';
import { useRepositoryStore } from '@/store/RepositoryStore';
import { useItemStore } from '@/store/ItemStore';

import DB from '@/composables/db';
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

function addNewTag() {
  if(newTag.value) {
    addedItem.value.tags.push(newTag.value);
    allTags.value.push(newTag.value);
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

  await DB.addItem({
    id: uuidv4(),
    repId: RepositoryStore.selectedRepository.id,
    name: addedItem.value.name,
    note: addedItem.value.note,
    tags: Array.from(addedItem.value.tags),
    image: addedItem.value.image
  });

  emit("updateData");

  closeItemFormDialog();
}

async function editItem() {
  await DB.updateItem({
    id: ItemStore.selectedItem.id,
    repId: RepositoryStore.selectedRepository.id,
    name: addedItem.value.name,
    note: addedItem.value.note,
    tags: Array.from(addedItem.value.tags),
    image: addedItem.value.image
  });

  emit("updateData");

  closeItemFormDialog();
}

async function showItemFormDialog() {
  allTags.value = await DB.getAllUniqueTagsByRepId(RepositoryStore.selectedRepository?.id);

  if(ItemStore.isEditingItem) {
    addedItem.value = {
      name: ItemStore.selectedItem.name,
      note: ItemStore.selectedItem.note,
      tags: ItemStore.selectedItem.tags,
      image: ItemStore.selectedItem.image
    }
  }
}

function closeItemFormDialog() {
  ItemStore.isVisibleItemFormDialog = false;
  ItemStore.isCreatingItem = false;
  ItemStore.isEditingItem = false;
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
    v-model:visible="ItemStore.isVisibleItemFormDialog"
    @show="showItemFormDialog()"
    @after-hide="closeItemFormDialog()"
    modal
    :draggable="false"
    :style="{ width: '75%' }"
  >
    <template #header>
      <div v-if="ItemStore.isCreatingItem">Add item</div>
      <div v-if="ItemStore.isEditingItem">Edit item</div>
    </template>
    <div class="dialog-content">
      <div>
        <div v-if="ItemStore.isEditingItem && addedItem.image" class="image-container">
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
      <Button v-if="ItemStore.isCreatingItem" label="Add" severity="success" @click="addItem()" :disabled="!addedItem.name || !addedItem.tags?.length" autofocus />
      <Button v-if="ItemStore.isEditingItem" label="Edit" severity="success" @click="editItem()" :disabled="!addedItem.name || !addedItem.tags?.length" autofocus />
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
.dialog-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.image-container {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    overflow: hidden;

    .responsive-image {
      width: auto;
      height: 100%;
    }
  }
</style>