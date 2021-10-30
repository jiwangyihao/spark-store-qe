<template>
  <q-layout view="lhr lpR fFf">
    <div v-if="mode=='electron'" class="toolbox">
      <q-btn color="white" padding="xs" icon="minimize" @click="min" />
      <q-btn color="white" padding="xs" icon-right="settings_ethernet" @click="max" />
      <q-btn color="white" padding="xs" icon="close" @click="close" />
    </div>
    <div v-if="mode=='electron'" class="dragArea"></div>
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
            <q-route-tab to="/fourm" label="社区" :ripple="false" />
            <q-route-tab to="/about" label="关于" :ripple="false" />
          </q-tabs>
        </q-toolbar>
      </header>
    </transition>
    <transition
      appear
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
    >
      <div :class="{storenav: true, active: hActive&&nActive&&lsA, nActive: nActive, seMenu: !hActive, isSorts: isSorts}" v-if="$route.path.match('store')">
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
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    JTabs,
    JTab
  },

  methods: {
    to: function(ref) {
      if (this.$route.path!=ref) {
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
  .storenav {
    position: fixed;
    top: 0;
    left: 0;
    width: 88px;
    height: 100%;
    z-index: 2;
    overflow: hidden;
    will-change: width;
    transition: width 0.7s 0.2s;
    user-select: none;
    -webkit-user-select: none;
  }
  .storenav.active:hover, .storenav.seMenu:hover {
    transition: width 0.2s;
  }
  .storenav.active:hover, .storenav.seMenu:hover {
    width: 244px;
  }
  .storenav nav {
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    padding-bottom: 31px;
    width: 60px;
    height: 100%;
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0px 28px 0 rgb(0 0 0 / 30%);
    z-index: 2;
    backdrop-filter: blur(24px);
    flex-direction: column;
    align-items: center;
    will-change: width, box-shadow;
    transition-property: width, box-shadow;
    transition-duration: 0.5s;
    transition-delay: 0.2s;
  }
  .storenav nav:hover {
    transition-delay: 0s;
  }
  .storenav.seMenu nav {
    transition-delay: 0.2s;
  }
  .storenav.active nav:hover {
    width: 216px;
  }
  .storenav nav>span {
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
    transition: transform 1s;
  }
  .storenav.active nav:hover>span {
    transform: translate3d(0, 21px, 0);
  }
  .storenav nav>span:hover::before, .storenav nav>span:hover::after {
    background-color: rgba(0,0,0,0.1);
  }
  .storenav nav>span::before {
    content: ">";
    display: inline-block;
    text-align: center;
    overflow: hidden;
    width: calc(1em + 12px);
    height: 20.8px;
    border-radius: 6px;
    opacity: 1;
    transform: translateX(36px);
    will-change: opacity, background-color;
    transition-property: opacity, background-color;
    transition-duration: 0.5s, 0.35s;
    transition-delay: 0.2s, 0s;
  }
  .storenav.active nav:hover>span::before {
    opacity: 0;
    transition-delay: 0s;
  }
  .storenav nav>span::after {
    content: "<<<<<<";
    display: inline-block;
    text-align: center;
    overflow: hidden;
    width: 72px;
    height: 20.8px;
    border-radius: 6px;
    opacity: 0;
    transform: translateX(calc(-0.5em - 6px));
    will-change: opacity, background-color;
    transition-property: opacity, background-color;
    transition-duration: 0.5s, 0.35s;
  }
  .storenav.active nav:hover>span::after {
    opacity: 1;
    transition-delay: 0.2s, 0s;
  }
  .storenav .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: visible;
  }
  .storenav .q-avatar {
    transform: translate3d(0, 31px, 0);
    will-change: transform;
    transition: transform 0.5s;
  }
  .storenav.active nav:hover .q-avatar {
    transform: translate3d(0, 18px, 0)
  }
  .storenav .logo span {
    display: flex;
    width: 100%;
    height: 2em;
    overflow: hidden;
    justify-content: center;
    line-height: 2em;
    opacity: 0;
    margin-top: 6px;
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 60px, 0);
    font-family: 'Comfortaa-Light';
    font-weight: bold;
    will-change: opacity, transform;
    transition-property: opacity, transform;
    transition-duration: 0.5s;
  }
  .storenav.active nav:hover .logo span {
    opacity: 1;
    transform: scale3d(1, 1, 1) translate3d(0, 16px, 0);
    transition-delay: 0.2s;
  }
  .storenav.active nav .q-tabs, .storenav.storenav.seMenu nav .q-tabs {
    will-change: transform;
    transition: transform 0.5s 0.2s;
  }
  .storenav.active nav:hover .q-tabs {
    transform: translate3d(0, 21px, 0);
    transition: transform 0.5s;
  }
  .storenav .menu .q-tabs {
    padding: 0;
  }
  .storenav .q-tabs__content {
    display: flex !important;
    flex-direction: column;
  }
  .storenav .menu .q-tabs__content{
    justify-content: flex-start;
    overflow: auto;
  }
  .storenav .q-tab__label {
    width: 0;
    height: 1.715em;
    opacity: 0;
    overflow: hidden;
    will-change: opacity, width;
    transition-property: opacity, width;
    transition-duration: 0.5s;
  }
  .storenav.active nav:hover .q-tab__label {
    transition-delay: 0.2s;
  }
  .storenav.active nav:hover .q-tab__label, .storenav.seMenu .menu .q-tab__label {
    width: 100%;
    opacity: 1;
  }
  .storenav .q-tab {
    border-radius: 6px;
    margin: 3px;
    width: 40px;
    height: 48px;
    min-height: unset;
    flex: unset;
    box-sizing: content-box;
    will-change: width;
    transition-property: width;
    transition-duration: 0.5s;
  }
  .storenav.active nav:hover .q-tab {
    transition-delay: 0.2s;
  }
  .storenav.active nav:hover .q-tab {
    width: 180px;
  }
  .storenav .menu .q-tab {
    margin: 6px;
    width: 120px;
    height: 36px;
  }
  .storenav .q-tab__content {
    flex-wrap: nowrap;
    flex-direction: row;
    padding: 0;
    width: inherit;
  }
  .storenav .q-tab__indicator {
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
  .storenav.active nav:hover .q-tab__indicator {
    transition-delay: 0.2s;
  }
  .storenav.active nav:hover .q-tab__indicator {
    transform: translate3d(0, 0, 0);
    width: 196px;
    height: 48px;
  }
  .storenav .menu .q-tab__indicator {
    transform: translate3d(0, 0, 0);
    width: 136px;
    height: 36px;
  }
  .storenav.active nav:hover .q-tab--active .q-tab__indicator,
  .storenav .menu .q-tab--active .q-tab__indicator {
    opacity: 0.2;
  }
  .storenav.seMenu:hover nav {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0px 4px 0 rgb(0 0 0 / 30%);
  }
  .storenav .menu {
    position: absolute;
    left: 60px;
    width: 156px;
    height: 100%;
    z-index: 1;
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 28px 0 rgb(0 0 0 / 30%);
    backdrop-filter: blur(4vmin);
    opacity: 0;
    transform: translate3d(-156px, 0, 0);
    padding: 4px;
    will-change: transform, opacity;
    transition-property: transform, opacity;
    transition-duration: 0.5s;
  }
  .storenav.seMenu:hover .menu {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  .storenav.nActive.seMenu:hover .menu {
    transition-delay: 1s;
  }
  .storenav.nActive.seMenu.isSorts:hover .menu {
    transition-delay: 0s;
  }
</style>
