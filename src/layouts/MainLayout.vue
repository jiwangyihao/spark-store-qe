<!--suppress JSUnresolvedVariable, NpmUsedModulesInstalled, CssInvalidFunction -->
<template>
  <q-layout view="lhr lpR fFf">
    <div v-if="mode==='electron'" class="toolbox">
      <q-btn color="white" padding="xs" icon="minimize" @click="min" />
      <q-btn color="white" padding="xs" icon-right="settings_ethernet" @click="max" />
      <q-btn color="white" padding="xs" icon="close" @click="close" />
    </div>
    <div v-if="mode==='electron'" class="dragArea"></div>
    <transition
      appear
      enter-active-class="animated fadeInDown"
      leave-active-class="animated fadeOutUp"
    >
      <header v-if="!$route.path.match('store')">
        <q-toolbar style="height: 60px">
          <router-link to="/" style="text-decoration: unset; color: black;">
            <q-toolbar-title>
              <q-avatar>
                <img src="../assets/icons/favicon-128x128.png">
              </q-avatar>
              Spark Store
            </q-toolbar-title>
          </router-link>
          <q-space />
          <q-tabs
            shrink
            class="text-black"
            active-color="primary"
            indicator-color="primary"
            narrow-indicator
          >
            <q-route-tab to="/" label="首页" :ripple="false" />
            <q-route-tab to="/download" label="下载" :ripple="false" />
            <q-route-tab to="/store" label="商店" :ripple="false" />
            <q-route-tab to="/forum" label="社区" :ripple="false" />
            <q-route-tab to="/about" label="关于" :ripple="false" />
          </q-tabs>
        </q-toolbar>
      </header>
    </transition>
    <transition
      appear
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
      style="display: none"
    >
      <div :class="{storeNav: true, active: hActive&&nActive&&lsA, nActive: nActive, seMenu: !hActive, isSorts: isSorts}" v-if="$route.path.match('store')">
        <nav>
          <router-link to="/" style="text-decoration: unset; color: black; width: 100%;">
            <q-toolbar-title class="logo">
              <q-avatar size="36px">
                <img src="../assets/icons/favicon-128x128.png">
              </q-avatar>
              <span>Spark Web Store</span>
            </q-toolbar-title>
          </router-link>
          <j-tabs
            v-model="tabs"
            vertical
            shrink
            ref="tabs1"
          >
            <j-tab name="recommend" @click.prevent="to('/store')" id="recommend" icon="recommend" label="推荐" :ripple="false" />
            <j-tab name="rank" @click.prevent="to('/store/rank')" id="rank" icon="format_list_numbered" label="排行" :ripple="false" />
            <j-tab name="sorts" @click.prevent="to('/store/sorts/games')" id="sorts" icon="queue" label="分类" :ripple="false" />
            <q-space />
            <j-tab name="home" @click.prevent="to('/')" id="home" icon="home" label="首页" :ripple="false" />
          </j-tabs>
          <span @click="nActive=!nActive"></span>
          <!--
          <span v-if="!hoverA" :key="'s1'">&gt;</span>
          <span v-if="hoverA" :key="'s2'">&lt;&lt;&lt;&lt;&lt;&lt;</span>
          -->
        </nav>
        <div class="menu">
          <q-tabs
            v-model="sort"
            vertical
            shrink
          >
            <q-tab name="games" @click="to('/store/sorts/games')" id="games" icon="sports_esports" label="游戏" :ripple="false" />
            <q-tab name="network" @click="to('/store/sorts/network')" id="network" icon="travel_explore" label="网络" :ripple="false" />
            <q-tab name="chat" @click="to('/store/sorts/chat')" id="chat" icon="question_answer" label="社交" :ripple="false" />
            <q-tab name="music" @click="to('/store/sorts/music')" id="music" icon="library_music" label="音乐" :ripple="false" />
            <q-tab name="video" @click="to('/store/sorts/video')" id="video" icon="smart_display" label="视频" :ripple="false" />
            <q-tab name="image_graphics" @click="to('/store/sorts/image_graphics')" id="image" icon="sports_esports" label="图形" :ripple="false" />
            <q-tab name="office" @click="to('/store/sorts/office')" id="office" icon="business_center" label="办公" :ripple="false" />
            <q-tab name="reading" @click="to('/store/sorts/reading')" id="reading" icon="auto_stories" label="阅读" :ripple="false" />
            <q-tab name="development" @click="to('/store/sorts/development')" id="development" icon="developer_board" label="开发" :ripple="false" />
            <q-tab name="tools" @click="to('/store/sorts/tools')" id="tools" icon="handyman" label="工具" :ripple="false" />
            <q-tab name="themes" @click="to('/store/sorts/themes')" id="themes" icon="extension" label="美化" :ripple="false" />
            <q-tab name="others" @click="to('/store/sorts/others')" id="others" icon="pending" label="其他" :ripple="false" />
          </q-tabs>
        </div>
      </div>
    </transition>
    <navigation></navigation>
    <q-page-container style="overflow: hidden;">
      <router-view />
    </q-page-container>
    <footer v-if="!$route.path.match('store')">
      <q-toolbar style="height: 10vmin; justify-content: center;">
        <router-link to="/" style="text-decoration: unset; color: black;">
          <q-toolbar-title style="color: rgb(206,206,206); font-size: 2.4vmin">
            &copy; 2021 星火应用商店
          </q-toolbar-title>
        </router-link>
      </q-toolbar>
    </footer>
  </q-layout>
</template>

<script>
import { JTabs, JTab } from '../components/index.js'
import Navigation from '../components/Navigation.vue'
import { defineComponent} from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    JTabs,
    JTab,
    Navigation
  },

  methods: {
    to: function(ref) {
      if (this.$route.path!==ref) {
        this.$router.push(ref)
      }
    },
    seMenu: function() {
      this.hActive=false
    },
    frMenu: function() {
      this.hActive=true
    },
    min: function() {
      electron.min()
    },
    max: function() {
      electron.max()
    },
    close: function() {
      electron.close()
    }
  },

  data () {
    return {
      hActive: true,
      nActive: true,
      part: "index",
      animateTimer: undefined,
      animateTimer1: undefined,
      tabs: "",
      sort: "",
      path: {
        "/": "home",
        "/store": "recommend",
        "/store/rank": "rank"
      },
      isSorts: false,
      lsA: true,
      mode: process.env.MODE
    }
  },

  created() {
    window.Vue=this
    if (this.$route.path.match("store")) {
      if (this.$route.path.match("sorts")) {
        this.tabs="sorts"
        this.sort=this.$route.params.sort
        this.hActive=false
        this.isSorts=true
      } else if (this.$route.path.match("application")) {
        this.tabs="sorts"
        this.sort="application"
        this.hActive=false
        this.isSorts=true
      } else {
        this.tabs=this.path[this.$route.path]
        this.hActive=true
      }
    }
    this.$watch(
      () => this.nActive,
      (toValue, previousValue) => {
        window.nActive=toValue
      }
    )
    this.$watch(
      () => this.$route.path,
      (toPath, previousPath) => {
        // 对路由变化做出响应...
        if (toPath.match("store")) {
          if (toPath.match("sorts")) {
            this.seMenu()
            this.sort=this.$route.params.sort
            if (previousPath.match("sorts")) {
              this.tabs="sorts"
            } else {
              window.isSorts=true
              if (this.nActive) {
                setTimeout(() => {
                  this.tabs="sorts"
                  this.isSorts=true
                }, 900);
              } else {
                this.tabs="sorts"
              }
            }
          } else {
            if (previousPath.match("sorts")) {
              window.isSorts=true
              if (this.nActive) {
                setTimeout(() => {
                  this.tabs=this.path[toPath]
                  setTimeout(() => {
                    this.isSorts=false
                    this.lsA=false
                    this.frMenu()
                    setTimeout(() => {
                      this.lsA=true
                    }, 400)
                  }, 150);
                }, 100);
              } else {
                this.tabs=this.path[toPath]
                this.frMenu()
              }
            } else {
              this.tabs=this.path[toPath]
              this.frMenu()
            }
          }
        }
      }
    )
    window.nActive=true
  }
})
</script>

<style lang="scss">
  .toolbox {
    height: 40px;
    position: fixed;
    right: 5px;
    top: 10px;
    z-index: 2;
    user-select: none;
    -webkit-user-select: none;
  }
  .toolbox .q-btn {
    margin: 0 5px;
  }
  .toolbox .q-btn::before {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 10%),
     0 2px 2px rgba(0, 0, 0, 7%),
     0 3px 1px -2px rgba(0, 0, 0, 6%);
  }
  .toolbox .q-btn--active::before {
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 10%),
     0 5px 8px rgba(0, 0, 0, 7%),
     0 1px 14px rgba(0, 0, 0, 6%)!important;
  }

  .toolbox .q-btn i {
    color: gray;
    transition-property: color;
    transition-duration: 0.5s;
    will-change: color;
  }
  .toolbox .q-btn:hover i {
    color: var(--q-primary);
  }
  .dragArea {
    position: fixed;
    height: calc(40px + 4vmin);
    width: calc(100vw - 620px);
    left: 480px;
    z-index: 3;
    -webkit-app-region: drag;
  }
  .storeNav {
    position: fixed;
    top: 0;
    left: 0;
    width: 216px;
    height: 100%;
    z-index: 2;
    will-change: transform;
    transition: transform 0.5s 0.5s;
    user-select: none;
    -webkit-user-select: none;
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    transform: translateX(-156px);
  }
  .storeNav.seMenu {
    transition-delay: 0.5s;
  }
  .storeNav.active:hover, .storeNav.seMenu:hover {
    transform: translateX(0);
    transition-delay: 0s;
  }
  .storeNav.isSorts {
    transition-delay: 0s;
  }
  .storeNav nav {
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    padding-bottom: 31px;
    width: 216px;
    height: 100%;
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 28px 0 rgb(0 0 0 / 30%);
    z-index: 2;
    flex-direction: column;
    align-items: flex-end;
    will-change: box-shadow,transform;
    transition-property: box-shadow,transform;
    transition-duration: 0.5s;
    transition-delay: 0.2s;
  }
  .storeNav:hover nav {
    transition-delay: 0.4s;
  }
  .storeNav.seMenu nav {
    transition-delay: 0s;
    background-color: #fff;
  }
  .storeNav.seMenu:hover nav {
    transition-delay: 0.5s;
    transform: translate3d(-156px,0,0);
  }
  .storeNav.seMenu.isSorts:hover nav {
    transition-delay: 0s;
  }
  .storeNav nav>span {
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
    transition: transform 0.5s 0.5s;
    width: 80px;
    transform: translate3d(10px,0,0);
  }
  .storeNav.active:hover nav>span {
    transform: translate3d(-68px, 0, 0);
    transition-delay: 0s;
  }
  .storeNav nav>span:hover::before, .storeNav nav>span:hover::after {
    background-color: rgba(0,0,0,0.1);
  }
  .storeNav nav>span::before {
    content: ">";
    display: inline-block;
    text-align: center;
    overflow: hidden;
    width: calc(1em + 10px);
    height: 20.8px;
    border-radius: 6px;
    opacity: 1;
    transform: translate3d(28px,0,0);
    will-change: opacity, background-color, transform;
    transition-property: opacity, background-color, transform;
    transition-duration: 0.5s, 0.35s, 1s;
    transition-delay: 0.7s, 0.5s, 0.5s;
  }
  .storeNav.active:hover nav>span::before {
    opacity: 0;
    transform: translate3d(28px, 21px, 0);
    transition-delay: 0s;
  }
  .storeNav nav>span::after {
    content: "<<<<<<";
    display: inline-block;
    text-align: center;
    overflow: hidden;
    width: 72px;
    height: 20.8px;
    border-radius: 6px;
    opacity: 0;
    transform: translate3d(calc(-0.5em - 14px),0,0);
    will-change: opacity, background-color,transform;
    transition-property: opacity, background-color, transform;
    transition-duration: 0.5s, 0.35s, 1s;
    transition-delay: 0.5s;
  }
  .storeNav.active:hover nav>span::after {
    opacity: 1;
    transform: translate3d(calc(-0.5em - 14px), 21px, 0);
    transition-delay: 0.2s, 0s, 0s;
  }
  .storeNav nav>a {
    width: 60px!important;
    transition: width 0.5s 0.5s;
  }
  .storeNav.active:hover nav>a {
    width: 216px!important;
    transition-delay: 0s;
  }
  .storeNav .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: visible;
  }
  .storeNav .q-avatar {
    transform: translate3d(0, 31px, 0);
    will-change: transform;
    transition: transform 0.5s;
  }
  .storeNav.active:hover nav .q-avatar {
    transform: translate3d(0, 18px, 0)
  }
  .storeNav .logo span {
    display: flex;
    width: 100%;
    height: 2em;
    overflow: hidden;
    justify-content: center;
    line-height: 2em;
    opacity: 0;
    margin-top: 6px;
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 60px, 0);
    font-family: 'Comfortaa-Light',sans-serif;
    font-weight: bold;
    will-change: opacity, transform;
    transition-property: opacity, transform;
    transition-duration: 0.5s;
  }
  .storeNav.active:hover nav .logo span {
    opacity: 1;
    transform: scale3d(1, 1, 1) translate3d(0, 16px, 0);
    transition-delay: 0.2s;
  }
  .storeNav.active nav .q-tabs, .storeNav.seMenu nav .q-tabs {
    will-change: transform;
    transition: transform 0.5s 0.5s;
    transform: translate3d(0,0,0);
  }
  .storeNav.active:hover nav .q-tabs {
    transform: translate3d(-78px, 21px, 0);
    transition: transform 0.5s;
  }
  .storeNav.seMenu:hover nav .q-tabs {
    transition-delay: 0.5s;
    transform: translate3d(0,0,0);
  }
  .storeNav .menu .q-tabs {
    padding: 0;
  }
  .storeNav.active:hover nav .q-tabs__content {
    transform: translate3d(70px,0,0);
    transition-delay: 0.2s;
  }
  .storeNav.seMenu:hover nav .q-tabs__content {
    transition-delay: 0s;
    transform: translate3d(0,0,0);
  }
  .storeNav .q-tabs__content {
    display: flex !important;
    flex-direction: column;
    transition: transform 0.5s;
  }
  .storeNav .menu .q-tabs__content{
    justify-content: flex-start;
    overflow: auto;
  }
  .storeNav .q-tab__label {
    width: 0;
    height: 1.715em;
    opacity: 0;
    overflow: hidden;
    will-change: opacity, width;
    transition-property: opacity, width;
    transition-duration: 0.5s;
  }
  .storeNav.active:hover nav .q-tab__label {
    transition-delay: 0.2s;
  }
  .storeNav.active:hover nav .q-tab__label, .storeNav .menu .q-tab__label {
    width: 100%;
    opacity: 1;
  }
  .storeNav .q-tab {
    border-radius: 6px;
    margin: 2px 3px;
    width: 40px;
    height: 48px;
    min-height: unset;
    flex: unset;
    box-sizing: content-box;
    will-change: width;
    transition-property: width;
    transition-duration: 0.5s;
  }
  .storeNav.active:hover nav .q-tab {
    transition-delay: 0.2s;
  }
  .storeNav.active:hover nav .q-tab {
    width: 180px;
  }
  .storeNav .menu .q-tab {
    margin: 6px;
    width: 120px;
    height: 36px;
  }
  .storeNav .q-tab__content {
    flex-wrap: nowrap;
    flex-direction: row;
    padding: 0;
    width: inherit;
  }
  .storeNav .q-tab__indicator {
    background: #3787ff;
    top: 0;
    left: 0;
    transform: translate3d(9px,17px, 0);
    width: 5px;
    height: 14px;
    z-index: -1;
    border-radius: 6px;
    will-change: width, height, transform, opacity;
    transition-property: width, height, transform, opacity;
    transition-duration: 0.5s;
  }
  .storeNav.active:hover nav .q-tab__indicator {
    transition-delay: 0.2s;
  }
  .storeNav.active:hover nav .q-tab__indicator {
    transform: translate3d(0, 0, 0);
    width: 196px;
    height: 48px;
  }
  .storeNav .menu .q-tab__indicator {
    transform: translate3d(0, 0, 0);
    width: 136px;
    height: 36px;
  }
  .storeNav.active:hover nav .q-tab--active .q-tab__indicator,
  .storeNav .menu .q-tab--active .q-tab__indicator {
    opacity: 0.2;
  }
  .storeNav.seMenu:hover nav {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0 4px 0 rgb(0 0 0 / 30%);
  }
  .storeNav .menu {
    position: absolute;
    right: 0;
    width: 156px;
    height: 100%;
    z-index: 1;
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 28px 0 rgb(0 0 0 / 30%);
    opacity: 0;
    padding: 4px;
    will-change: opacity;
    transition-property: opacity;
    transition-duration: 0.5s;
  }
  .storeNav.seMenu:hover .menu {
    opacity: 1;
  }
  .storeNav.nActive.seMenu:hover .menu {
    transition-delay: 1s;
  }
  .storeNav.nActive.seMenu.isSorts:hover .menu {
    transition-delay: 0s;
  }
</style>
