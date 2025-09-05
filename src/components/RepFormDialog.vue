<script setup>
import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useRepositoryStore } from '@/store/RepositoryStore';
import DB from '@/composables/db';

const RepositoryStore = useRepositoryStore();

const selectedRep = ref({
  name: null,
  description: null,
  background: null,
  backgroundImage: 'none',
});

const background = ref({
  list: [
    {name: "movies", url: "/svg/movies.svg"}, 
    {name: "books", url: "/svg/books.svg"},
    {name: "music", url: "/svg/music.svg"},
    {name: "nature", url: "/svg/nature.svg"},
    {name: "party", url: "/svg/party.svg"}
  ],
});
const backgroundStyle = computed(() => {
  return {
    backgroundColor: "#" + selectedRep.value.background,
    backgroundImage: `url(${selectedRep.value.backgroundImage})`,
    backgroundRepeat: "repeat"
  };
});


async function createRep() {
  if(!selectedRep.value.name) {
    return;
  }

  if(!selectedRep.value.background) {
    selectedRep.value.background = "e4e4e7";
  }

  if(!selectedRep.value.backgroundImage) {
    selectedRep.value.backgroundImage = "none";
  }

  await DB.addRep({
    id: uuidv4(),
    name: selectedRep.value.name,
    description: selectedRep.value.description,
    background: selectedRep.value.background,
    backgroundImage: selectedRep.value.backgroundImage
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
    background: selectedRep.value.background,
    backgroundImage: selectedRep.value.backgroundImage
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
    selectedRep.value.backgroundImage = RepositoryStore.selectedRepository.backgroundImage;
  }
}

</script>

<template>
  <Dialog
    v-model:visible="RepositoryStore.isVisibleRepFormDialog"
    @show="openRepFormDialog"
    @after-hide="closeRepFormDialog"
    modal
    :draggable="false"
    :style="backgroundStyle"
  >
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
      <div class="dialog-content__background-block">
        <div>Background</div>
        <div class="background__container">
          <ColorPicker
            v-model="selectedRep.background"
            defaultColor="e4e4e7"
            :pt="{
              preview: {
                style: {width: '75px', height: '75px', border: '1px solid black'}
              }
            }"
          />
          <div
            v-for="(val, index) in background.list"
            :key="index"
            @click="selectedRep.backgroundImage === val.url ? selectedRep.backgroundImage = 'none' : selectedRep.backgroundImage = val.url"
            :style="{backgroundImage: `url(${val.url})`}"
            class="background__image-container"
          >
            <i v-if="selectedRep.backgroundImage === val.url" class="pi pi-star-fill" style="color: #00ff00"></i>
          </div>
        </div>
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
  width: 530px;
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

  &__background-block {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}

.background {
  &__container {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
  }

  &__image-container {
    width: 75px;
    height: 75px;
    display: flex;
    align-items: end;
    border: 1px solid #000;
    border-radius: 6px;
    background-color: #fff;
    background-position: 25% 75%;
    overflow: hidden;
  }
}
</style>