import { defineStore } from 'pinia';
import { AppListLayoutItem } from 'pages/StorePage';

export const useStore = defineStore('counter', {
  state: () => ({
    sortCache: {
      sort: <string | null>null,
      appList: <AppListLayoutItem[]>[],
    },
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
