<script setup lang="ts">
import { useStore } from 'stores/store';
import { api, AppDetail } from 'boot/api';
import { useRoute } from 'vue-router';
import { ref, computed, watch } from 'vue';
import { useQuasar } from 'quasar';

import linkIcon from 'assets/img/store/link.svg';
import linkAppIcon from 'assets/img/store/link-app.svg';
import openAppIcon from 'assets/img/store/open-app.svg';
import bugIcon from 'assets/img/store/bug.svg';

const store = useStore();
const route = useRoute();
const appDetail = ref<AppDetail>();
const $q = useQuasar();

watch(
  route,
  () => {
    if (!route.params.appId) return;
    api
      .getApplicationDetail(
        (<string>route.params.appId).replaceAll('_dot_', '.'),
      )
      .then((detail) => {
        detail.imgSrc = `${store.source}/store/${
          detail.Sort[0]
        }/${detail.Package.replaceAll('+', '%2B')}/icon.png`;
        appDetail.value = detail;
        console.log(detail);
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
</script>

<template>
  <div class="application-container">
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
        <q-btn padding="7px" :ripple="false">
          <img :src="linkIcon" alt="linkIcon" width="32" height="32" />
        </q-btn>
        <q-btn padding="7px" :ripple="false">
          <img :src="linkAppIcon" alt="linkAppIcon" width="32" height="32" />
        </q-btn>
        <q-btn padding="7px" :ripple="false">
          <img :src="openAppIcon" alt="openAppIcon" width="32" height="32" />
        </q-btn>
        <q-btn padding="7px" :ripple="false">
          <img :src="bugIcon" alt="bugIcon" width="32" height="32" />
        </q-btn>
      </div>
    </div>
    <div class="col">
      <div class="row screenshots cardView"></div>
      <div class="row">
        <div class="col detail cardView"></div>
        <div class="col comments cardView"></div>
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
  }
}
</style>
