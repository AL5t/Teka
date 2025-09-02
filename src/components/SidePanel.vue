<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import { useRepositoryStore } from '@/store/RepositoryStore';
import DB from '@/composables/db';

const RepositoryStore = useRepositoryStore();

const icons = ref([
  "pi pi-check",
  "pi pi-times",
  "pi pi-search",
  "pi pi-user",
  "pi pi-address-book",
  "pi pi-android",
  "pi pi-amazon",
  "pi pi-at",
  "pi pi-box"
]);

const emit = defineEmits(['updateSelectedCategory']);
const selectedCategory = ref();
const emitValue = () => {
  emit('updateSelectedCategory', selectedCategory.value);
}

const repData = ref();
const createdCategory = ref({
  name: null,
  icon: null,
});

const categories = computed(() => {
  return repData.value?.categories || [];
});

const popoverCreateCategory = ref();
const togglePopoverCreateCategory = (event) => {
  popoverCreateCategory.value.toggle(event);
};

function createCategory() {
  togglePopoverCreateCategory();
  repData.value.categories.push({name: createdCategory.value.name, icon: createdCategory.value.icon});
}

onBeforeMount(async () => {
  repData.value = await DB.getRep(RepositoryStore.selectedRepository?.id);
})
</script>

<template>
  <div class="side-panel">
    <Button
      v-for="(category, index) in categories"
      :key="index"
      :label="category.name"
      :icon="category.icon"
      iconPos="top"
      variant="text"
      :severity="selectedCategory === category.name ? 'success' : 'secondary'"
      @click="
        selectedCategory === category.name ? selectedCategory = null : selectedCategory = category.name;
        emitValue();
      "
    ></Button>
    <Button icon="pi pi-plus" variant="text" severity="secondary" @click="togglePopoverCreateCategory"></Button>
    <Popover ref="popoverCreateCategory">
      <div class="popover-category">
        <InputText v-model="createdCategory.name" type="text" class="w-full" autocomplete="off" placeholder="Category name" />
        <ScrollPanel style="width: 100%; height: 60px">
          <div class="popover-category__icons">
            <div
              v-for="(icon, index) in icons"
              :key="index"
              @click="createdCategory.icon === icon ? createdCategory.icon = null : createdCategory.icon = icon"
              class="popover-category__icon"
              :class="{'popover-category__icon_selected': createdCategory.icon === icon }"
            >
              <span :class="icon"></span>
            </div>
          </div>
        </ScrollPanel>
        <Button label="Create" severity="success" @click="createCategory" autofocus />
      </div>
    </Popover>
  </div>
</template>

<style scoped lang="scss">
.side-panel {
  width: 10%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 1rem;
}

.popover-category {
  width: 140px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  &__icons {
    width: 100%;
    padding: 0 0;
    display: grid;
    grid-template-columns: repeat(5, 20px);
    grid-template-rows: repeat(3, 20px);
    gap: 10px 10px;
  }

  &__icon {
    width: 100%;
    height: 100%;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;

    &_selected {
      border: 1px solid red;
    }
  }
}
</style>