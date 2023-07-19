//import { boot } from "quasar/wrappers";
import axios from 'axios';
import { getStorage } from '@sifrr/storage';

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside the
// "export default () => {}" function below (which runs individually
// for each client)
// Options with default values
// noinspection JSCheckFunctionSignatures

interface updateItem {
  version: string | undefined;
  time: string | undefined;
  details: string[];
}

interface updateData {
  status: number;
  isEnded: boolean;
  data: updateItem[];
}

const api = {
  axios: axios.create({ baseURL: 'https://store.deepinos.org/api/' }),
  server: axios.create({ baseURL: 'https://server.jwyihao.top' }), //测试后端，搭建在 Railway 上
  storage: getStorage({
    priority: ['indexeddb', 'websql', 'localstorage'],
    name: 'apiCache', // name of table (treat this as a variable name, i.e. no Spaces or special characters allowed)
    version: 1, // version number (integer / float / string), 1 is treated same as '1'
    description: 'Cache for Spark Store API', // description (text)
    ttl: 0, // Time to live/expire for data in table (in ms), 0 = forever, data will expire ttl ms after saving
  }),
  getLatest: async function () {
    try {
      const isLatest = (item: {
        latest?: updateItem;
      }): item is { latest: updateItem } => {
        return (item as { latest: updateItem }).latest !== undefined;
      };
      const latest = await this.storage.get('latest');
      if (isLatest(latest)) {
        return latest['latest'];
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    try {
      const res = await this.server.get('/latest');
      await this.storage.set('latest', {
        value: res.data,
        ttl: 24 * 60 * 60 * 1000, //保留一天
      });
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  getHistory: async function (page: number) {
    try {
      const isHistory = (
        item:
          | {
              [x: string]: updateData;
            }
          | object,
      ): item is {
        [x: string]: updateData;
      } => {
        return (
          (
            item as {
              [x: string]: updateData;
            }
          )[`history_${page}`] !== undefined
        );
      };
      const history = await this.storage.get(`history_${page}`);
      if (isHistory(history)) {
        return history[`history_${page}`];
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    try {
      const res = await this.server.get(`/history?page=${page}`);
      await this.storage.set(`history_${page}`, {
        value: res.data,
        ttl: 24 * 60 * 60 * 1000, //保留一天
      });
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  /*
  getTypeList: async function () {
    try {
      const typeList = await this.storage.get('typeList');
      if (typeList['typeList']) {
        return typeList['typeList'];
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    try {
      const res = await this.axios.post('/type/get_type_list');
      await this.storage.set('typeList', {
        value: res.data.data,
        ttl: 24 * 60 * 60 * 1000, //保留一天
      });
      return res.data.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  getApplicationList: async function (typeId) {
    try {
      const applicationList = await this.storage.get(
        `applicationList_${typeId}`,
      );
      if (applicationList[`applicationList_${typeId}`]) {
        return applicationList[`applicationList_${typeId}`];
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    try {
      const res = await this.server.post('/application/get_application_list', {
        size: 10000,
        type_id: typeId,
      });
      await this.storage.set(`applicationList_${typeId}`, {
        value: res.data.data.data,
        ttl: 10 * 60 * 1000, //保留10分钟
      });
      return res.data.data.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  getApplicationDetail: async function (appId) {
    try {
      const applicationDetail = await this.storage.get(
        `applicationDetail_${appId}`,
      );
      if (applicationDetail[`applicationDetail_${appId}`]) {
        return applicationDetail[`applicationDetail_${appId}`];
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    try {
      const res = await this.axios.post('/application/get_application_detail', {
        application_id: appId,
      });
      await this.storage.set(`applicationDetail_${appId}`, {
        value: res.data.data,
        ttl: 10 * 60 * 1000, //保留10分钟
      });
      return res.data.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
   */
};

export { api };
export type { updateItem, updateData };
