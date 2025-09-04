<script setup>
import { onBeforeMount, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import DB from '@/composables/db';
import demoData from '@/demo-data/demoData';
import CardView from '@/components/CardView.vue';
import { useRepositoryStore } from '@/store/RepositoryStore';

const RepositoryStore = useRepositoryStore();

const columns = ref({
  number: 4,
  active: [],
  delay: 200,
});

const responsiveOptions = ref([
  {
    breakpoint: '1600px',
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: '1199px',
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: '767px',
    numVisible: 1,
    numScroll: 1,
  },
]);

async function addDemoData() {
  for (let i = 0; i < demoData.length; i++) {
    const repId = uuidv4();
    await DB.addRep({
      id: repId,
      name: demoData[i].name,
      description: demoData[i].description,
      background: demoData[i].background
    }).then(async () => {
      for (let j = 0; j < demoData[i].items.length; j++) {
        let image = null;
        if(demoData[i].items[j].image) {
          const response = await fetch(demoData[i].items[j].image);
          if (!response.ok) {
            throw new Error('Ошибка загрузки изображения');
          }
          image = await response.blob();
        }
        await DB.addItem({
          id: uuidv4(),
          repId: repId,
          name: demoData[i].items[j].name,
          note: demoData[i].items[j].note,
          tags: demoData[i].items[j].tags,
          image: image
        });
      }
    });
  }
}

onBeforeMount(async () => {
  await RepositoryStore.getAllReps();

  if(RepositoryStore.allReps?.length === 1) {
    await addDemoData();
    await RepositoryStore.getAllReps();
  }
  console.log("allReps", RepositoryStore.allReps);

  for (let i = 0; i < columns.value.number; i++) {
    setTimeout(() => {
      columns.value.active[i] = true;
    }, i * columns.value.delay);
  }
})
</script>

<template>
  <div class="main-page-container">
    <div
      style="
        width: 20.5rem;
        height: 95%;
        clip-path: polygon(0% 0%, 100% 30%, 100% 70%, 0% 100%);
        display: flex;
        flex-direction: row-reverse;
      "
    >
      <div
        v-for="col in columns.number - 1"
        :key="col"
        style="height: 100%; width: 2.5rem; display: flex; flex-direction: row-reverse;"
        :style="{ width: col + 3.5 + 'rem'}"
        class="booksCol__left"
        :class="{ active: columns.active[col - 1] }"
      >
        <div style="width: 45%; height: 100%; background: #333;"></div>
        <div style="width: 55%; height: 100%; display: flex; flex-direction: column; justify-content: center;">
          <div
            v-for="shelf in col + 4"
            :key="shelf"
            style="width: 100%; border-bottom: 3px solid #333; display: flex; gap: 0.25rem; align-items: end; justify-content: start;"
            :style="{ height: col + 3 + 'rem'}"
          >
            <div v-for="book in 3" :key="book" style="width: 1rem; background: #c3c3c3;" :style="{ height: col + 2 + 'rem' }"></div>
          </div>
        </div>
      </div>
      <div style="width: 4rem; height: 100%; background: #333;" class="booksCol" :class="{ active: columns.active[3] }"></div>

    </div>
    <div class="carousel-container">
      <Carousel
        :value="RepositoryStore.allReps"
        :numVisible="3"
        :numScroll="1"
        :responsiveOptions="responsiveOptions"
        circular
        :autoplayInterval="4000"
        :key="RepositoryStore.repCarouselUpdateKey"
      >
        <template #item="slotProps">
          <CardView :card="slotProps.data" />
        </template>
      </Carousel>
    </div>
    <div
      style="
        width: 20.5rem;
        height: 95%;
        clip-path: polygon(0% 30%, 100% 0%, 100% 100%, 0% 70%);
        display: flex;
      "
    >
      <div
        v-for="col in columns.number - 1"
        :key="col"
        style="height: 100%; width: 2.5rem; display: flex;"
        :style="{ width: col + 3.5 + 'rem'}"
        class="booksCol"
        :class="{ active: columns.active[col - 1] }"
      >
        <div style="width: 45%; height: 100%; background: #333;"></div>
        <div style="width: 55%; height: 100%; display: flex; flex-direction: column; justify-content: center;">
          <div
            v-for="shelf in col + 4"
            :key="shelf"
            style="width: 100%; border-bottom: 3px solid #333; display: flex; gap: 0.25rem; align-items: end; justify-content: start;"
            :style="{ height: col + 3 + 'rem'}"
          >
            <div v-for="book in 3" :key="book" style="width: 1rem; background: #c3c3c3;" :style="{ height: col + 2 + 'rem' }"></div>
          </div>
        </div>
      </div>
      <div style="width: 4rem; height: 100%; background: #333;" class="booksCol" :class="{ active: columns.active[3] }"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.booksCol {
  opacity: 0;
  transform: translateX(-100px);
  transition: transform 0.5s ease, opacity 0.5s ease;
}
.booksCol__left {
  opacity: 0;
  transform: translateX(100px);
  transition: transform 0.5s ease, opacity 0.5s ease;
}
.booksCol.active {
  opacity: 1;
  transform: translateX(0);
}
.booksCol__left.active {
  opacity: 1;
  transform: translateX(0);
}
.main-page-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-container {
  width: 40rem;
}
</style>
