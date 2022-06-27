import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    appList: {},
    source: "https://d.store.deepinos.org.cn",
    debSource: "http://cdn.dl.uniartisan.com:9000/deepinos",
  }),
  getters: {
    //doubleCount: (state) => state.counter * 2,
  },
  actions: {
    //
  },
});
