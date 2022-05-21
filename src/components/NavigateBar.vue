<!--suppress NpmUsedModulesInstalled -->
<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const state = ref({
  home: !route.path.match("store"),
  navigation: true,
  hoverP: false,
  hoverS: false,
  primary: !(route.path.match("sort") || route.path.match("application")),
  secondary: route.path.match("sort") || route.path.match("application"),
  active: true,
});

const topTabGroup = ref([
  {
    id: 1,
    name: "home",
    path: "/",
    label: "首页",
    active: true,
    el: null,
  },
  {
    id: 2,
    name: "download",
    path: "/download",
    label: "下载",
    active: false,
    el: null,
  },
  {
    id: 3,
    name: "store",
    path: "/store",
    label: "商店",
    active: false,
    el: null,
  },
  {
    id: 4,
    name: "forum",
    path: "/forum",
    label: "社区",
    active: false,
    el: null,
  },
  {
    id: 5,
    name: "about",
    path: "/about",
    label: "关于",
    active: false,
    el: null,
  },
]);

const tabGroup = ref([
  {
    id: 1,
    name: "recommend",
    path: "/store",
    label: "推荐",
    icon: "recommend",
    active: true,
    el: null,
  },
  {
    id: 2,
    name: "rank",
    path: "/store/rank",
    label: "排行",
    icon: "format_list_numbered",
    active: false,
    el: null,
  },
  {
    id: 3,
    name: "sort",
    path: "/store/sort/games",
    label: "分类",
    icon: "queue",
    active: false,
    el: null,
  },
]);

const secondTabGroup = ref([
  {
    id: 1,
    name: "games",
    path: "/store/sort/games",
    label: "游戏",
    icon: "sports_esports",
    active: true,
    el: null,
  },
  {
    id: 2,
    name: "network",
    path: "/store/sort/network",
    label: "网络",
    icon: "travel_explore",
    active: false,
    el: null,
  },
  {
    id: 3,
    name: "chat",
    path: "/store/sort/chat",
    label: "社交",
    icon: "question_answer",
    active: false,
    el: null,
  },
  {
    id: 4,
    name: "music",
    path: "/store/sort/music",
    label: "音乐",
    icon: "library_music",
    active: false,
    el: null,
  },
  {
    id: 5,
    name: "video",
    path: "/store/sort/video",
    label: "视频",
    icon: "smart_display",
    active: false,
    el: null,
  },
  {
    id: 6,
    name: "image_graphics",
    path: "/store/sort/image_graphics",
    label: "图形",
    icon: "image",
    active: false,
    el: null,
  },
  {
    id: 7,
    name: "office",
    path: "/store/sort/office",
    label: "办公",
    icon: "business_center",
    active: false,
    el: null,
  },
  {
    id: 8,
    name: "reading",
    path: "/store/sort/reading",
    label: "阅读",
    icon: "auto_stories",
    active: false,
    el: null,
  },
  {
    id: 9,
    name: "development",
    path: "/store/sort/development",
    label: "开发",
    icon: "developer_board",
    active: false,
    el: null,
  },
  {
    id: 10,
    name: "tools",
    path: "/store/sort/tools",
    label: "工具",
    icon: "handyman",
    active: false,
    el: null,
  },
  {
    id: 11,
    name: "themes",
    path: "/store/sort/themes",
    label: "美化",
    icon: "extension",
    active: false,
    el: null,
  },
  {
    id: 12,
    name: "others",
    path: "/store/sort/others",
    label: "其他",
    icon: "pending",
    active: false,
    el: null,
  },
]);

const topTabGroupByName = ref({});

const topTabGroupByPath = ref({});

for (const tab of topTabGroup.value) {
  topTabGroupByName.value[tab.name] = tab;
  topTabGroupByPath.value[tab.path] = tab;
}

const tabGroupByName = ref({});

const tabGroupByPath = ref({});

for (const tab of tabGroup.value) {
  tabGroupByName.value[tab.name] = tab;
  tabGroupByPath.value[tab.path] = tab;
}

const secondTabGroupByName = ref({});

const secondTabGroupByPath = ref({});

for (const tab of secondTabGroup.value) {
  secondTabGroupByName.value[tab.name] = tab;
  secondTabGroupByPath.value[tab.path] = tab;
}

const topActiveTab = ref(topTabGroup.value[0]);

const activeTab = ref(tabGroup.value[0]);

const secondActiveTab = ref(tabGroup.value[0]);

function toTab(path) {
  if (path.match("store")) {
    if (path.match("sort")) {
      if (secondTabGroupByPath.value.hasOwnProperty(path)) {
        return [
          topTabGroupByName.value["store"],
          tabGroupByName.value["sort"],
          secondTabGroupByPath.value[path],
        ];
      } else {
        return [
          topTabGroupByName.value["store"],
          tabGroupByName.value["sort"],
          secondTabGroup.value[0],
        ];
      }
    } else if (path.match("application")) {
      return [
        topTabGroupByName.value["store"],
        tabGroupByName.value["sort"],
        secondActiveTab.value,
      ];
    } else {
      if (tabGroupByPath.value.hasOwnProperty(path)) {
        return [
          topTabGroupByName.value["store"],
          tabGroupByPath.value[path],
          secondTabGroup.value[0],
        ];
      } else {
        return [
          topTabGroupByName.value["store"],
          tabGroup.value[0],
          secondTabGroup.value[0],
        ];
      }
    }
  }
  if (topTabGroupByPath.value.hasOwnProperty(path)) {
    return [
      topTabGroupByPath.value[path],
      tabGroupByName.value["recommend"],
      secondTabGroup.value[0],
    ];
  } else {
    return [
      topTabGroup.value[0],
      tabGroupByName.value["recommend"],
      secondTabGroup.value[0],
    ];
  }
}

watch(
  () => route.path,
  async (newPath) => {
    topActiveTab.value.active = false;
    activeTab.value.active = false;
    secondActiveTab.value.active = false;
    const activeTabs = toTab(newPath);
    topActiveTab.value = activeTabs[0];
    activeTab.value = activeTabs[1];
    secondActiveTab.value = activeTabs[2];
    topActiveTab.value.active = true;
    activeTab.value.active = true;
    secondActiveTab.value.active = true;
    state.value.home = !route.path.match("store");
    state.value.primary = !activeTab.value.name.match("sort");
    state.value.secondary = activeTab.value.name.match("sort");
    for (const topTab of topTabGroup.value) {
      // noinspection JSUnresolvedVariable
      topTab.el.$el.style = `--j-offset:${
        (topActiveTab.value.id - topTab.id) * 78
      }px`;
    }
    for (const tab of tabGroup.value) {
      tab.el.style = `--j-offset:${(activeTab.value.id - tab.id) * 52}px`;
    }
    for (const secondTab of secondTabGroup.value) {
      // noinspection JSUnresolvedVariable
      secondTab.el.$el.style = `--j-offset:${
        (secondActiveTab.value.id - secondTab.id) * 52
      }px`;
    }
  }
);

onMounted(() => {
  topActiveTab.value.active = false;
  activeTab.value.active = false;
  secondActiveTab.value.active = false;
  const activeTabs = toTab(route.path);
  topActiveTab.value = activeTabs[0];
  activeTab.value = activeTabs[1];
  secondActiveTab.value = activeTabs[2];
  topActiveTab.value.active = true;
  activeTab.value.active = true;
  secondActiveTab.value.active = true;
  state.value.home = !route.path.match("store");
  for (const topTab of topTabGroup.value) {
    // noinspection JSUnresolvedVariable
    topTab.el.$el.style = `--j-offset:${
      (topActiveTab.value.id - topTab.id) * 78
    }px`;
  }
  for (const tab of tabGroup.value) {
    tab.el.style = `--j-offset:${(activeTab.value.id - tab.id) * 52}px`;
  }
  for (const secondTab of secondTabGroup.value) {
    // noinspection JSUnresolvedVariable
    secondTab.el.$el.style = `--j-offset:${
      (secondActiveTab.value.id - secondTab.id) * 52
    }px`;
  }
});
</script>

<template>
  <span :class="state">
    <header>
      <router-link to="/" class="logo">
        <h1>Spark Store</h1>
      </router-link>
      <q-space />
      <div class="navBtnGroup">
        <router-link
          v-for="topTab in topTabGroup"
          :to="topTab.path"
          :class="['navBtn', { active: topTab.active }]"
          :ref="
            (el) => {
              topTab.el = el;
            }
          "
          :key="topTab.name"
        >
          <span class="indicator"></span>
          <span class="label">{{ topTab.label }}</span>
        </router-link>
      </div>
    </header>
    <nav
      class="primary"
      @mouseenter="state.hoverP = true"
      @mouseleave="state.hoverP = false"
    >
      <router-link to="/" class="logo"> </router-link>
      <div class="navBtnGroup">
        <div
          v-for="tab in tabGroup"
          :key="tab.name"
          :class="['navBtn', { active: tab.active }]"
          :ref="
            (el) => {
              tab.el = el;
            }
          "
        >
          <span class="indicator"></span>
          <q-icon :name="tab.icon" size="24px" />
          <span class="label">{{ tab.label }}</span>
          <router-link :to="tab.path" class="cover"></router-link>
        </div>
        <q-space />
        <div class="navBtn">
          <span class="indicator"></span>
          <q-icon name="home" size="24px" />
          <span class="label">首页</span>
          <router-link to="/" class="cover"></router-link>
        </div>
      </div>
      <span class="activeCtrl" @click="state.active = !state.active"></span>
    </nav>
    <nav
      class="secondary"
      @mouseenter="state.hoverS = true"
      @mouseleave="state.hoverS = false"
    >
      <div class="navBtnGroup">
        <router-link
          v-for="secondTab in secondTabGroup"
          :to="secondTab.path"
          :class="['navBtn', { active: secondTab.active }]"
          :ref="
            (el) => {
              secondTab.el = el;
            }
          "
          :key="secondTab.name"
        >
          <span class="indicator"></span>
          <q-icon :name="secondTab.icon" size="24px" />
          <span class="label">{{ secondTab.label }}</span>
        </router-link>
      </div>
    </nav>
  </span>
</template>

<style scoped lang="scss">
@import "../css/quasar.variables";

span.navigation {
  position: fixed;
  z-index: 9999;

  > nav {
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    transform: translate3d(-156px, 0, 0);
    backdrop-filter: blur(24px);
    box-shadow: 1px 0 2.1px rgba(0, 0, 0, 0.03),
      2.6px 0 5.2px rgba(0, 0, 0, 0.039), 5.3px 0 10.6px rgba(0, 0, 0, 0.044),
      11px 0 21.9px rgba(0, 0, 0, 0.051), 30px 0 60px rgba(0, 0, 0, 0.07);
    transition: {
      property: transform, opacity, box-shadow;
      duration: 500ms;
      delay: 0s;
    }
    will-change: transform, opacity, box-shadow;
  }

  .primary {
    display: flex;
    flex-direction: column;
    width: 216px;
    background-color: white;
    z-index: 1;
    overflow: hidden;
    transition-delay: 500ms, 0s, 0s;

    .logo {
      display: block;
      width: 100%;
      height: 90px;
      color: black;
      text-decoration: none;
      position: relative;
    }

    .logo::before {
      content: "";
      display: block;
      width: 32px;
      height: 32px;
      position: absolute;
      top: 32px;
      right: 14px;
      transform: scale3d(0.75, 0.75, 1);
      background: {
        image: url("../assets/icons/favicon-32x32.png");
        repeat: no-repeat;
        size: cover;
        position: center;
      }
      transition: {
        property: transform;
        duration: 500ms;
        delay: 500ms;
      }
    }

    .logo::after {
      content: "Spark Web Store";
      font-family: Comfortaa-Light, sans-serif;
      font-weight: 700;
      font-size: 21px;
      height: 2em;
      line-height: 2em;
      white-space: nowrap;
      position: absolute;
      left: 50%;
      bottom: 0;
      opacity: 0;
      transform: scale3d(0.1, 0.1, 0.1) translate3d(-50%, 60px, 0);
      transition: {
        property: opacity, transform;
        duration: 500ms;
        delay: 500ms;
      }
      will-change: opacity, transform;
    }

    .navBtnGroup {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      transform: translate3d(78px, 0, 0);
      transition: {
        property: transform;
        duration: 500ms;
        delay: 500ms;
      }
      will-change: transform;

      .navBtn {
        height: 48px;
        margin: 2px 0;
        position: relative;
        --j-offset: 0px;

        i {
          position: absolute;
          right: 96px;
          top: 12px;
          transition: {
            property: transform;
            duration: 500ms;
          }
          will-change: transform;
        }

        .label {
          font-size: 16px;
          position: absolute;
          top: 12px;
          right: 80px;
          transform: scale3d(0.1, 0.1, 1) translate3d(-120px, 0, 0);
          opacity: 0;
          transition: {
            property: transform, opacity;
            duration: 500ms;
          }
          will-change: transform, opscity;
        }

        .indicator {
          display: block;
          background-color: $primary;
          width: 5px;
          height: 14px;
          border-radius: 6px;
          position: absolute;
          top: 17px;
          left: 88px;
          opacity: 1;
          --j-offset: inherit;
          visibility: hidden;
          transform: translate3d(0, var(--j-offset), 0);
          transition: {
            property: transform, opacity, width, height;
            duration: 500ms;
          }
          will-change: transform, opscity, width, height;
        }

        &.active .indicator {
          visibility: visible;
        }

        .cover {
          width: 48px;
          height: 48px;
          border-radius: 6px;
          background: black;
          opacity: 0;
          position: absolute;
          left: 84px;
          transition: {
            property: transform, width, opacity;
            duration: 500ms;
          }
          will-change: transform, width, opscity;
        }

        .cover:hover {
          opacity: 0.1;
        }
      }
    }

    .activeCtrl {
      font-weight: 700;
      text-align: center;
      transform: translate3d(38px, 0, 0);
      transition: transform 0.5s 0.5s;
      white-space: nowrap;
      width: 80px;
      position: relative;
      left: 50%;
      font-size: 14px;
      margin-bottom: 21px;

      &::before {
        content: ">";
        display: inline-block;
        text-align: center;
        overflow: hidden;
        width: 24px;
        height: 20.8px;
        border-radius: 6px;
        opacity: 1;
        transform: translate3d(28px, 0, 0);
        will-change: opacity, background-color, transform;
        transition-property: opacity, background-color, transform;
        transition-duration: 0.5s, 0.35s, 1s;
        transition-delay: 0.7s, 0.5s, 0.5s;
      }

      &::after {
        content: "<<<<<<";
        display: inline-block;
        text-align: center;
        overflow: hidden;
        width: 72px;
        height: 20.8px;
        border-radius: 6px;
        opacity: 0;
        transform: translate3d(-20px, 0, 0);
        will-change: opacity, background-color, transform;
        transition-property: opacity, background-color, transform;
        transition-duration: 0.5s, 0.35s, 1s;
        transition-delay: 0.5s;
      }

      &:hover {
        &::before,
        &::after {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    }
  }

  .secondary {
    width: 156px;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.2);
    left: 60px;
    opacity: 0;
    z-index: 0;

    .navBtnGroup {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 6px 10px;

      .navBtn {
        display: flex;
        height: 36px;
        width: 100%;
        margin: 8px 0;
        padding: 8px;
        color: black;
        align-items: center;
        text-decoration: none;
        border-radius: 6px;
        position: relative;
        --j-offset: 0px;
        transition: background-color 0.5s;

        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }

        .label {
          flex-grow: 1;
          text-align: center;
        }

        .indicator {
          width: 100%;
          height: 100%;
          border-radius: 6px;
          opacity: 0.2;
          --j-offset: inherit;
          visibility: hidden;
          position: absolute;
          top: 0;
          left: 0;
          background-color: $primary;
          transform: translate3d(0, var(--j-offset), 0);
          transition: transform 0.5s;
        }

        &.active {
          .indicator {
            visibility: visible;
          }
        }
      }
    }
  }

  header {
    display: flex;
    width: 100%;
    height: 60px;
    background: #ffffffb3;
    box-shadow: 0 0 28px 0 #0000004d;
    padding: 0 48px;
    position: fixed;
    z-index: 1;
    backdrop-filter: blur(18px);
    align-items: center;
    transform: translate3d(0, -60px, 0);
    opacity: 0;
    transition: {
      property: transform, opacity;
      duration: 500ms;
    }
    will-change: transform, opacity;

    .logo {
      display: flex;
      text-decoration: none;
      color: black;
      align-items: center;

      &::before {
        content: "";
        display: inline-block;
        background: {
          image: url("../assets/icons/favicon-96x96.png");
          repeat: no-repeat;
          size: contain;
        }
        width: 38px;
        height: 38px;
      }

      h1 {
        display: inline-block;
        font: {
          size: 21px;
          family: "Comfortaa-Light", sans-serif;
          weight: 700;
        }
        letter-spacing: 0.01em;
        line-height: 1.5;
        margin: 0 0 0 6px;
      }
    }

    .navBtnGroup {
      display: flex;

      .navBtn {
        display: flex;
        width: 72px;
        height: 40px;
        margin: 0 3px;
        border-radius: 6px;
        color: black;
        text-decoration: none;
        font-size: 16px;
        align-items: center;
        justify-content: center;
        position: relative;
        --j-offset: 0px;
        transition: {
          property: background-color;
          duration: 500ms;
        }

        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }

        .indicator {
          display: block;
          width: 32px;
          height: 4px;
          border-radius: 2px;
          background-color: $primary;
          position: absolute;
          bottom: 2px;
          visibility: hidden;
          --j-offset: inherit;
          transform: translate3d(var(--j-offset), 0, 0);
          transition: transform 500ms;
        }

        &.active {
          color: $primary;
          background-color: rgba($primary, 0.1);

          .indicator {
            visibility: visible;
          }
        }
      }
    }
  }

  &.hoverP,
  &.hoverS {
    &.active.primary > nav.primary {
      transform: translate3d(0, 0, 0);
      transition-delay: 0s;

      .logo::before {
        transform: translate3d(-78px, -12px, 0);
        transition-delay: 0s;
      }

      .logo::after {
        opacity: 1;
        transform: scale3d(1, 1, 1) translate3d(-50%, 10px, 0);
        transition-delay: 0s;
      }

      .navBtnGroup {
        transform: translate3d(0, 10px, 0);
        transition-delay: 0s;

        .navBtn {
          i {
            transform: translate3d(-78px, 0, 0);
            transition-delay: 500ms;
          }

          .label {
            transform: scale3d(1, 1, 1);
            opacity: 1;
            transition-delay: 500ms;
          }

          .indicator {
            width: 196px;
            height: 48px;
            transform: translate3d(-78px, calc(var(--j-offset) - 17px), 0);
            opacity: 0.2;
            transition-delay: 500ms;
          }

          .cover {
            width: 196px;
            transform: translate3d(-74px, 0, 0);
            transition-delay: 500ms, 500ms, 0s;
          }
        }
      }

      .activeCtrl {
        transform: translate3d(-40px, 0, 0);
        transition-delay: 0s;

        &::before {
          opacity: 0;
          transform: translate3d(28px, 21px, 0);
          transition-delay: 0s;
        }

        &::after {
          opacity: 1;
          transform: translate3d(-20px, 21px, 0);
          transition-delay: 0.2s, 0s, 0s;
        }
      }
    }

    &.secondary > {
      .secondary {
        transform: translate3d(0, 0, 0);
        opacity: 1;
      }

      .primary {
        box-shadow: 0 0 4px 0 rgb(0 0 0 / 30%);
      }
    }
  }

  &.home {
    > nav {
      transform: translate3d(-216px, 0, 0) !important;
      opacity: 0;
      transition-delay: 0s;
    }

    header {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
}
</style>
