import { defineStore } from 'pinia';

export const useStore = defineStore('counter', {
  state: () => ({
    appList: {},
    source: 'https://d.store.deepinos.org.cn',
    debSource: 'https://mirrors.sdu.edu.cn/spark-store-repository/',
  }),
  getters: {
    //doubleCount: (state) => state.counter * 2,
  },
  actions: {
    //
  },
});
