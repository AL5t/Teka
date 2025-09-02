import { defineStore } from 'pinia';

export const useItemStore = defineStore('ItemStore', {
  state: () => ({
    selectedItem: null,
    
    isVisibleItemViewDialog: false,
    isVisibleItemFormDialog: false,

    isCreatingItem: false,
    isEditingItem: false,
  }),
  getters: {},
  actions: {
    setSelectedItem(item) {
      this.selectedItem = item;
    },
  },
  persist: true,
});