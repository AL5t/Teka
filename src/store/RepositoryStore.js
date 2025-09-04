import { defineStore } from 'pinia';
import DB from '@/composables/db';

export const useRepositoryStore = defineStore('RepositoryStore', {
  state: () => ({
    allReps: [],
    repCarouselUpdateKey: 0,
    selectedRepository: null,
    isListView: false,

    isVisibleRepFormDialog: false,
    isCreatingRep: false,
    isEditingRep: false,
  }),
  getters: {},
  actions: {
    setSelectedRepository(rep) {
      this.selectedRepository = rep;
    },

    async getAllReps() {
      this.allReps = await DB.getAllReps();
      this.allReps.push({ isTemplate: true });
    },
  },
  persist: true,
});