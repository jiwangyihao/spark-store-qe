<script setup lang="ts">
//综合
import { Ref, inject, onMounted, ref, watch } from 'vue';
import { debounce, useQuasar } from 'quasar';
import { AppListLayoutItem } from '../StorePage';

// noinspection JSUnusedGlobalSymbols
const $q = useQuasar();

const container = ref();

//数据请求
import { api, AppDetail } from 'boot/api';

import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

import { useStore } from 'stores/store';
import { storeToRefs } from 'pinia';

const store = useStore();

const { sortCache } = storeToRefs(useStore());
console.log(sortCache.value);

//const appList: Ref<AppListLayoutItem[]> = ref([]);
//const source = ref(store.source);

onMounted(() => {
  watch(
    () => route.params.sort, //当分类被切换时
    () => {
      //解决离开应用列表就 404 的 BUG
      if (
        route.params.sort &&
        sortCache.value.sort !== route.params.sort.toString()
      ) {
        sortCache.value.sort = route.params.sort.toString();

        //单独定义 async 的原因：下面要调用两次以及 await 很好用
        async function fetchData() {
          const res = await api.getApplicationList(
            route.params.sort.toString(),
          );
          if (res.length > 0) {
            (<AppListLayoutItem[]>sortCache.value.appList) = layoutAppCard(res); //通知卡片排布
            sortCache.value.sort = route.params.sort.toString(); //单独赋值是为了确保类别与卡片信息同时更新
            //重置滚动高度
            cancelAnimationFrame(scroll.value.animationId);
            container.value.parentElement.parentElement.scrollTo({
              top: container.value.parentElement.parentElement.scrollTop,
              behavior: 'smooth',
            });
            //scrollAnimation(
            //  container.value.parentElement.parentElement.scrollTop,
            //  0,
            //);
          } else {
            await router.push('/Error404');
          }
        }

        if (sortCache.value.coverState.active) {
          //关闭已经打开的卡片
          sortCache.value.coverState.active = false;
          sortCache.value.coverState.open = false;
          sortCache.value.coverState.loaded = false;
          sortCache.value.containerState.cover = false;
          sortCache.value.coverState.animation = true;
          setTimeout(fetchData, 2000); //为卡片关闭动画留出时间
        } else {
          fetchData().catch((reason) => {
            $q.notify({
              type: 'negative',
              message: reason.toString(),
            });
          });
        }
      }
    },
    { immediate: true }, //立即执行一次
  );
});

const clientWidth = ref(0);

//别问我下面的式子怎么来的，问就是数学的力量
//反正我不想再算一遍了，布局效果应该基本和display:grid一致

function layoutAppCard(appList: AppListLayoutItem[]) {
  appList.forEach((item, index) => {
    item.position = {
      left:
        (index % sortCache.value.column) *
          (sortCache.value.horizonGap +
            sortCache.value.config.gap +
            sortCache.value.config.cardWidth) +
        sortCache.value.config.horizonPadding +
        sortCache.value.horizonGap,
      top:
        Math.floor(index / sortCache.value.column) *
          (sortCache.value.config.cardHeight + sortCache.value.config.gap) +
        sortCache.value.config.verticalPadding,
    };
    item.style = `transform:translate(${item.position?.left}px,${item.position?.top}px)`;
    if (!item.hasOwnProperty('class')) {
      item.class = {
        active: false,
        animation: false,
        appCard: true,
        cover: false,
      };
    }
    store.setImgError(item, false);
  });
  return appList;
}

onMounted(() => {
  //初始化 clientWidth 的值
  clientWidth.value = container.value?.clientWidth;
  store.onContainerWidthChange(clientWidth.value); //通知 store 容器宽度变化

  //在窗口尺寸变化时自动调整 clientWidth
  window.addEventListener(
    'resize',
    debounce(() => {
      clientWidth.value = container.value?.clientWidth;
      store.onContainerWidthChange(clientWidth.value); //通知 store 容器宽度变化
    }, 250),
  );

  container.value.parentElement.parentElement.addEventListener(
    'scroll',
    debounce((e) => {
      store.onScroll(e.target.scrollTop);
    }, 250),
  );

  store.onContainerHeightChange(
    container.value.parentElement.parentElement.clientHeight,
  );
  container.value.parentElement.parentElement.addEventListener(
    'resize',
    debounce(() => {
      store.onContainerHeightChange(
        container.value.parentElement.parentElement.clientHeight,
      );
    }, 250),
  );
});

//滚动动画
//import BezierEasing from 'bezier-easing'; //贝塞尔曲线

const scroll = ref({
  //滚动状态
  originTop: 0, //原始距离
  targetTop: 0, //目标距离
  animationId: 0, //动画ID
});

/*
function scrollAnimation(scrollStart: number, scrollEnd: number) {
  //动画函数，实话实说是 MDN 示例改的
  let start: number | undefined;
  const scrollDistance = scrollEnd - scrollStart;
  const easing = BezierEasing(0.25, 0.1, 0.25, 1.0);

  function scrollStep(timestamp: number) {
    if (start === undefined) {
      start = timestamp;
    }
    const elapsed = timestamp - start;

    const process = elapsed / 600;

    //这里使用`Math.min()`确保元素刚好停在目标位置。
    container.value.parentElement.parentElement.scrollTo({
      top: scrollStart + scrollDistance * easing(Math.min(process, 1)),
      behavior: 'instant',
    });

    console.log(scrollStart + scrollDistance * easing(Math.min(process, 1)));

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
*/

onMounted(() => {
  watch(
    store.sortCache,
    (sortCache) => {
      if (sortCache.columnAnimation.change) {
        const newColumn = sortCache.columnAnimation.newColumn;
        const oldColumn = sortCache.columnAnimation.oldColumn;
        console.log(newColumn, oldColumn);
        sortCache.columnAnimation.change = false;
        //监听列数变化
        //cancelAnimationFrame(scroll.value.animationId);
        //如果现在有目标高度（上一个动画尚未完成），就取该高度作为（计算时）初始高度，否则重新获取
        const scrollTop = scroll.value.targetTop
          ? scroll.value.targetTop
          : sortCache.scrollTop;
        //更新目标高度
        scroll.value.targetTop =
          ((scrollTop -
            sortCache.config.verticalPadding +
            container.value.parentElement.parentElement.clientHeight / 2) *
            oldColumn) /
            newColumn -
          container.value.parentElement.parentElement.clientHeight / 2 +
          sortCache.config.verticalPadding;
        //调用动画函数
        container.value.parentElement.parentElement.scrollTo({
          top: scroll.value.targetTop,
          behavior: 'smooth',
        });
        //scrollAnimation(
        //  container.value.parentElement.parentElement.scrollTop, //动画的实际起点为实际滚动高度
        //  scroll.value.targetTop,
        //);
      }
    },
    { deep: true },
  );
});

//卡片事件处理
function appCardDown(app: AppListLayoutItem) {
  sortCache.value.containerState.active = true;
  sortCache.value.containerState.animation = true;
  if (sortCache.value.activeCard?.class) {
    sortCache.value.activeCard.class.cover = false;
  }
  if (app.class) {
    app.class.active = true;
    app.class.animation = true;
  }
  store.setActiveCard(app); //设置卡片被激活
  fetchAppInfo(app.Package); //通知请求应用详情
}

function appCardUp(app: AppListLayoutItem) {
  sortCache.value.containerState.active = false;
  sortCache.value.containerState.cover = true;
  if (app.class) {
    app.class.active = false;
    app.class.cover = true;
  }
  sortCache.value.coverState.active = true;
}

function appCardAnimated(app: AppListLayoutItem, event: TransitionEvent) {
  if (event.propertyName === 'transform') {
    sortCache.value.containerState.animation = false;
    if (app.class) {
      app.class.animation = false;
    }
  }
}

//应用详情
const appDetail: Ref<AppDetail | undefined> | undefined = inject('appDetail');

function fetchAppInfo(packageName: string) {
  api
    .getApplicationDetail(packageName)
    .then((detail) => {
      if (appDetail) {
        appDetail.value = detail;
      }
      sortCache.value.coverState.loaded = true;
    })
    .catch((reason) => {
      $q.notify({
        type: 'negative',
        message: reason.toString(),
      });
    });
}
</script>

<template>
  <div
    class="sort-container"
    :class="sortCache.containerState"
    :style="{ height: sortCache.containerHeight }"
    ref="container"
  >
    <div
      v-for="(app, index) in sortCache.appList"
      :style="app.style"
      class="card"
      :class="app.class"
      :key="index"
      @mousedown="() => appCardDown(<AppListLayoutItem>app)"
      @mouseup="() => appCardUp(<AppListLayoutItem>app)"
    >
      <div
        class="cardView"
        @transitionend="(e) => appCardAnimated(<AppListLayoutItem>app, e)"
      >
        <img :src="app.imgSrc" alt="" @error="store.setImgError(app, true)" />
        <div class="description">
          <h6>{{ app.Name }}</h6>
          <p>{{ app.More }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
//静态样式
.sort-container {
  //顶部遮罩
  &::before,
  &::after {
    content: '';
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

.sort-container {
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

  &.store-enter-active,
  &.store-leave-active {
    transition:
      opacity 2s ease,
      transform 2s ease;
  }

  &.store-enter-from,
  &.store-leave-to {
    opacity: 0;
  }
}
</style>
