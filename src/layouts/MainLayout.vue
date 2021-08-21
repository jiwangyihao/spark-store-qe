<template>
  <q-layout view="lhr lpR fFf">
    <transition
      appear
      enter-active-class="animated fadeInDown"
      leave-active-class="animated fadeOutUp"
    >
      <header v-if="!this.$route.path.match('store')">
        <q-toolbar style="height: 10vmin">
          <router-link to="/" style="text-decoration: unset; color: black;">
            <q-toolbar-title>
              <q-avatar>
                <img src="icons/favicon-128x128.png">
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
      <div :class="{storenav: true, active: hActive&&nActive, nActive: nActive, seMenu: !hActive}" v-if="this.$route.path.match('store')">
        <nav>
          <router-link to="/" style="text-decoration: unset; color: black;">
            <q-toolbar-title class="logo">
              <q-avatar size="6vmin">
                <img src="icons/favicon-128x128.png">
              </q-avatar>
              <span>Spark Web Store</span>
            </q-toolbar-title>
          </router-link>
          <q-tabs
            v-model="tabs"
            vertical
            shrink
          >
            <q-tab name="recommend" @click="to('/store')" id="recommend" icon="recommend" label="推荐" :ripple="false" />
            <q-tab name="rank" @click="to('/store/rank')" id="rank" icon="format_list_numbered" label="排行" :ripple="false" />
            <q-tab name="sorts" @click="to('/store/sorts/games')" id="sorts" icon="queue" label="分类" :ripple="false" />
            <q-space />
            <q-tab name="home" @click="to('/')" id="home" icon="home" label="首页" :ripple="false" />
          </q-tabs>
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
    <footer v-if="!this.$route.path.match('store')">
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
export default {
  name: 'MainLayout',
  components: {  },
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
      }
    }
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
    }
  },
  created() {
    window.Vue=this
    this.$watch(
      () => this.$route.path,
      (toPath, previousPath) => {
        // 对路由变化做出响应...
        if (toPath.match("store")) {
          if (toPath.match("sorts")) {
            this.tabs="sorts"
            this.sort=this.$route.params.sort
            this.seMenu()
          } else {
            this.tabs=this.path[toPath]
            this.frMenu()
          }
        }
      }
    )
    this.$watch(
      () => this.tabs,
      (toTab, previousTab) => {
        // 对路由变化做出响应...
        if (previousTab) {
          this.$nextTick(() => {
            this.animateTimer1 = setTimeout(() => {
              const oldEl = document.getElementById(previousTab).getElementsByClassName('q-tab__indicator')[0];
              const newEl = document.getElementById(toTab).getElementsByClassName('q-tab__indicator')[0];
              oldEl.style.transition = 'all 0.7s'
              oldEl.style.transform = 'none'
              newEl.style.transition = 'all 0.7s'
              newEl.style.transform = 'none'
              const
                oldPos = oldEl.getBoundingClientRect(),
                newPos = newEl.getBoundingClientRect()
              newEl.style.transform = `translate3d(0,${oldPos.top - newPos.top}px,0) scale3d(1,${newPos.height ? oldPos.height / newPos.height : 1},1)`
              this.$nextTick(() => {
                this.animateTimer = setTimeout(() => {
                  newEl.style.transition = 'transform .25s cubic-bezier(.4, 0, .2, 1), all 0.7s'
                  newEl.style.transform = 'none'
                }, 70)
              })
            }, 10)
          })
        }
      }
    )
    if (this.$route.path.match("store")) {
      if (this.$route.path.match("sorts")) {
        this.tabs="sorts"
        this.sort=this.$route.params.sort
        this.seMenu()
      } else {
        this.tabs=this.path[this.$route.path]
        this.frMenu()
      }
    }
  }
}
</script>

<style lang="scss">
  .storenav {
    position: fixed;
    top: 0;
    left: 0;
    width: calc(10vmin + 28px);
    height: 100%;
    z-index: 1;
    overflow: hidden;
    transition: all 0.7s 0.2s;
  }
  .storenav:hover {
    transition: all 0.5s;
  }
  .storenav.active:hover, .storenav.seMenu:hover {
    width: calc(36vmin + 28px);
  }
  .storenav nav {
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    padding: 2.4vmin 0 1vmin 0;
    width: 10vmin;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0px 28px 0 rgb(0 0 0 / 30%);
    z-index: 2;
    backdrop-filter: blur(1vmin);
    flex-direction: column;
    align-items: center;
    transition: all 0.4s 0.3s;
  }
  .storenav nav:hover {
    transition: all 0.4s;
  }
  .storenav.seMenu nav {
    transition: all 0.5s 0.2s;
  }
  .storenav.active nav:hover {
    width: 36vmin;
    padding: 4vmin 0 2.4vmin 0;
  }
  .storenav nav>span {
    font-weight: bold;
    text-align: center;
  }
  .storenav nav>span {
    height: 20.8px;
    padding: 0 1vmin;
    border-radius: 1vmin;
    transition: background 0.35s;
  }
  .storenav nav>span:hover {
    background: rgba(0,0,0,0.1);
  }
  .storenav nav>span::before {
    content: ">";
    display: inline-block;
    text-align: center;
    overflow: hidden;
    opacity: 1;
    width: 1em;
    transition: all 0.75s;
  }
  .storenav.active nav:hover>span::before {
    opacity: 0;
    width: 0;
  }
  .storenav nav>span::after {
    content: "<<<<<<";
    display: inline-block;
    transition: all 0.5s;
    text-align: center;
    overflow: hidden;
    opacity: 0;
    width: 0;
  }
  .storenav.active nav:hover>span::after {
    opacity: 1;
    width: 60px;
  }
  .storenav .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .storenav .logo span {
    display: flex;
    width: 0;
    height: 0;
    overflow: hidden;
    justify-content: center;
    line-height: 2em;
    opacity: 0;
    transition: all 0.7s;
  }
  .storenav.active nav:hover .logo span {
    width: 100%;
    height: 2em;
    opacity: 1;
  }
  .storenav .q-tabs {
    padding-top: 2vmin;
  }
  .storenav.seMenu .menu .q-tabs {
    padding: 0;
  }
  .storenav .q-tabs__content {
    display: flex !important;
    flex-direction: column;
  }
  .storenav.seMenu .menu .q-tabs__content{
    justify-content: flex-start;
    overflow: auto;
  }
  .storenav .q-tab__label {
    width: 0;
    height: 0;
    opacity: 0;
    overflow: hidden;
    transition: width 0.7s, height 0.7s, opacity 0.7s;
  }
  .storenav.active nav:hover .q-tab__label, .storenav.seMenu .menu .q-tab__label {
    width: 100%;
    height: 1.715em;
    opacity: 1;
  }
  .storenav .q-tab {
    border-radius: 1vmin;
    margin: 0;
    width: 40px;
    height: 48px;
    min-height: unset;
    flex: unset;
    box-sizing: content-box;
    transition: all 0.7s;
  }
  .storenav.active nav:hover .q-tab, .storenav.seMenu .menu .q-tab {
    height: 48px;
    width: 30vmin;
    margin: 1vmin;
  }
  .storenav.seMenu .menu .q-tab {
    width: 20vmin;
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
    margin-top: 17px;
    margin-left: 9px;
    width: 5px;
    height: 14px;
    z-index: -1;
    border-radius: 1vmin;
    transition: all 0.7s;
  }
  .storenav.active nav:hover .q-tab__indicator, .storenav.seMenu .menu .q-tab__indicator {
    margin-top: 0px;
    margin-left: 0px;
    width: 100%;
    height: 100%;
  }
  .storenav.active nav:hover .q-tab--active .q-tab__indicator,
  .storenav.seMenu .menu .q-tab--active .q-tab__indicator {
    opacity: 0.2;
  }
  .storenav.seMenu:hover nav {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0px 4px 0 rgb(0 0 0 / 30%);
  }
  .storenav .menu {
    position: absolute;
    left: 10vmin;
    width: 26vmin;
    height: 100%;
    z-index: 1;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 0px 0 rgb(0 0 0 / 30%);
    backdrop-filter: blur(1vmin);
    opacity: 0;
    transform: translateX(-26vmin);
    padding: calc(2vmin - 8px);
    transition: all 0.5s;
  }
  .storenav.seMenu:hover .menu {
    box-shadow: 0 0 28px 0 rgb(0 0 0 / 30%);
    transform: translateX(0);
    opacity: 1;
  }
  .storenav.nActive.seMenu:hover .menu {
    transition: all 0.5s 0.4s;
  }
</style>