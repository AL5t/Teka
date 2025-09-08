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
      background: demoData[i].background,
      backgroundImage: demoData[i].backgroundImage,
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

  for (let i = 0; i < columns.value.number; i++) {
    setTimeout(() => {
      columns.value.active[i] = true;
    }, i * columns.value.delay);
  }
})
</script>

<template>
  <div class="main-page-container">
    <div class="books-side books-side_left">
      <div
        v-for="col in columns.number - 1"
        :key="col"
        :style="{ width: col + 3.5 + 'rem'}"
        class="books-row books-row_left"
        :class="{ active: columns.active[col - 1] }"
      >
        <div class="books-column"></div>
        <div class="books-shelves">
          <div
            v-for="shelf in col + 4"
            :key="shelf"
            class="books-shelf"
            :style="{ height: col + 3 + 'rem'}"
          >
            <div v-for="book in 3" :key="book" class="book" :style="{ height: col + 2 + 'rem' }"></div>
          </div>
        </div>
      </div>
      <div class="books-row books-row_left row-column" :class="{ active: columns.active[3] }"></div>
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
    <div class="books-side books-side_right">
      <div
        v-for="col in columns.number - 1"
        :key="col"
        :style="{ width: col + 3.5 + 'rem'}"
        class="books-row books-row_right"
        :class="{ active: columns.active[col - 1] }"
      >
        <div class="books-column"></div>
        <div class="books-shelves">
          <div
            v-for="shelf in col + 4"
            :key="shelf"
            class="books-shelf"
            :style="{ height: col + 3 + 'rem'}"
          >
            <div v-for="book in 3" :key="book" class="book" :style="{ height: col + 2 + 'rem' }"></div>
          </div>
        </div>
      </div>
      <div class="books-row books-row_right row-column" :class="{ active: columns.active[3] }"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.books-side {
  width: 20.5rem;
  height: 95%;
  display: flex;
  
  &_left {
    clip-path: polygon(0% 0%, 100% 30%, 100% 70%, 0% 100%);
    flex-direction: row-reverse;
  }

  &_right {
    clip-path: polygon(0% 30%, 100% 0%, 100% 100%, 0% 70%);
  }

  .books-row {
    height: 100%;
    width: 2.5rem;
    display: flex;

    &_left {
      flex-direction: row-reverse;
      @include transition(translateX(100px), translateX(0));
    }

    &_right {
      @include transition(translateX(-100px), translateX(0));
    }

    .books-column {
      width: 45%;
      height: 100%;
      background: #333;
    }

    .books-shelves {
      width: 55%;
      height: 100%;
      @include flex(column, center);

      .books-shelf {
        width: 100%;
        border-bottom: 3px solid #333;
        @include flex(row, start, end, 0.25rem);

        .book {
          width: 1rem;
          background: #d8ccb0;
        }
      }
    }
  }

  .row-column {
    width: 4rem;
    background: #333;
  }
}

.main-page-container {
  width: 100%;
  @include flex(row, center, center);
}

.carousel-container {
  width: 40rem;
}
</style>
