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
const sourceAppList = ref(store["appList"]);
const appList = ref([]);
const source = ref(store["source"]);
const sort = ref(route.params.sort.toString());
store.$subscribe((mutation, state) => {
  sourceAppList.value = state["appList"];
  if (container.value) {
    appList.value = layoutAppCard(sourceAppList);
  }
  sort.value = route.params.sort.toString();
});

const container = ref();

const containerState = ref({
  container: true,
  active: false,
  animation: false,
});

function resizeCardView(e) {
  console.log(e);
  appList.value = layoutAppCard(sourceAppList);
}

window.addEventListener("resize", resizeCardView);

function layoutAppCard(appList) {
  let cardWidth = 264;
  let cardHeight = 92;
  let verticalPadding = 50;
  let horizonPadding = 16;
  let gap = 32;

  let list = JSON.parse(JSON.stringify(appList.value));
  let containerWidth = container.value.clientWidth;
  let column = Math.floor(
    (containerWidth + gap - horizonPadding * 2) / (cardWidth + gap)
  );
  let horizonGap =
    (containerWidth - (cardWidth + gap) * column + gap - horizonPadding * 2) /
    (column + 1);
  container.value.style.height = `${
    Math.ceil(list.length / column) * (cardHeight + gap) +
    gap +
    verticalPadding * 1.5
  }px`;
  list.forEach((item, index) => {
    item.position = {
      left:
        (index % column) * (horizonGap + gap + cardWidth) +
        horizonPadding +
        horizonGap,
      top: Math.floor(index / column) * (cardHeight + gap) + verticalPadding,
    };
    item.style = `transform:translate(${item.position.left}px,${item.position.top}px)`;
  });
  return list;
}

function appCardDown() {
  containerState.value.active = true;
  containerState.value.animation = true;
}

function appCardUp() {
  containerState.value.active = false;
}

function appCardAnimated(event) {
  if (event.propertyName === "transform") {
    containerState.value.animation = false;
  }
}

onUnmounted(() => {
  store.appList = [];
});
</script>

<template>
  <div
    :class="containerState"
    :ref="
      (el) => {
        container = el;
      }
    "
  >
    <div
      v-for="(app, index) in appList"
      :style="app.style"
      :key="index"
      :ref="
        (el) => {
          app.el = el;
        }
      "
      @mousedown="appCardDown"
      @mouseup="appCardUp"
      @transitionend="appCardAnimated"
    >
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
  > div {
    display: flex;
    width: 264px;
    height: 92px;
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: space-evenly;
    padding: 12px;
    border-radius: 2vmin;
    box-shadow: 0 1px 10px #0000004d, 0 2px 4px #00000036,
      0 3px 1px -4px #0000002e;
    transition: {
      property: box-shadow, transform;
      duration: 0.35s, 0.75s;
    }
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

  &.active,
  &.animation {
    & > div {
      transform: scale(0.9);
    }
  }
}
</style>
