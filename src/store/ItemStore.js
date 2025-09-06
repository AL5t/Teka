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

    openItemFormDialog(target, item) {
      this.isVisibleItemFormDialog = true;

      if(target === "edit") {
        this.setSelectedItem(item);
        this.isEditingItem = true;
      } else {
        this.isCreatingItem = true;
      }
    }
  },
  persist: true,
});