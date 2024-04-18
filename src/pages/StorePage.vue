<script setup lang="ts">
import { useMeta } from 'quasar';
import { AppDetail } from 'src/boot/api';
import { computed, provide, Ref, ref, onMounted, watch } from 'vue';

useMeta({
  title: 'WEB商店',
  // 可选的; 将最终标题设置为“Index Page - My Website”，对于多级meta有用
  titleTemplate: (title) => `${title} - 星火应用商店`,
  meta: {
    description: {
      name: 'description',
      content: '星火应用商店spark store官网',
    },
    keywords: {
      name: 'keywords',
      content:
        'spark store,星火应用商店,星火商店,星火应用商店下载,星火商店下载,deepin应用商店,uos,ubuntu,deepin',
    },
    equiv: {
      'http-equiv': 'Content-Type',
      content: 'text/html; charset=UTF-8',
    },
  },
});

import { useStore } from 'stores/store';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import SortPage from 'pages/store/SortPage.vue';
import ApplicationPage from 'pages/store/ApplicationPage.vue';
const route = useRoute();
const router = useRouter();

const store = useStore();

const debSource = ref(store['debSource']);
const source = ref(store['source']);

const { sortCache } = storeToRefs(useStore());

const appDetail: Ref<AppDetail | undefined> = ref();

provide('appDetail', appDetail);

const appDebHref = computed(
  () => `${debSource.value}/${appDetail?.value?.Filename}`,
);

const appTorrentHref = computed(
  () => `${source.value}/${appDetail?.value?.Filename}.torrent`,
);

//卡片事件处理
function coverAnimationEnd(e: TransitionEvent) {
  if (e.propertyName === 'transform') {
    if (sortCache.value.activeCard?.class) {
      sortCache.value.activeCard.class.cover =
        sortCache.value.coverState.active;
    }
    sortCache.value.coverState.animation = false;
    if (sortCache.value.coverState.active) {
      store.onOpened();
    } else {
      sortCache.value.coverState.open = false;
    }

    if (route.name === 'application') {
      sortCache.value.coverState.applicationEnd = true;
    }
  }
}

const cardState = ref({
  active: false,
});

function cardDown() {
  cardState.value.active = true;
}

function cardUp() {
  cardState.value.active = false;
}

const toolState = ref({
  active: false,
});

function toolDown() {
  toolState.value.active = true;
}

function toolUp() {
  toolState.value.active = false;
  if (sortCache.value.activeCard?.Package) {
    router.push(
      `/store/application/${encodeURIComponent(
        sortCache.value.activeCard?.Package.replaceAll('.', '_dot_'),
      )}`,
    );
  }
}

onMounted(() => {
  watch(
    () => route.name, //当页面被切换时
    (name, oldName) => {
      sortCache.value.coverState.application = name === 'application';

      if (name !== 'application' && oldName === 'application') {
        if (store.sortCache.activeCard) {
          store.cancelActiveCard();
        }
      }
    },
    { immediate: true }, //立即执行一次
  );
});
</script>

<template>
  <q-page class="flex storePage">
    <!--<div class="topBar">
      <div class="search">
        <q-icon name="search" size="25px" />
        <q-input borderless v-model="searchStr">
          <template v-slot:append>
            <q-icon v-if="searchStr !== ''" name="clear" class="cursor-pointer" @click="searchStr = ''" />
          </template>
        </q-input>
      </div>
    </div>-->
    <!--suppress JSValidateTypes -->
    <div
      class="coverView"
      :class="sortCache.coverState"
      @click="store.cancelActiveCard"
      :style="sortCache.cover.style"
    >
      <div class="card" @transitionend="coverAnimationEnd" @click.stop>
        <div
          class="cardView"
          :class="cardState"
          @transitionend.stop
          @mousedown="cardDown"
          @mouseup="cardUp"
        >
          <img
            :src="sortCache.activeCard?.imgSrc"
            alt=""
            @error="
              () => {
                if (sortCache.activeCard) {
                  sortCache.activeCard.imgError = true;
                }
              }
            "
            :ref="(e) => (sortCache.cover.imgMain = <HTMLImageElement | null>e)"
          />
          <div class="description">
            <h6>{{ sortCache.activeCard?.Name }}</h6>
            <p>{{ sortCache.activeCard?.More }}</p>
          </div>
          <div class="detail">
            <img
              :src="sortCache.activeCard?.imgSrc"
              alt=""
              @error="
                () => {
                  if (appDetail) appDetail.imgError = true;
                }
              "
              :ref="
                (e) => (sortCache.cover.imgDetail = <HTMLImageElement | null>e)
              "
            />
            <h1 class="name">{{ appDetail?.Name }}</h1>
            <span class="version">{{ appDetail?.Version }}</span>
            <div class="tags">
              <span v-for="tag in appDetail?.Tags" :key="tag">{{ tag }}</span>
            </div>
            <p class="description">{{ appDetail?.More }}</p>
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
              @mousedown.stop
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
        <div
          class="toolBox"
          :class="toolState"
          @transitionend.stop
          @mousedown="toolDown"
          @mouseup="toolUp"
        >
          查看详情
        </div>
      </div>
    </div>
    <router-view v-slot="{}">
      <sort-page :class="{ show: route.name === 'sort' }" />
      <application-page :class="{ show: route.name === 'application' }" />
    </router-view>
  </q-page>
</template>

<style scoped lang="scss">
.storePage {
  padding-top: 30px;
  padding-left: 60px;
  overflow-y: unset;
  position: relative;
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
    content: '';
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
          timing-function: cubic-bezier(0.3, 0.2, 0.2, 1.15);
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
          timing-function: cubic-bezier(0.3, 0.2, 0.2, 1.15);
        }
        will-change: transform, opacity;
      }

      .detail {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        > * {
          opacity: 0;
          transform: translateY(60px) scale(0.9);
          transition: {
            property: transform, opacity;
            duration: 0.5s;
            timing-function: cubic-bezier(0.3, 0.2, 0.2, 1.15);
          }
          will-change: transform, opacity;
        }

        img {
          position: static;
          width: 115px;
          height: 115px;
          object-fit: contain;
          padding: 2px;
          border-radius: 2vmin;
          margin-top: 20px;
          transform: unset !important;
          filter: drop-shadow(0 1px 9px #0004);
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
    width: 340px;
    height: 75px;
    line-height: 75px;
    text-align: center;
    background-color: white;
    border-radius: 2vmin;
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -50%) scale(0.1);
    opacity: 0;
  }
}

.coverView {
  &.active,
  &.animation {
    visibility: visible;
  }

  &.applicationEnd {
    visibility: hidden;
    pointer-events: none;
  }

  &.active::before {
    opacity: 1;
  }

  &.active {
    pointer-events: unset;

    .card {
      width: 340px;
      height: calc(100% - 182px);
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

        &.active {
          transform: scale(0.96);
        }
      }
    }
    .toolBox {
      transform: translate(-50%, calc(100% + 16px));
      opacity: 1;
      transition-delay: 0.4s, 0.4s, 0s;

      &.active {
        transform: translate(-50%, calc(100% + 24px)) scale(0.96);
      }
    }
  }

  &.animation .card,
  &.active .card {
    transition: {
      property: transform, width, height;
      duration: 1s;
      timing-function: cubic-bezier(0.3, 0.2, 0.2, 1.15);
    }
    will-change: transform, width, height;
  }

  &.open.loaded {
    .card {
      .cardView {
        img {
          transform: translate(-50%, calc(-50% - var(--j-offset))) scale(1.8);
        }

        .detail {
          > * {
            opacity: 1;
            transform: unset;
          }

          img {
            opacity: 0;
          }

          & > *:nth-child(2) {
            transition-delay: 0.5s;
          }

          & > *:nth-child(3) {
            transition-delay: 0.6s;
          }

          & > *:nth-child(4) {
            transition-delay: 0.7s;
          }

          & > *:nth-child(5) {
            transition-delay: 0.8s;
          }

          & > *:nth-child(6) {
            transition-delay: 0.9s;
          }
        }
      }
    }
  }

  &.open {
    .toolBox {
      transition-delay: 0s;
      transition-duration: 0.25s;
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

  &.application {
    .card {
      transform: translate(calc(-50vw + 20px), calc(-50% - 40px - 12px));
    }

    &::before {
      opacity: 0;
    }
  }
}

.storePage .topBar {
  position: fixed;
  width: 100%;
  height: 20vmin;
  background: linear-gradient(white 36%, rgba(0, 0, 0, 0));
  pointer-events: none;
  z-index: 1;
}
.storePage .topBar .search {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: white;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.08),
    0 2px 4px rgba(0, 0, 0, 0.08),
    0 4px 8px rgba(0, 0, 0, 0.08),
    0 8px 16px rgba(0, 0, 0, 0.08),
    0 16px 32px rgba(0, 0, 0, 0.08),
    0 32px 64px rgba(0, 0, 0, 0.08);
  position: absolute;
  top: 13px;
  left: 52px;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row-reverse;
  transition-property: width, box-shadow;
  transition-duration: 0.5s;
  pointer-events: auto;
}
.storePage .topBar .search:hover {
  width: 324px;
  box-shadow:
    0 1px 1px rgba(0, 0, 0, 0.06),
    0 2px 2px rgba(0, 0, 0, 0.06),
    0 4px 4px rgba(0, 0, 0, 0.06),
    0 6px 8px rgba(0, 0, 0, 0.06),
    0 8px 16px rgba(0, 0, 0, 0.06);
}
.storePage .topBar .search .q-icon {
  color: gray;
  transition: all 0.5s;
  margin: 12px;
}
.storePage .topBar .search:hover .q-icon {
  color: var(--q-primary);
}
.storePage .topBar .search .q-field {
  opacity: 0;
  transition: all 0.5s;
}
.storePage .topBar .search:hover .q-field {
  opacity: 1;
  flex-grow: 1;
  margin-left: 4vmin;
}
</style>

<style lang="scss">
//卡片样式
.cardView {
  background-color: white;
  border-radius: 2vmin;
}

.card {
  width: 264px;
  height: 92px;
  position: absolute;
  will-change: transform;

  .cardView {
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

//MD2 样式
.md2 {
  .cardView {
    box-shadow:
      0 1px 10px #0000004d,
      0 2px 4px #00000036,
      0 3px 1px -4px #0000002e;
    transition: {
      property: box-shadow, transform;
      duration: 0.5s, 0.25s;
    }

    &:hover {
      box-shadow:
        0 1px 5px #0003,
        0 2px 2px #00000024,
        0 3px 1px -2px #0000001f;
    }
  }

  .toolBox {
    box-shadow:
      0 1px 10px #0000004d,
      0 2px 4px #00000036,
      0 3px 1px -4px #0000002e;
    transition: {
      property: transform, opacity, box-shadow;
      duration: 0.6s, 0.6s, 0.5s;
      delay: 0s;
    }

    &:hover {
      box-shadow:
        0 1px 5px #0003,
        0 2px 2px #00000024,
        0 3px 1px -2px #0000001f;
    }
  }
}

//MD3 样式
.md3 {
  .cardView {
    border: 2px solid rgba(0, 0, 0, 0.2);
    transition: {
      property: border, transform;
      duration: 0.5s, 0.25s;
    }

    //noinspection SassScssResolvedByNameOnly
    &:hover {
      border-color: rgba($primary, 0.5);
    }
  }

  .toolBox {
    border: 2px solid rgba(0, 0, 0, 0.2);
    transition: {
      property: transform, opacity, border;
      duration: 0.6s, 0.6s, 0.5s;
      delay: 0s;
    }

    //noinspection SassScssResolvedByNameOnly
    &:hover {
      border-color: rgba($primary, 0.5);
    }
  }
}
</style>
