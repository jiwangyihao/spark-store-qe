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
import { onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import BezierEasing from "bezier-easing";

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
  let list = JSON.parse(JSON.stringify(appList.value));
  let containerWidth = container.value.clientWidth;
  let scrollRatio =
    container.value.parentElement.parentElement.scrollTop /
    container.value.clientHeight;
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
    item.class = {
      active: false,
      animation: false,
      appCard: true,
    };
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
});

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
