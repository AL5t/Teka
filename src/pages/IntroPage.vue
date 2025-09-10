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
  if (window.innerWidth < 800) {
    steps.value.number = 4;
    columns.value.number = 4;
  }

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
  <div class="intro-page-container">
    <div class="temple">
      <div class="roof-container" :class="{ active: roof.active }">
        <div class="roof">τέκα</div>
        <div class="roof-base"></div>
      </div>
      <div class="columns-container">
        <div v-for="col in columns.number" :key="col" class="column" :class="{ active: columns.active[col - 1] }">
          <div class="column__top">
            <div class="top__block"></div>
            <div class="top__trapezoid"></div>
          </div>
          <div class="column__middle"></div>
        </div>
        <Button
          icon="pi pi-sign-in"
          variant="text"
          @click="goHomePage"
          class="button-enter"
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
          <div class="step"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.intro-page-container {
  width: 100%;
  @include flex(row, center, center);
}

.temple {
  width: 1000px;
  @include flex(column, center, center);
}

.roof-container {
  width: 72%;
  height: 185px;
  @include transition(translateY(-100px), translateY(0));

  .roof {
    width: 100%;
    height: 60%;
    clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
    background: #1c1c1c;
    @include flex(row, center, end);
    font-size: 3.5rem;
    color: var(--p-zinc-200);
  }

  .roof-base {
    width: 100%;
    height: 40%;
    background: #1c1c1c;
  }
}

.columns-container {
  width: 70%;
  @include flex(row, space-between);
  position: relative;
  
  .column {
    width: 63px;
    height: 260px;
    @include transition(translateY(-100px), translateY(0));

    &__top {
      width: 100%;
      height: 6%;

      .top__block {
        height: 50%;
        background: #1c1c1c;
      }
    
      .top__trapezoid {
        height: 50%;
        clip-path: polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%);
        background: #1c1c1c;
      }
    }

    &__middle {
      width: 100%;
      height: 94%;
      border: 1px solid #1c1c1c;
      clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
      background: #1c1c1c
    }
  }

  .button-enter {
    position: absolute;
    top: 50%;
    left: calc(50% - 24px);
  }
}

.steps-container {
  width: 100%;
  @include flex(column-reverse);

  .step-container {
    opacity: 0;
    transition: opacity 0.5s ease;

    &.active {
      opacity: 1;
    }

    .step {
      width: 100%;
      height: 1rem;
      background: #1c1c1c;
    }
  }
}

.trapezoid {
  width: 100%;
  height: 0.5rem;
  background: rgb(62, 62, 62);
  clip-path: polygon(1rem 0%, calc(100% - 1rem) 0%, 100% 100%, 0% 100%);
}
</style>
