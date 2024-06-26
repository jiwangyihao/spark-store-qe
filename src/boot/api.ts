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

interface UpdateItem {
  version: string | undefined;
  time: string | undefined;
  details: string[];
}

interface UpdateData {
  status: number;
  isEnded: boolean;
  data: UpdateItem[];
}

interface AppListItem {
  Package: string;
  Name: string;
  More: string;
  Sort: string[];
  score?: number;
}

interface AppDetail {
  _id: string;
  Package: string;
  Name: string;
  Version: string;
  More: string;
  Sort: string[];
  Author: string;
  Tags: string[];
  Filename: string;
  imgSrc?: string;
  imgError?: boolean;
  [s: string]: string | string[] | undefined | boolean;
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
        latest?: UpdateItem;
      }): item is { latest: UpdateItem } => {
        return (item as { latest: UpdateItem }).latest !== undefined;
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
      const res = await this.server.get('/info/latest');
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
              [x: string]: UpdateData;
            }
          | object,
      ): item is {
        [x: string]: UpdateData;
      } => {
        return (
          (
            item as {
              [x: string]: UpdateData;
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
      const res = await this.server.get(`/info/history?page=${page}`);
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
   */
  getApplicationList: async function (sort: string) {
    try {
      const isAppList = (
        item:
          | {
              [x: string]: AppListItem[];
            }
          | object,
      ): item is {
        [x: string]: AppListItem[];
      } => {
        return (
          (
            item as {
              [x: string]: AppListItem[];
            }
          )[`applicationList_${sort}`] !== undefined
        );
      };
      const appList = await this.storage.get(`applicationList_${sort}`);
      if (isAppList(appList)) {
        return appList[`applicationList_${sort}`];
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    try {
      const res: AppListItem[] = (
        await this.server.get(`/repo/getAppList?sort=${sort}`)
      ).data;
      await this.storage.set(`applicationList_${sort}`, {
        value: res,
        ttl: 24 * 60 * 60 * 1000, //保留一天
      });
      return res;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  getApplicationDetail: async function (packageName: string) {
    try {
      const isAppDetail = (
        item:
          | {
              [x: string]: AppDetail;
            }
          | object,
      ): item is {
        [x: string]: AppDetail;
      } => {
        return (
          (
            item as {
              [x: string]: AppDetail;
            }
          )[`applicationDetail_${encodeURIComponent(packageName)}`] !==
          undefined
        );
      };
      const appDetail = await this.storage.get(
        `applicationDetail_${encodeURIComponent(packageName)}`,
      );
      if (isAppDetail(appDetail)) {
        return appDetail[
          `applicationDetail_${encodeURIComponent(packageName)}`
        ];
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    try {
      const res: AppDetail = (
        await this.server.get(
          `/repo/getAppDetail?package=${encodeURIComponent(packageName)}`,
        )
      ).data[0];
      await this.storage.set(
        `applicationDetail_${encodeURIComponent(packageName)}`,
        {
          value: res,
          ttl: 24 * 60 * 60 * 1000, //保留一天
        },
      );
      return res;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
};

export { api };
export type { UpdateItem, UpdateData, AppListItem, AppDetail };
