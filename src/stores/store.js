import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    appList: {},
    source: "https://d.store.deepinos.org.cn",
  }),
  getters: {
    //doubleCount: (state) => state.counter * 2,
  },
  actions: {
    //
  },
});
