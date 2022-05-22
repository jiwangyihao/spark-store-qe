<script>
import { api } from "boot/api";
import { useStore } from "stores/store";
const store = useStore();

export default {
  preFetch({ currentRoute }) {
    api.getTypeList().then((typeList) => {
      let typeId;
      typeList.forEach((e) => {
        typeId =
          e["orig_name"] === currentRoute.params.sort ? e["type_id"] : typeId;
      });
      if (typeId) {
        api
          .getApplicationList(typeId)
          //appList.json 软件列表
          .then((applicationList) => {
            store["appList"] = applicationList;
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
import BezierEasing from "bezier-easing";

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

const column = ref(0);

function resizeCardView() {
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
  let scrollRatio =
    container.value.parentElement.parentElement.scrollTop /
    container.value.clientHeight;
  let ifScroll;
  if (
    column.value !==
    Math.floor((containerWidth + gap - horizonPadding * 2) / (cardWidth + gap))
  ) {
    ifScroll = true;
  }
  column.value = Math.floor(
    (containerWidth + gap - horizonPadding * 2) / (cardWidth + gap)
  );
  let horizonGap =
    (containerWidth -
      (cardWidth + gap) * column.value +
      gap -
      horizonPadding * 2) /
    (column.value + 1);
  container.value.style.height = `${
    Math.ceil(list.length / column.value) * (cardHeight + gap) +
    gap +
    verticalPadding * 1.5
  }px`;
  if (ifScroll) {
    scrollAnimation(scrollRatio);
  }

  list.forEach((item, index) => {
    item.position = {
      left:
        (index % column.value) * (horizonGap + gap + cardWidth) +
        horizonPadding +
        horizonGap,
      top:
        Math.floor(index / column.value) * (cardHeight + gap) + verticalPadding,
    };
    item.style = `transform:translate(${item.position.left}px,${item.position.top}px)`;
    item.class = {
      active: false,
      animation: false,
      appCard: true,
    };
  });
  return list;
}

function scrollAnimation(scrollRatio) {
  let start;
  const scrollStart = container.value.parentElement.parentElement.scrollTop;
  const scrollDistance =
    scrollRatio * container.value.clientHeight - scrollStart;
  const easing = BezierEasing(0.25, 0.1, 0.25, 1.0);
  function scrollStep(timestamp) {
    if (start === undefined) {
      start = timestamp;
    }
    const elapsed = timestamp - start;

    const process = elapsed / 600;

    //这里使用`Math.min()`确保元素刚好停在200px的位置。
    container.value.parentElement.parentElement.scrollTo(
      0,
      scrollStart + scrollDistance * easing(Math.min(process, 1))
    );

    if (process < 1) {
      // 在0.6秒后停止动画
      requestAnimationFrame(scrollStep);
    }
  }
  requestAnimationFrame(scrollStep);
}

function appCardDown(app) {
  containerState.value.active = true;
  containerState.value.animation = true;
  app.class.active = true;
  app.class.animation = true;
}

function appCardUp(app) {
  containerState.value.active = false;
  app.class.active = false;
}

function appCardAnimated(app, event) {
  if (event.propertyName === "transform") {
    containerState.value.animation = false;
    app.class.animation = false;
  }
}

onUnmounted(() => {
  store.appList = [];
});
</script>

<template>
  <!--suppress JSUndeclaredVariable -->
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
      :class="app.class"
      :key="index"
      :ref="
        (el) => {
          app.el = el;
        }
      "
      @mousedown="(e) => appCardDown(app, e)"
      @mouseup="(e) => appCardUp(app, e)"
    >
      <!-- @click="openApp(app.application_id,index)" -->
      <div @transitionend="(e) => appCardAnimated(app, e)">
        <!--suppress JSUnresolvedVariable -->
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
  </div>
</template>

<style scoped lang="scss">
.container {
  .appCard {
    width: 264px;
    height: 92px;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    transition: {
      property: transform;
      duration: 0.6s;
    }
    will-change: transform;

    > div {
      display: flex;
      background-color: white;
      align-items: center;
      justify-content: space-evenly;
      padding: 12px;
      border-radius: 2vmin;
      box-shadow: 0 1px 10px #0000004d, 0 2px 4px #00000036,
        0 3px 1px -4px #0000002e;
      transition: {
        property: box-shadow, transform;
        duration: 0.5s, 0.25s;
      }
      will-change: box-shadow, transform;

      &:hover {
        box-shadow: 0 1px 5px #0003, 0 2px 2px #00000024,
          0 3px 1px -2px #0000001f;
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

  &.active,
  &.animation {
    .appCard.active,
    .appCard.animation {
      > div {
        transform: scale(0.96);
      }
    }
  }
}
</style>
