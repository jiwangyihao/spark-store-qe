<script setup>
//综合
import { computed, onMounted, ref, watch } from "vue";
import defaultIcon from "../../assets/img/store/application.svg";
import { debounce } from "quasar";

const container = ref(null);
const cover = ref({});

const containerState = ref({
  active: false,
  animation: false,
});
const coverState = ref({
  active: false,
  animation: false,
  loaded: false,
  open: false,
});

const activeCard = ref({
  position: {
    left: 0,
    top: 0,
  },
  class: {},
});

//数据请求
import { api } from "boot/api";

import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

import { useStore } from "stores/store";

const store = useStore();

const appList = ref([]);
const source = ref(store["source"]);
const debSource = ref(store["debSource"]);
const sort = ref(route.params.sort.toString());

onMounted(() => {
  watch(
    () => route.params.sort, //当分类被切换时
    () => {
      //解决离开应用列表就 404 的 BUG
      if (route.params.sort) {
        //单独定义 async 的原因：下面要调用两次以及 await 很好用
        async function fetchData() {
          const typeList = await api.getTypeList();
          let typeId;
          typeList.forEach((e) => {
            typeId =
              e["orig_name"] === route.params.sort ? e["type_id"] : typeId;
          });
          if (typeId) {
            appList.value = layoutAppCard(await api.getApplicationList(typeId)); //通知卡片排布
            sort.value = route.params.sort.toString(); //单独赋值是为了确保类别与卡片信息同时更新

            //重置滚动高度
            cancelAnimationFrame(scroll.value.animationId);
            scrollAnimation(
              container.value.parentElement.parentElement.scrollTop,
              0
            );
          } else {
            await router.push("/Error404");
          }
        }

        if (coverState.value.active) {
          //关闭已经打开的卡片
          coverState.value.active = false;
          coverState.value.open = false;
          coverState.value.loaded = false;
          containerState.value.cover = false;
          coverState.value.animation = true;
          setTimeout(fetchData, 2000); //为卡片关闭动画留出时间
        } else {
          fetchData();
        }
      }
    },
    { immediate: true } //立即执行一次
  );
});

//卡片排布
const config = {
  cardWidth: 264, //卡片宽度
  cardHeight: 92, //卡片高度
  verticalPadding: 50, //垂直边距（下边距只有1/2）
  horizonPadding: 16, //水平边距
  gap: 32, //卡片间距
};

const clientWidth = ref(0);

//别问我下面的式子怎么来的，问就是数学的力量
//反正我不想再算一遍了，布局效果应该基本和display:grid一致
const containerHeight = computed(
  () =>
    `${
      Math.ceil(appList.value.length / column.value) *
        (config.cardHeight + config.gap) +
      config.gap +
      config.verticalPadding * 1.5
    }px`
);

const column = computed(() =>
  Math.floor(
    (clientWidth.value + config.gap - config.horizonPadding * 2) /
      (config.cardWidth + config.gap)
  )
);

const horizonGap = computed(
  () =>
    (clientWidth.value -
      (config.cardWidth + config.gap) * column.value +
      config.gap -
      config.horizonPadding * 2) /
    (column.value + 1)
);

function layoutAppCard(appList) {
  appList.forEach((item, index) => {
    item.position = {
      left: computed(() => {
        return (
          (index % column.value) *
            (horizonGap.value + config.gap + config.cardWidth) +
          config.horizonPadding +
          horizonGap.value
        );
      }),
      top: computed(
        () =>
          Math.floor(index / column.value) * (config.cardHeight + config.gap) +
          config.verticalPadding
      ),
    };
    item.style = computed(
      () =>
        `transform:translate(${item.position.left.value}px,${item.position.top.value}px)`
    );
    if (!item.hasOwnProperty("class")) {
      item.class = {
        active: false,
        animation: false,
        appCard: true,
        cover: false,
      };
    }
    item.imgError = ref(false);
    item.imgSrc = computed(() =>
      item.imgError.value
        ? defaultIcon
        : `${source.value}/store/${sort.value}/${item["package"].replace(
            "+",
            "%2B"
          )}/icon.png`
    );
  });

  const scrollTop = ref(container.value.parentElement.parentElement.scrollTop);

  cover.value.style = computed(() => {
    return `--j-left:${
      activeCard.value.position.left - clientWidth.value / 2
    }px;--j-top:${
      activeCard.value.position.top -
      container.value.parentElement.parentElement.clientHeight / 2 -
      scrollTop.value
    }px;`;
  });

  container.value.parentElement.parentElement.addEventListener(
    "scroll",
    debounce(() => {
      if (!scroll.value.animationId)
        scrollTop.value = container.value.parentElement.parentElement.scrollTop;
    }, 250)
  );
  return appList;
}

onMounted(() => {
  //初始化 clientWidth 的值
  clientWidth.value = container.value.clientWidth;

  //在窗口尺寸变化时自动调整 clientWidth
  window.addEventListener(
    "resize",
    debounce(() => {
      clientWidth.value = container.value.clientWidth;
    }, 250)
  );
});

//滚动动画
import BezierEasing from "bezier-easing"; //贝塞尔曲线

const scroll = ref({
  //滚动状态
  originTop: 0, //原始距离
  targetTop: 0, //目标距离
  animationId: 0, //动画ID
});

function scrollAnimation(scrollStart, scrollEnd) {
  //动画函数，实话实说是 MDN 示例改的
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
      // 完成后停止动画
      scroll.value.animationId = requestAnimationFrame(scrollStep);
    } else {
      scroll.value.targetTop = 0;
      scroll.value.animationId = 0;
    }
  }
  scroll.value.animationId = requestAnimationFrame(scrollStep);
}

onMounted(() => {
  watch(column, (newColumn, oldColumn) => {
    //监听列数变化
    cancelAnimationFrame(scroll.value.animationId);
    //如果现在有目标高度（上一个动画尚未完成），就取该高度作为（计算时）初始高度，否则重新获取
    const scrollTop = scroll.value.targetTop
      ? scroll.value.targetTop
      : container.value.parentElement.parentElement.scrollTop;
    //更新目标高度
    scroll.value.targetTop =
      ((scrollTop -
        config.verticalPadding +
        container.value.parentElement.parentElement.clientHeight / 2) *
        oldColumn) /
        newColumn -
      container.value.parentElement.parentElement.clientHeight / 2 +
      config.verticalPadding;
    //调用动画函数
    scrollAnimation(
      container.value.parentElement.parentElement.scrollTop, //动画的实际起点为实际滚动高度
      scroll.value.targetTop
    );
  });
});

//卡片事件处理
function appCardDown(app) {
  containerState.value.active = true;
  containerState.value.animation = true;
  activeCard.value.class.cover = false;
  app.class.active = true;
  app.class.animation = true;
  activeCard.value = app;
  fetchAppInfo(app.application_id); //通知请求应用详情
}

function appCardUp(app) {
  containerState.value.active = false;
  app.class.active = false;
  app.class.cover = true;
  coverState.value.active = true;
  containerState.value.cover = true;
}

function appCardAnimated(app, event) {
  if (event.propertyName === "transform") {
    containerState.value.animation = false;
    app.class.animation = false;
  }
}

function coverAnimationEnd(e) {
  if (e.propertyName === "transform") {
    coverState.value.animation = false;
    activeCard.value.class.cover = coverState.value.active;
    coverState.value.open = coverState.value.active;
  }
}

//应用详情
const appDetail = ref({});

const appDebHref = computed(
  () =>
    `${debSource.value}/store/${appDetail.value["orig_name"]}/${appDetail.value["package"]}/${appDetail.value["package"]}_${appDetail.value["version"]}_${appDetail.value["arch"]}.deb`
);

const appTorrentHref = computed(
  () =>
    `${source.value}/store/${appDetail.value["orig_name"]}/${appDetail.value["package"]}/${appDetail.value["package"]}_${appDetail.value["version"]}_${appDetail.value["arch"]}.deb.torrent`
);

function fetchAppInfo(appId) {
  api.getApplicationDetail(appId).then((detail) => {
    appDetail.value = detail;
    coverState.value.loaded = true;
  });
}
</script>

<template>
  <div
    class="container"
    :class="containerState"
    :style="{ height: containerHeight }"
    ref="container"
  >
    <div
      class="coverView"
      :class="coverState"
      @click="
        coverState.active = false;
        coverState.open = false;
        coverState.loaded = false;
        containerState.cover = false;
        coverState.animation = true;
      "
      :style="cover.style"
    >
      <div class="card" @transitionend="coverAnimationEnd" @click.stop>
        <div class="cardView" @transitionend.stop>
          <img
            :src="activeCard['imgSrc']"
            alt=""
            @error="activeCard.imgError = true"
          />
          <div class="description">
            <h6>{{ activeCard["application_name_zh"] }}</h6>
            <p>{{ activeCard["more"] }}</p>
          </div>
          <div class="detail">
            <h1 class="name">{{ appDetail["application_name_zh"] }}</h1>
            <span class="version">{{ appDetail["version"] }}</span>
            <div class="tags">
              <span v-for="tag in appDetail['tags']" :key="tag">{{ tag }}</span>
            </div>
            <p class="description">{{ appDetail["more"] }}</p>
            <q-btn-dropdown
              split
              :ripple="false"
              :href="appDebHref"
              color="primary"
              label="下载（DEB）"
              menu-anchor="bottom middle"
              menu-self="top middle"
              padding="sm xl"
              @click.stop
            >
              <q-list>
                <q-item clickable v-close-popup :href="appTorrentHref">
                  <q-item-section>
                    <q-item-label>BT（多源下载更快）</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </div>
        <div class="toolBox" @transitionend.stop>查看详情</div>
      </div>
    </div>
    <div
      v-for="(app, index) in appList"
      :style="app.style"
      class="card"
      :class="app.class"
      :key="index"
      @mousedown="(e) => appCardDown(app, e)"
      @mouseup="(e) => appCardUp(app, e)"
    >
      <div class="cardView" @transitionend="(e) => appCardAnimated(app, e)">
        <img :src="app['imgSrc']" alt="" @error="app.imgError = true" />
        <div class="description">
          <h6>{{ app["application_name_zh"] }}</h6>
          <p>{{ app["more"] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
//静态样式
.container {
  //顶部遮罩
  &::before,
  &::after {
    content: "";
    width: 100%;
    height: 120px;
    position: fixed;
    top: -30px;
    z-index: 1;
    background: linear-gradient(#fff 36%, #0000);
    pointer-events: none;
    transition: {
      property: opacity;
      duration: 1s;
    }
    will-change: opacity;
  }

  //卡片样式
  .card {
    width: 264px;
    height: 92px;
    position: absolute;
    will-change: transform;

    .cardView {
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

  .coverView {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1;
    pointer-events: none;
    visibility: hidden;
    cursor: default;
    user-select: none;

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

    .card {
      top: 50%;
      left: 50%;
      z-index: 1;
      transform: translate(var(--j-left), var(--j-top));

      .cardView {
        width: 100%;
        height: 100%;
        overflow: hidden;

        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-118px, -32px);
          z-index: 1;
          transition: {
            property: transform, filter;
            duration: 1s;
          }
          will-change: transform, filter;
        }

        > .description {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-52px, -34px);
          opacity: 1;
          transition: {
            property: transform, opacity;
            duration: 1s;
          }
          will-change: transform, opacity;
        }

        .detail {
          display: flex;
          height: calc(100% - 64px - 60px * 1.8);
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          transform: translateY(calc(64px + 48px * 1.8));

          > * {
            opacity: 0;
            transform: translateY(60px) scale(0.9);
            transition: {
              property: transform, opacity;
              duration: 0.5s;
            }
            will-change: transform, opacity;
          }

          h1 {
            margin: 0;
            font-size: 1.2rem;
            line-height: 2rem;
            font-weight: bold;
          }

          .tags {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            span {
              display: inline-block;
              padding: 2px 0.5em;
              margin: 2px;
              background-color: #ddd;
              border-radius: 0.3em;
            }
          }

          .description {
            width: 80%;
            height: auto;
            min-height: 84px;
            max-height: 105px;
            margin: 0;
            padding: 0;
            overflow-y: auto;
            overflow-x: hidden;
          }

          .description::-webkit-scrollbar {
            width: 0;
          }
        }
      }
    }

    .toolBox {
      width: 300px;
      height: 60px;
      line-height: 60px;
      text-align: center;
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
        property: transform, opacity, box-shadow;
        duration: 0.6s, 0.6s, 0.5s;
        delay: 0s;
      }
      will-change: transform, opacity, box-shadow;
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
    will-change: transform;

    > div {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      padding: 12px;
    }
  }
}

.container {
  &::before,
  &.cover::after {
    opacity: 0;
    transition-timing-function: cubic-bezier(0.86, 0.14, 1, 1);
  }

  &::after,
  &.cover::before {
    opacity: 1;
    transition-timing-function: cubic-bezier(0, 0, 0.14, 0.86);
  }

  .coverView {
    &.active,
    &.animation {
      visibility: visible;
    }

    &.active::before {
      opacity: 1;
    }

    &.active {
      pointer-events: unset;

      .card {
        width: 300px;
        height: calc(100% - 72px - 80px);
        transform: translate(-50%, calc(-50% - 40px - 12px));

        .cardView {
          img {
            transform: translate(-50%, -50%) scale(1.8);
            filter: drop-shadow(0 1px 5px #0004);
          }

          > .description {
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
        transition-delay: 0.4s, 0.4s, 0s;
      }
    }

    &.animation .card,
    &.active .card {
      transition: {
        property: transform, width, height;
        duration: 1s;
      }
      will-change: transform, width, height;
    }

    &.open.loaded {
      .card {
        .cardView {
          img {
            transform: translate(
                -50%,
                calc(30px * 1.8 - 50vh + 15px + 36px + 40px)
              )
              scale(1.8);
          }

          .detail {
            > * {
              opacity: 1;
              transform: unset;
            }

            & > *:nth-child(1) {
              transition-delay: 0.5s;
            }

            & > *:nth-child(2) {
              transition-delay: 0.6s;
            }

            & > *:nth-child(3) {
              transition-delay: 0.7s;
            }

            & > *:nth-child(4) {
              transition-delay: 0.8s;
            }

            & > *:nth-child(5) {
              transition-delay: 0.9s;
            }
          }
        }
      }
    }

    &.animation {
      .card {
        .detail {
          > * {
            transform: translateY(-60px) scale(0.9);
          }
        }
      }
    }
  }
  .appCard {
    &.cover {
      visibility: hidden;
    }
  }

  &.active,
  &.animation {
    .appCard.active,
    .appCard.animation,
    .coverCard .card {
      .cardView {
        transform: scale(0.96);
      }
    }
  }
}
</style>
