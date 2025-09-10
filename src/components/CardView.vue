<script setup>
import { useRouter } from 'vue-router';
import { useRepositoryStore } from '@/store/RepositoryStore';
import RepFormDialog from '@/components/RepFormDialog.vue';
import DB from '@/composables/db';

const router = useRouter();
const RepositoryStore = useRepositoryStore();

const { card } = defineProps({
  card: Object,
});

function openCard(cardId, cardTitle) {
  RepositoryStore.setSelectedRepository({ id: cardId, name: cardTitle });
  router.push('/' + cardTitle.toLowerCase());
}

function openRepFormDialog(target, card) {
  RepositoryStore.isVisibleRepFormDialog = true

  if(target === "edit") {
    RepositoryStore.isEditingRep = true;
    RepositoryStore.setSelectedRepository(card);
  } else {
    RepositoryStore.isCreatingRep = true;
    RepositoryStore.setSelectedRepository(null);
  }
}

async function deleteRepository() {
  await DB.deleteRep(card.id);
  await RepositoryStore.getAllReps();
  RepositoryStore.repCarouselUpdateKey++;
}
</script>

<template>
  <template v-if="card.isTemplate">
    <div class="card_empty">
      <Button variant="text" @click="openRepFormDialog('create')">
        <i class="pi pi-plus" style="font-size: 4rem"></i>
      </Button>
      <RepFormDialog />
    </div>
  </template>
  <template v-else>
    <div class="card">
      <div class="card__buttons">
        <Button
          icon="pi pi-pencil"
          variant="text"
          @click="openRepFormDialog('edit', card)"
        ></Button>
        <Button
          icon="pi pi-trash"
          variant="text"
          @click="deleteRepository()"
        ></Button>
      </div>
      <div class="card__title">{{ card.name }}</div>
      <div class="card__desc">{{ card.description }}</div>
      <Button label="Open" @click="openCard(card.id, card.name)"></Button>
    </div>
  </template>
</template>

<style scoped lang="scss">
.card {
  height: 300px;
  padding: 10px;
  margin: 0 10px;
  @include flex(column, normal, stretch, 0.5rem);
  border: 2px solid var(--p-zinc-500);

  &__buttons {
    @include flex(row, end);
  }

  &__desc {
    width: 100%;
    flex-grow: 1;
  }

  &__title {
    text-align: center;
    font-size: 2rem;
  }

  &_empty {
    height: 300px;
    @include flex(row, center, center);
  }
}
</style>
