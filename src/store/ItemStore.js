import { defineStore } from 'pinia';
import DB from '@/composables/db';

export const useItemStore = defineStore('ItemStore', {
  state: () => ({
    selectedItem: null,
    
    activeDialog: 'itemView' | 'itemForm' | null,

    mode: 'create' | 'edit' | null
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
      return await DB.getItemsByRepId(this.selectedRepository?.id);
    },

    async searchItemsByTags(tags) {
      return await DB.searchItemsByTags(this.selectedRepository?.id, tags);
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
      await DB.deleteItem(itemId);
    },

    
  },
  persist: true,
});