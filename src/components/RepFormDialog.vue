<script setup>
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useRepositoryStore } from '@/store/RepositoryStore';
import DB from '@/composables/db';

const RepositoryStore = useRepositoryStore();

const selectedRep = ref({
  name: null,
  description: null,
  background: null,
});


async function createRep() {
  if(!selectedRep.value.name) {
    return;
  }

  if(!selectedRep.value.background) {
    selectedRep.value.background = "e4e4e7";
  }

  await DB.addRep({
    id: uuidv4(),
    name: selectedRep.value.name,
    description: selectedRep.value.description,
    background: selectedRep.value.background
  });

  RepositoryStore.isVisibleRepFormDialog = false;

  await RepositoryStore.getAllReps();
  RepositoryStore.repCarouselUpdateKey++;
}


async function editRep() {
  if(!selectedRep.value.name) {
    return;
  }

  RepositoryStore.isVisibleRepFormDialog = false;

  await DB.updateRep({
    id: RepositoryStore.selectedRepository.id,
    name: selectedRep.value.name,
    description: selectedRep.value.description,
    background: selectedRep.value.background
  });

  await RepositoryStore.getAllReps();
}


function closeRepFormDialog() {
  RepositoryStore.isVisibleRepFormDialog = false;
  RepositoryStore.isCreatingRep = false;
  RepositoryStore.isEditingRep = false;
}


function openRepFormDialog() {
  if(RepositoryStore.selectedRepository?.name) {
    selectedRep.value.name = RepositoryStore.selectedRepository.name;
    selectedRep.value.description = RepositoryStore.selectedRepository.description;
    selectedRep.value.background = RepositoryStore.selectedRepository.background;
  }
}

</script>

<template>
  <Dialog v-model:visible="RepositoryStore.isVisibleRepFormDialog" @show="openRepFormDialog" @after-hide="closeRepFormDialog" modal :draggable="false" :style="{ width: '50rem' }">
    <template #header>
      <div>
        <span v-if="RepositoryStore.isCreatingRep">Create</span>
        <span v-if="RepositoryStore.isEditingRep">Edit</span>
        <span> repository</span>
      </div>
    </template>
    <div class="dialog-content">
      <div>
        <InputText v-model="selectedRep.name" type="text" class="dialog-content__input" autocomplete="off" placeholder="Repository name" />
      </div>
      <div>
        <Textarea v-model="selectedRep.description" class="dialog-content__textarea" rows="5" autocomplete="off" placeholder="Description" />
      </div>
      <div class="dialog-content__color-picker">
        <span>Background</span>
        <ColorPicker
          v-model="selectedRep.background"
          defaultColor="e4e4e7"
          :pt="{
            preview: {
              style: {width: '35px', height: '35px'}
            }
          }"
        />
      </div>
    </div>
    <template #footer>
      <Button label="Close" severity="danger" @click="closeRepFormDialog" autofocus />
      <Button
        :label="RepositoryStore.isCreatingRep ? 'Create' : 'Edit'"
        severity="success"
        @click="RepositoryStore.isCreatingRep ? createRep() : editRep()"
        autofocus
        :disabled="!selectedRep.name"
      />
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
.dialog-content {
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__input {
    width: 100%;
  }

  &__textarea {
    width: 100%;
    resize: none;
  }

  &__color-picker {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
}
</style>