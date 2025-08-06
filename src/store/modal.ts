import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
  state: () => ({
    isModalBackGround: false
  }),
  actions: {
    openModal() {
      this.isModalBackGround = true;
    },
    closeModal() {
      this.isModalBackGround = false;
    }
  }
});