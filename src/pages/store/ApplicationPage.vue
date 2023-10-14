<script setup lang="ts">
import { useStore } from 'stores/store';
import { api, AppDetail } from 'boot/api';
import { useRoute } from 'vue-router';
import { ref, computed, watch } from 'vue';
import { copyToClipboard, useQuasar } from 'quasar';

import linkIcon from 'assets/img/store/link.svg';
import linkAppIcon from 'assets/img/store/link-app.svg';
import openAppIcon from 'assets/img/store/open-app.svg';
import bugIcon from 'assets/img/store/bug.svg';

const store = useStore();
const route = useRoute();
const appDetail = ref<AppDetail>();
const $q = useQuasar();

const applicationState = ref({
  animated: false,
  loaded: false,
});

watch(
  route,
  () => {
    if (!route.params.appId) {
      applicationState.value.loaded = false;
      applicationState.value.animated = false;
      return;
    }
    api
      .getApplicationDetail(
        (<string>route.params.appId).replaceAll('_dot_', '.'),
      )
      .then((detail) => {
        detail.imgSrc = `${store.source}/store/${
          detail.Sort[0]
        }/${detail.Package.replaceAll('+', '%2B')}/icon.png`;
        appDetail.value = detail;
        applicationState.value.loaded = true;
      })
      .catch((reason) => {
        $q.notify({
          type: 'negative',
          message: reason.toString(),
        });
      });
  },
  { immediate: true },
);

const appDebHref = computed(
  () => `${store.debSource}/${appDetail?.value?.Filename}`,
);

const appTorrentHref = computed(
  () => `${store.source}/${appDetail?.value?.Filename}.torrent`,
);

const iconAnimated = (e: TransitionEvent) => {
  if (e.propertyName === 'transform' && route.params.appId) {
    applicationState.value.animated = true;
  }
};

//工具栏
const copyLink = () => {
  //复制链接
  copyToClipboard(location.href)
    .then(() => {
      $q.notify({
        type: 'positive',
        message: '已复制链接',
      });
    })
    .catch((reason) => {
      $q.notify({
        type: 'negative',
        message: reason.toString(),
      });
    });
};

const copySpk = () => {
  //复制spk
  copyToClipboard(
    `spk://${appDetail?.value?.Sort[0]}/${appDetail?.value?.Package}`,
  )
    .then(() => {
      $q.notify({
        type: 'positive',
        message: '已复制spk',
      });
    })
    .catch((reason) => {
      $q.notify({
        type: 'negative',
        message: reason.toString(),
      });
    });
};

const openSpk = () => {
  //打开spk
  $q.notify({
    type: 'positive',
    message: '正在尝试调起客户端……',
  });
  window.open(
    `spk://${appDetail?.value?.Sort[0]}/${appDetail?.value?.Package}`,
    '_self',
  );
};

const reportBug = () => {
  //报告错误
};
</script>

<template>
  <div class="application-container" :class="applicationState">
    <div class="col">
      <div class="row general cardView">
        <img
          :src="appDetail?.imgSrc"
          alt=""
          @error="
            () => {
              if (appDetail) appDetail.imgError = true;
            }
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
      <div class="row toolbox cardView">
        <q-icon name="handyman" />
        <div class="btn" @click="copyLink">
          <img :src="linkIcon" alt="linkIcon" width="32" height="32" />
          <span>复制链接</span>
        </div>
        <div class="btn" @click="copySpk">
          <img :src="linkAppIcon" alt="linkAppIcon" width="32" height="32" />
          <span>复制spk</span>
        </div>
        <div class="btn" @click="openSpk">
          <img :src="openAppIcon" alt="openAppIcon" width="32" height="32" />
          <span>打开spk</span>
        </div>
        <div class="btn" @click="reportBug">
          <img :src="bugIcon" alt="bugIcon" width="32" height="32" />
          <span>报告错误</span>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="row screenshots cardView">
        <q-icon name="collections" />
      </div>
      <div class="row">
        <div class="col detail cardView">
          <q-icon name="description" />
        </div>
        <div class="col comments cardView">
          <q-icon name="comment" @transitionend="iconAnimated" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.application-container {
  display: flex;
  padding: 40px 20px 22px;

  //flex 布局
  > .col {
    width: 50%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    &:nth-of-type(1) {
      max-width: 340px;
      min-width: 340px;
      margin-right: 16px;
    }

    .row {
      width: 100%;
      height: 50%;
      display: flex;
      flex-grow: 1;

      &:nth-of-type(1) {
        margin-bottom: 16px;
      }

      .col {
        width: 50%;
        height: 100%;
        display: flex;

        &:nth-of-type(1) {
          margin-right: 16px;
        }
      }
    }
  }

  .cardView {
    position: relative;

    > i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(1.25);
      font-size: 75px;
      opacity: 0;
      transition: {
        property: opacity, transform;
        duration: 0.6s;
        timing-function: ease;
      }
    }
  }

  .general {
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    img {
      width: 115px;
      height: 115px;
      object-fit: contain;
      padding: 2px;
      border-radius: 2vmin;
      margin-top: 20px;
      filter: drop-shadow(0 1px 9px #0004);
    }

    h1 {
      margin: 0;
      font-size: 1.2rem;
      line-height: 2rem;
      font-weight: bold;
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

      &::-webkit-scrollbar {
        width: 0;
      }
    }

    .q-btn-group {
      flex-grow: 0;
      height: auto;
      width: auto;
    }
  }

  .toolbox {
    max-height: 75px;
    align-items: center;
    justify-content: space-evenly;
    padding: 0 10px;
    transition: {
      property: max-height;
      duration: 0.6s;
      timing-function: ease;
    }

    &:hover {
      max-height: 90px;

      .btn {
        transform: translateY(-10px) !important;

        &:active {
          transform: translateY(-10px) scale(0.96) !important;
        }

        span {
          transform: translate(-50%, 5px);
          opacity: 1;
        }
      }
    }

    .btn {
      width: 46px;
      height: 46px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      position: relative;
      opacity: 0;
      transform: scale(1.25);
      transition: {
        property: opacity, transform;
        duration: 0.6s;
        timing-function: ease;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }

      &:active {
        transform: scale(0.96);
      }

      span {
        width: 46px;
        font-size: 10px;
        line-height: 14px;
        text-align: center;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translate(-50%, -20px) scale(0.1, 0.1);
        opacity: 0;
        transition: {
          property: transform, opacity;
          duration: 0.6s;
          timing-function: ease;
        }
      }
    }
  }

  .screenshots {
    max-height: 40%;
  }

  .detail {
    max-width: 40%;
  }

  opacity: 0;
  pointer-events: none;
  transition:
    opacity 2s ease,
    transform 2s ease;
  position: absolute;
  top: 30px;
  left: 60px;
  width: calc(100% - 60px);
  height: calc(100% - 30px);

  &.show {
    opacity: 1;
    pointer-events: auto;

    .cardView {
      > i {
        transition-delay: 2s;
        opacity: 0.1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }

  &.loaded.animated {
    .toolbox {
      .btn {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
}
</style>
