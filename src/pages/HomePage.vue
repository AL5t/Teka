<script setup>
import { onBeforeMount, ref } from 'vue';
import CardView from '@/components/CardView.vue';
import { useRepositoryStore } from '@/store/RepositoryStore';

const RepositoryStore = useRepositoryStore();

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 3,
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

onBeforeMount(async () => {
  await RepositoryStore.getAllReps();
  console.log(RepositoryStore.allReps);
})
</script>

<template>
  <div class="main-page-container">
    <div class="carousel-container">
      <Carousel
        :value="RepositoryStore.allReps"
        :numVisible="4"
        :numScroll="1"
        :responsiveOptions="responsiveOptions"
        circular
        :autoplayInterval="15000"
        :key="RepositoryStore.repCarouselUpdateKey"
      >
        <template #item="slotProps">
          <CardView :card="slotProps.data" />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-page-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.carousel-container {
  width: 75%;
}
</style>
