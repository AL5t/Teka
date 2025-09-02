<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const steps = ref({
  active: [],
  number: 7,
  padding: 1,
  delay: 100
});

const columns = ref({
  active: [],
  number: 6,
  delay: 200
});

const roof = ref({
  active: false,
  delay: 200
});

const title = ref({
  active: false,
});

async function goHomePage() {
  roof.value.active = false;
  steps.value.active = false;
  columns.value.active = false;
  title.value.active = false;
  setTimeout(() => {
    router.push('/home');
  }, 400);
}

onBeforeMount(async () => {
  for (let i = 0; i < steps.value.number; i++) {
    setTimeout(() => {
      steps.value.active[i] = true;
    }, i * steps.value.delay);
  }

  setTimeout(() => {
    for (let i = 0; i < columns.value.number; i++) {
      setTimeout(() => {
        columns.value.active[i] = true;
      }, columns.value.delay);
    }
  }, steps.value.number * steps.value.delay);

  setTimeout(() => {
    roof.value.active = true;
    title.value.active = true;
  }, columns.value.delay + steps.value.number * steps.value.delay + roof.value.delay);
})
</script>

<template>
  <div class="intro-page-container" style="position: relative;">
    <div class="temple" style="width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
      <div class="roof-container" :class="{ active: roof.active }">
        <div
          style="
            width: 100%;
            height: 60%;
            clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
            background: black;
          "
          class="roof"
        >
        </div>
        <div style="width: 100%; height: 40%; border: 1px solid black;">
          <div style="height: 50%; background: black;"></div>
          <div style="height: 50%; background: black;"></div>
        </div>
      </div>
      <div class="roof__title" :class="{ active: title.active }">τέκα</div>
      <div class="columns-container" style="position: relative;">
        <div v-for="col in columns.number" :key="col" class="column" :class="{ active: columns.active[col - 1] }">
          <div class="column__top">
            <div class="top__block"></div>
            <div class="top__trapezoid"></div>
          </div>
          <div class="column__middle"></div>
        </div>
        <Button icon="pi pi-sign-in" variant="text" style="position: absolute; top: 50%; left: calc(50% - 24px); font-size: 2rem;"
          @click="goHomePage"
          :pt="{
            icon: {
              style: {
                fontSize: '2rem'
              }
            }
          }"

        >
        </Button>
      </div>
      <div class="steps-container">
        <div
          v-for="step in steps.number"
          :key="step"
          class="step-container"
          :class="{ active: steps.active[step - 1] }"
          :style="{paddingLeft: step * steps.padding + 'rem', paddingRight: step * steps.padding + 'rem'}"
        >
          <!-- <div class="trapezoid"></div> -->
          <div class="step"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.intro-page-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.roof-container {
  width: 714px;
  height: 185px;
  opacity: 0;
  transform: translateY(-100px);
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.roof-container.active {
  opacity: 1;
  transform: translateY(0);
}

.roof__title {
  position: absolute;
  top: 290px;
  left: calc(50% - 57.5px);
  z-index: 3;
  font-size: 3.5rem;
  transform: translateY(-290px);
  transition: transform 0.5s ease, opacity 0.5s ease;
  color: var(--p-zinc-200);
  opacity: 0;
}
.roof__title.active {
  opacity: 1;
  transform: translateY(0);
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.columns-container {
  width: 700px;
  display: flex;
  justify-content: space-between;
  
  .column {
    width: 63px;
    height: 260px;
    opacity: 0;
    transform: translateY(-100px);
    transition: transform 0.5s ease, opacity 0.5s ease;

    &__top {
      width: 100%;
      height: 6%;

      .top__block {
        height: 50%;
        background: black;
      }
    
      .top__trapezoid {
        height: 50%;
        clip-path: polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%);
        background: black;
      }
    }

    &__middle {
      width: 100%;
      height: 94%;
      border: 1px solid black;
      clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
      background: black
    }
  }
}

.column.active {
  opacity: 1;
  transform: translateY(0);
}

.steps-container {
  width: 100%;
  padding: 0 3rem;
  display: flex;
  flex-direction: column-reverse;
}

.step {
  width: 100%;
  height: 1rem;
  background: black;
}

.step-container {
  opacity: 0;
  transition: opacity 0.5s ease;
}

.step-container.active {
  opacity: 1;
}

.trapezoid {
  width: 100%;
  height: 0.5rem;
  background: rgb(62, 62, 62);
  clip-path: polygon(1rem 0%, calc(100% - 1rem) 0%, 100% 100%, 0% 100%);
}
</style>
