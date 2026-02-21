import { defineStore } from 'pinia';
import DB from '@/composables/db';
import { useRepositoryStore } from '@/store/RepositoryStore';

export const useItemStore = defineStore('ItemStore', {
  state: () => ({
    selectedItem: null,
    
    activeDialog: null,

    mode: null
  }),
  getters: {},
  actions: {
    setSelectedItem(item) {
      this.selectedItem = item;
    },

    openItemFormDialog(target, item = null) {
      this.mode = target;
      this.setSelectedItem(item);
      this.activeDialog = 'itemForm';
    },

    async getItem() {
      return await DB.getItem(this.selectedItem?.id)
    },

    async getItemsByRepId() {
      const repositoryStore = useRepositoryStore();
      return await DB.getItemsByRepId(repositoryStore.selectedRepository?.id);
    },

    async searchItemsByTags(tags) {
      const repositoryStore = useRepositoryStore();
      return await DB.searchItemsByTags(repositoryStore.selectedRepository?.id, tags);
    },

    async addItem(itemId, repId, itemName, itemNote, itemTags, itemImage) {
      await DB.addItem({
        id: itemId,
        repId: repId,
        name: itemName,
        note: itemNote,
        tags: itemTags,
        image: itemImage
      });
    },

    async updateItem(repId, itemName, itemNote, itemTags, itemImage) {
      if (!this.selectedItem?.id) return;
      await DB.updateItem({
        id: this.selectedItem.id,
        repId: repId,
        name: itemName,
        note: itemNote,
        tags: itemTags,
        image: itemImage
      });
    },


    async deleteItem(itemId) {
      if (!itemId) return;
      await DB.deleteItem(itemId);
    },

    
  },
  persist: true,
});
