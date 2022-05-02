<script>
import { api } from "boot/axios";
import { useStore } from "stores/store";
const store = useStore();

export default {
  preFetch({ currentRoute }) {
    api.post("/type/get_type_list").then((res) => {
      let listId;
      res.data.data.forEach((e) => {
        listId =
          e["orig_name"] === currentRoute.params.sort ? e["type_id"] : listId;
      });
      if (listId) {
        api
          .post("/application/get_application_list", {
            size: 10000,
            type_id: listId,
          })
          //appList.json 软件列表
          .then((res) => {
            store["appList"] = res.data.data.data;
          });
      } else {
        currentRoute.push("/Error404");
      }
    });
  },
};
</script>

<script setup>
import { onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const store = useStore();
const appList = ref(store.appList);
const source = ref(store["source"]);
const sort = ref(route.params.sort.toString());
store.$subscribe((mutation, state) => {
  appList.value = state["appList"];
  sort.value = route.params.sort.toString();
});

onUnmounted(() => {
  store.appList = [];
});
</script>

<template>
  <div class="container">
    <div v-for="(app, index) in appList" :id="'app_' + index" :key="index">
      <!-- @click="openApp(app.application_id,index)" -->
      <img
        :src="
          source +
          '/store/' +
          sort +
          '/' +
          app.package.replace('+', '%2B') +
          '/icon.png'
        "
        alt=""
      />
      <div>
        <h6>{{ app["application_name_zh"] }}</h6>
        <p>{{ app["more"] }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 264px);
  grid-auto-rows: 92px;
  justify-content: space-evenly;
  grid-gap: 32px;
  padding: 50px 16px;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 12px;
    border-radius: 2vmin;
    box-shadow: 0 1px 10px #0000004d, 0 2px 4px #00000036,
      0 3px 1px -4px #0000002e;
    transition: box-shadow 0.35s;
    will-change: box-shadow;

    &:hover {
      box-shadow: 0 1px 5px #0003, 0 2px 2px #00000024, 0 3px 1px -2px #0000001f;
    }

    img {
      width: 64px;
      height: 64px;
      object-fit: contain;
    }

    div {
      width: 170px;
      height: 68px;
      padding-left: 10px;

      h6 {
        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
        margin: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      p {
        color: gray;
        font-size: 13px;
        line-height: 16px;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
