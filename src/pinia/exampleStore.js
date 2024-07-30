import { defineStore } from "pinia";

export const useExampleStore = defineStore("example", {
  state: () => ({
    exampleButton: "",
  }),
  actions: {
    updateExampleButton() {
      this.exampleButton = "TEST";
      alert(
        `You have triggered this action and updated example state to "${this.exampleButton}"`
      );
    },
  },
});
