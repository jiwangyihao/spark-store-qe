//import { boot } from "quasar/wrappers";
import axios from "axios";
import { getStorage } from "@sifrr/storage";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside the
// "export default () => {}" function below (which runs individually
// for each client)
// Options with default values
let api = {
  axios: axios.create({ baseURL: "https://store.deepinos.org/api/" }),
  storage: getStorage({
    name: "apiCache", // name of table (treat this as a variable name, i.e. no Spaces or special characters allowed)
    version: 1, // version number (integer / float / string), 1 is treated same as '1'
    description: "Cache for Spark Store API", // description (text)
    ttl: 0, // Time to live/expire for data in table (in ms), 0 = forever, data will expire ttl ms after saving
  }),
  getTypeList: async function () {
    try {
      let typeList = await this.storage.get("typeList");
      if (typeList["typeList"]) {
        return typeList["typeList"];
      }
    } catch (e) {
      console.error(e);
    }
    try {
      let res = await this.axios.post("/type/get_type_list");
      await this.storage.set("typeList", {
        value: res.data.data,
        ttl: 24 * 60 * 60 * 1000, //保留一天
      });
      return res.data.data;
    } catch (e) {
      console.error(e);
    }
  },
  getApplicationList: async function (typeId) {
    try {
      let applicationList = await this.storage.get(`applicationList_${typeId}`);
      if (applicationList[`applicationList_${typeId}`]) {
        return applicationList[`applicationList_${typeId}`];
      }
    } catch (e) {
      console.error(e);
    }
    try {
      let res = await this.axios.post("/application/get_application_list", {
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
    }
  },
};

export { api };
