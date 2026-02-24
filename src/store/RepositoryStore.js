import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import DB from '@/composables/db';

export const useRepositoryStore = defineStore('RepositoryStore', {
  state: () => ({
    allReps: [],
    repCarouselUpdateKey: 0,
    selectedRepository: null,
    isListView: false,

    isVisibleRepFormDialog: false,

    mode: null
  }),
  getters: {},
  actions: {
    setSelectedRepository(rep) {
      this.selectedRepository = rep;
    },

    openRepFormDialog(target, card = null) {
      this.isVisibleRepFormDialog = true;
      this.mode = target;
      this.setSelectedRepository(card);
    },

    async getAllReps() {
      try {
        const reps = await DB.getAllReps();
        this.allReps = [...reps, { isTemplate: true }];
      } catch (error) {
        console.error('Failed to load repositories:', error);
        this.allReps = [{ isTemplate: true }];
      }
    },

    async getRep() {
      if (!this.selectedRepository?.id) return null;
      return await DB.getRep(this.selectedRepository.id);
    },

    async getAllUniqueTagsByRepId() {
      if (!this.selectedRepository?.id) return [];
      return await DB.getAllUniqueTagsByRepId(this.selectedRepository.id);
    },

    async addRep(repId, repName, repDescription, repBackground, repBackgroundImage) {
      await DB.addRep({
        id: repId,
        name: repName,
        description: repDescription,
        background: repBackground,
        backgroundImage: repBackgroundImage,
      });
    },

    async updateRep(repName, repDescription, repBackground, repBackgroundImage) {
      if (!this.selectedRepository?.id) return;
      await DB.updateRep({
        id: this.selectedRepository.id,
        name: repName,
        description: repDescription,
        background: repBackground,
        backgroundImage: repBackgroundImage
      });
    },

    async deleteRep(repId) {
      await DB.deleteRep(repId);
    },

    async addDemoData(repId, repName, repDescription, repBackground, repBackgroundImage, repItems) {
      await this.addRep(repId, repName, repDescription, repBackground, repBackgroundImage);

      for (const repItem of repItems) {
        let image = null;
        if (repItem.image) {
          try {
            const response = await fetch(repItem.image);
            if (!response.ok) {
              throw new Error(`Image fetch failed: ${response.status}`);
            }
            image = await response.blob();
          } catch (error) {
            console.error('Failed to load demo image:', error);
          }
        }
        await DB.addItem({
          id: uuidv4(),
          repId,
          name: repItem.name,
          note: repItem.note,
          tags: repItem.tags,
          image,
        });
      }
    },
  },
  persist: true,
});
