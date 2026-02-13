import { defineStore } from 'pinia';
import DB from '@/composables/db';

export const useRepositoryStore = defineStore('RepositoryStore', {
  state: () => ({
    allReps: [],
    repCarouselUpdateKey: 0,
    selectedRepository: null,
    isListView: false,

    isVisibleRepFormDialog: false,

    mode: 'create' | 'edit' | null
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
      this.allReps = await DB.getAllReps();
      this.allReps.push({ isTemplate: true });
    },

    async getRep() {
      return await DB.getRep(this.selectedRepository?.id);
    },

    async getAllUniqueTagsByRepId() {
      return await DB.getAllUniqueTagsByRepId(this.selectedRepository?.id);
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
      await this.addRep(repId, repName, repDescription, repBackground, repBackgroundImage)
      .then(async () => {
        for (let j = 0; j < repItems.length; j++) {
          let image = null;
          if(repItems[j].image) {
            const response = await fetch(repItems[j].image);
            if (!response.ok) {
              throw new Error('Ошибка загрузки изображения');
            }
            image = await response.blob();
          }
          await DB.addItem({
            id: uuidv4(),
            repId: repId,
            name: repItems[j].name,
            note: repItems[j].note,
            tags: repItems[j].tags,
            image: image
          });
        }
      });
    },
  },
  persist: true,
});