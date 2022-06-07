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
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import BezierEasing from "bezier-easing";

import defaultIcon from "../../assets/img/store/application.svg";

const route = useRoute();

const config = {
  cardWidth: 264, //卡片宽度
  cardHeight: 92, //卡片高度
  verticalPadding: 50, //垂直边距（下边距只有1/2）
  horizonPadding: 16, //水平边距
  gap: 32, //卡片间距
};

const scroll = ref({
  originTop: 0,
  targetTop: 0,
  animationId: 0,
});

//const defaultIcon = require("../../assets/img/store/application.svg");
const store = useStore();
const sourceAppList = ref(store["appList"]);
const appList = ref([]);
const source = ref(store["source"]);
const sort = ref(route.params.sort.toString());
store.$subscribe((mutation, state) => {
  sourceAppList.value = JSON.parse(JSON.stringify(state["appList"]));
  if (container.value) {
    appList.value = layoutAppCard(sourceAppList);
  }
  sort.value = route.params.sort.toString();
});

const container = ref();
const cover = ref();

const containerState = ref({
  container: true,
  active: false,
  animation: false,
});
const coverState = ref({
  coverCard: true,
  active: false,
  animation: false,
});

const activeCard = ref({
  position: {
    left: 0,
    top: 0,
  },
  class: {},
});

const column = ref(0);

function resizeCardView() {
  appList.value = layoutAppCard(sourceAppList);
}

window.addEventListener("resize", resizeCardView);

function layoutAppCard(appList) {
  let list = appList.value;
  let containerWidth = container.value.clientWidth;
  column.value = Math.floor(
    (containerWidth + config.gap - config.horizonPadding * 2) /
      (config.cardWidth + config.gap)
  );
  let horizonGap =
    (containerWidth -
      (config.cardWidth + config.gap) * column.value +
      config.gap -
      config.horizonPadding * 2) /
    (column.value + 1);
  container.value.style.height = `${
    Math.ceil(list.length / column.value) * (config.cardHeight + config.gap) +
    config.gap +
    config.verticalPadding * 1.5
  }px`;

  list.forEach((item, index) => {
    item.position = {
      left:
        (index % column.value) * (horizonGap + config.gap + config.cardWidth) +
        config.horizonPadding +
        horizonGap,
      top:
        Math.floor(index / column.value) * (config.cardHeight + config.gap) +
        config.verticalPadding,
    };
    item.style = `transform:translate(${item.position.left}px,${item.position.top}px)`;
    if (!item.hasOwnProperty("class")) {
      item.class = {
        active: false,
        animation: false,
        appCard: true,
        cover: false,
      };
    }
    item.imgSrc = `${source.value}/store/${route.params.sort}/${item[
      "package"
    ].replace("+", "%2B")}/icon.png`;
  });
  return list;
}

function scrollAnimation(scrollStart, scrollEnd) {
  let start;
  const scrollDistance = scrollEnd - scrollStart;
  const easing = BezierEasing(0.25, 0.1, 0.25, 1.0);
  function scrollStep(timestamp) {
    if (start === undefined) {
      start = timestamp;
    }
    const elapsed = timestamp - start;

    const process = elapsed / 600;

    //这里使用`Math.min()`确保元素刚好停在目标位置。
    container.value.parentElement.parentElement.scrollTo(
      0,
      scrollStart + scrollDistance * easing(Math.min(process, 1))
    );

    if (process < 1) {
      // 在0.6秒后停止动画
      scroll.value.animationId = requestAnimationFrame(scrollStep);
    } else {
      scroll.value.targetTop = 0;
    }
  }
  scroll.value.animationId = requestAnimationFrame(scrollStep);
}

watch(column, (newColumn, oldColumn) => {
  cancelAnimationFrame(scroll.value.animationId);
  let scrollTop = scroll.value.targetTop
    ? scroll.value.targetTop
    : container.value.parentElement.parentElement.scrollTop;
  scroll.value.targetTop =
    ((scrollTop -
      config.verticalPadding +
      container.value.parentElement.parentElement.clientHeight / 2) *
      oldColumn) /
      newColumn -
    container.value.parentElement.parentElement.clientHeight / 2 +
    config.verticalPadding;
  scrollAnimation(
    container.value.parentElement.parentElement.scrollTop,
    scroll.value.targetTop
  );
  moveCover(activeCard.value);
});

function appCardDown(app) {
  containerState.value.active = true;
  containerState.value.animation = true;
  activeCard.value.class.cover = false;
  app.class.active = true;
  app.class.animation = true;
  activeCard.value = app;
  moveCover(activeCard.value);
}

function appCardUp(app) {
  containerState.value.active = false;
  app.class.active = false;
  app.class.cover = true;
  coverState.value.active = true;
}

function appCardAnimated(app, event) {
  if (event.propertyName === "transform") {
    containerState.value.animation = false;
    app.class.animation = false;
  }
}

function moveCover(app) {
  cover.value.style = `--j-left:${
    app.position.left - container.value.clientWidth / 2
  }px;--j-top:${
    app.position.top -
    container.value.parentElement.parentElement.clientHeight / 2 -
    container.value.parentElement.parentElement.scrollTop
  }px;`;
}

function coverAnimationEnd(e) {
  if (e.propertyName === "transform") {
    coverState.value.animation = false;
    activeCard.value.class.cover = coverState.value.active;
  }
}

onMounted(() => {
  container.value.parentElement.parentElement.addEventListener("scroll", () => {
    moveCover(activeCard.value);
  });
});

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
    <!--suppress JSUndeclaredVariable -->
    <div
      :class="coverState"
      :ref="
        (el) => {
          cover = el;
        }
      "
      @click="
        coverState.active = false;
        coverState.animation = true;
      "
    >
      <div class="card" @transitionend="coverAnimationEnd">
        <div @transitionend.stop>
          <div class="toolBox"></div>
          <img
            :src="activeCard['imgSrc']"
            alt=""
            @error="activeCard.imgSrc = defaultIcon"
          />
          <div class="description">
            <h6>{{ activeCard["application_name_zh"] }}</h6>
            <p>{{ activeCard["more"] }}</p>
          </div>
        </div>
      </div>
    </div>
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
        <img :src="app['imgSrc']" alt="" @error="app.imgSrc = defaultIcon" />
        <div class="description">
          <h6>{{ app["application_name_zh"] }}</h6>
          <p>{{ app["more"] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  &::before {
    content: "";
    width: 100%;
    height: 120px;
    position: fixed;
    top: -30px;
    z-index: 1;
    background: linear-gradient(#fff 36%, #0000);
    pointer-events: none;
  }

  .card,
  .appCard {
    width: 264px;
    height: 92px;
    position: absolute;
    will-change: transform;

    > div {
      background-color: white;
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
        padding: 2px;
        border-radius: 2vmin;
      }

      .description {
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

  .coverCard {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1;
    pointer-events: none;
    visibility: hidden;
    cursor: default;
    user-select: none;

    &.active,
    &.animation {
      visibility: visible;
    }

    &::before {
      content: "";
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.2);
      position: absolute;
      top: 0;
      left: 0;
      backdrop-filter: blur(2px);
      opacity: 0;
      transition: {
        property: opacity;
        duration: 1s;
      }
      will-change: opacity;
    }

    &.active::before {
      opacity: 1;
    }

    .card {
      top: 50%;
      left: 50%;
      z-index: 1;
      transform: translate(var(--j-left), var(--j-top));

      > div {
        width: 100%;
        height: 100%;

        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-118px, -32px);
          transition: {
            property: transform, filter;
            duration: 1s;
          }
        }

        .description {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-52px, -34px);
          opacity: 1;
          transition: {
            property: transform, opacity;
            duration: 1s;
          }
        }
      }
    }

    .toolBox {
      width: 300px;
      height: 80px;
      background-color: white;
      border-radius: 2vmin;
      box-shadow: 0 1px 10px #0000004d, 0 2px 4px #00000036,
        0 3px 1px -4px #0000002e;
      position: absolute;
      bottom: 0;
      left: 50%;
      z-index: 1;
      transform: translate(-50%, -50%) scale(0.1);
      opacity: 0;
      transition: {
        property: transform, opacity;
        duration: 0.6s;
        delay: 0s;
      }
    }

    &.active {
      pointer-events: unset;
      .card {
        width: 300px;
        height: calc(100% - 72px - 80px);
        transform: translate(-50%, calc(-50% - 40px - 12px));

        > div {
          img {
            transform: translate(-50%, -50%) scale(1.5);
            filter: drop-shadow(0 1px 5px #0004);
          }

          .description {
            transform: translate(-50%, -50%) scale(0.1);
            opacity: 0;

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
      .toolBox {
        transform: translate(-50%, calc(100% + 24px));
        opacity: 1;
        transition-delay: 0.4s;
      }
    }

    &.animation .card,
    &.active .card {
      transition: {
        property: transform, width, height;
        duration: 1s;
      }
    }
  }
  .appCard {
    cursor: pointer;
    top: 0;
    left: 0;
    transition: {
      property: transform, visibility;
      duration: 0.6s, 0s;
      delay: 0s;
    }

    &.cover {
      visibility: hidden;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      padding: 12px;
    }
  }

  &.active,
  &.animation {
    .appCard.active,
    .appCard.animation,
    .coverCard .card {
      > div {
        transform: scale(0.96);
      }
    }
  }
}
</style>
