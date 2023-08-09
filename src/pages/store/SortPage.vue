<script setup lang="ts">
//综合
import { ComputedRef, Ref, computed, inject, onMounted, ref, watch } from 'vue';
import defaultIcon from '../../assets/img/store/application.svg';
import { debounce, useQuasar } from 'quasar';
import { CoverState, AppListLayoutItem, ContainerState } from '../StorePage';

// noinspection JSUnusedGlobalSymbols
const $q = useQuasar();

const container = ref();
const cover: Ref<{ style?: ComputedRef<string> }> | undefined = inject('cover');

const containerState: Ref<ContainerState> | undefined =
  inject('containerState');

const coverState: Ref<CoverState> | undefined = inject('coverState');

const activeCard: Ref<AppListLayoutItem | undefined> | undefined =
  inject('activeCard');

//数据请求
import { api, AppDetail } from 'boot/api';

import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

import { useStore } from 'stores/store';

const store = useStore();

const appList: Ref<AppListLayoutItem[]> = ref([]);
const source = ref(store['source']);
const sort = ref(route.params.sort.toString());

onMounted(() => {
  watch(
    () => route.params.sort, //当分类被切换时
    () => {
      //解决离开应用列表就 404 的 BUG
      if (route.params.sort) {
        //单独定义 async 的原因：下面要调用两次以及 await 很好用
        async function fetchData() {
          const res = await api.getApplicationList(
            route.params.sort.toString(),
          );
          if (res.length > 0) {
            appList.value = layoutAppCard(res); //通知卡片排布
            sort.value = route.params.sort.toString(); //单独赋值是为了确保类别与卡片信息同时更新
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

        if (coverState?.value.active) {
          //关闭已经打开的卡片
          coverState.value.active = false;
          coverState.value.open = false;
          coverState.value.loaded = false;
          if (containerState?.value) containerState.value.cover = false;
          coverState.value.animation = true;
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
    }px`,
);

const column = computed(() =>
  Math.floor(
    (clientWidth.value + config.gap - config.horizonPadding * 2) /
      (config.cardWidth + config.gap),
  ),
);

const horizonGap = computed(
  () =>
    (clientWidth.value -
      (config.cardWidth + config.gap) * column.value +
      config.gap -
      config.horizonPadding * 2) /
    (column.value + 1),
);

function layoutAppCard(appList: AppListLayoutItem[]) {
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
          config.verticalPadding,
      ),
    };
    item.style = computed(
      () =>
        `transform:translate(${item.position?.left.value}px,${item.position?.top.value}px)`,
    );
    if (!item.hasOwnProperty('class')) {
      item.class = {
        active: false,
        animation: false,
        appCard: true,
        cover: false,
      };
    }
    item.imgError = ref(false);
    item.imgSrc = computed(() =>
      item.imgError?.value
        ? defaultIcon
        : `${source.value}/store/${sort.value}/${item.Package.replaceAll(
            '+',
            '%2B',
          )}/icon.png`,
    );
  });

  const scrollTop = ref(container.value?.parentElement.parentElement.scrollTop);

  if (cover?.value) {
    cover.value.style = computed(() => {
      return `--j-left:${
        <number>(<unknown>activeCard?.value?.position?.left) -
        clientWidth.value / 2 -
        30
      }px;--j-top:${
        <number>(<unknown>activeCard?.value?.position?.top) -
        container.value.parentElement.parentElement.clientHeight / 2 -
        scrollTop.value -
        15
      }px;`;
    });
  }

  container.value.parentElement.parentElement.addEventListener(
    'scroll',
    debounce(() => {
      if (!scroll.value.animationId)
        scrollTop.value =
          container.value?.parentElement.parentElement.scrollTop;
    }, 250),
  );
  return appList;
}

onMounted(() => {
  //初始化 clientWidth 的值
  clientWidth.value = container.value?.clientWidth;

  //在窗口尺寸变化时自动调整 clientWidth
  window.addEventListener(
    'resize',
    debounce(() => {
      clientWidth.value = container.value?.clientWidth;
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
    container.value.parentElement.parentElement.scrollTo({
      top: scroll.value.targetTop,
      behavior: 'smooth',
    });
    //scrollAnimation(
    //  container.value.parentElement.parentElement.scrollTop, //动画的实际起点为实际滚动高度
    //  scroll.value.targetTop,
    //);
  });
});

//卡片事件处理
function appCardDown(app: AppListLayoutItem) {
  if (containerState) {
    containerState.value.active = true;
    containerState.value.animation = true;
  }
  if (activeCard?.value?.class) {
    activeCard.value.class.cover = false;
  }
  if (app.class) {
    app.class.active = true;
    app.class.animation = true;
  }
  if (activeCard) {
    activeCard.value = app;
  }
  fetchAppInfo(app.Package); //通知请求应用详情
}

function appCardUp(app: AppListLayoutItem) {
  if (containerState) {
    containerState.value.active = false;
    containerState.value.cover = true;
  }
  if (app.class) {
    app.class.active = false;
    app.class.cover = true;
  }
  if (coverState?.value) {
    coverState.value.active = true;
  }
}

function appCardAnimated(app: AppListLayoutItem, event: TransitionEvent) {
  if (event.propertyName === 'transform') {
    if (containerState) containerState.value.animation = false;
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
      if (coverState?.value) {
        coverState.value.loaded = true;
      }
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
    class="container"
    :class="containerState"
    :style="{ height: containerHeight }"
    ref="container"
  >
    <div
      v-for="(app, index) in appList"
      :style="<string>(<unknown>app.style)"
      class="card"
      :class="app.class"
      :key="index"
      @mousedown="() => appCardDown(app)"
      @mouseup="() => appCardUp(app)"
    >
      <div class="cardView" @transitionend="(e) => appCardAnimated(app, e)">
        <img
          :src="<string>(<unknown>app.imgSrc)"
          alt=""
          @error="(<boolean>(<unknown>app.imgError)) = true"
        />
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
.container {
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

  &.v-enter-active,
  &.v-leave-active {
    transition:
      opacity 2s ease,
      transform 2s ease;
  }

  &.v-enter-from,
  &.v-leave-to {
    opacity: 0;
  }
}
</style>
