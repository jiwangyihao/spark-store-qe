<template>
  <q-page class="flex storepage">
    <div class="topbar">
      <div class="search">
        <q-icon name="search" size="4.2vmin" />
        <q-input borderless v-model="searchStr">
          <template v-slot:append>
            <q-icon v-if="searchStr !== ''" name="clear" class="cursor-pointer" @click="searchStr = ''" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="body relative-position">
      <transition-group
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div v-if="$route.path=='/store'&&loaded" class="rank" key="recommend">
          <h5>施工ing...</h5>
        </div>
        <div v-if="$route.path.match('rank')&&loaded" class="rank" key="rank">
          <h5>施工ing...</h5>
        </div>
        <div v-if="$route.path.match('sort')&&loaded" class="sort applist" key="sort">
          <q-card v-for="(app, index) in appList" :key="index">
            <q-card-section horizontal>
              <q-avatar size="64px" rounded>
                <img :src="source+'/store/'+$route.params.sort+'/'+app.Pkgname+'/icon.png'">
              </q-avatar>
              <q-card-section>
                <h6>{{app.Name}}</h6>
                <div class="wrap">
                  <div class="text">
                    {{app.More}}
                  </div>
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
          <i></i><i></i><i></i><i></i><i></i><i></i><i></i>
        </div>
      </transition-group>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import { useMeta } from 'quasar'

export default {
  name: 'PageIndex',
  data: () => {
    return {
      appList: [],
      source: "https://d.store.deepinos.org.cn",
      imgSource: "https://cdn.jsdelivr.net/gh/Jerrywang959/jsonpng",
      searchStr: "",
      loaded: true
    }
  },
  methods: {
    getAppList: function(params) {
      if (params.hasOwnProperty("sort")) {
        axios
          //39.106.2.2:38324
          .get(
            `${this.source}/store/${params.sort}/applist.json`
          )
          //applist.json 软件列表
          .then((res) => {
            //console.log(this.appList);
            setTimeout(() => {
              this.appList = res.data;
              this.loaded=true
            }, 800);
          });
      }
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // 对路由变化做出响应...
        if (toParams.hasOwnProperty("sort")) {
          this.loaded=false
        } else {
          this.appList = []
        }
        setTimeout(() => {
          this.getAppList(toParams)
        }, 400);
      }
    )
    if (this.$route.params.hasOwnProperty("sort")) {
      this.loaded=false
    }
    this.getAppList(this.$route.params)

    this.$watch(
      () => this.$route.path,
      (toPath, previousPath) => {
        // 对路由变化做出响应...
        if (toPath.match("store")) {
          if (!toPath.match("sorts")) {
            this.loaded=false
            setTimeout(() => {
              this.loaded=true
            }, 1000);
          }
        }
      }
    )
  },
  setup () {
    // needs to be called in setup()
    useMeta({
      title: 'WEB商店',
      // 可选的; 将最终标题设置为“Index Page - My Website”，对于多级meta有用
      titleTemplate: title => `${title} - 星火应用商店`,
    })
  }
}
</script>
<style>
  .storepage {
    padding-left: 10vmin;
  }
  .storepage .body {
    display: flex;
    flex-grow: 1;
    padding: 4vmin;
    margin-top: 6vmin;
  }
  .storepage .body>span {
    display: flex;
    flex-grow: 1;
    will-change: contents;
  }
  .storepage .rank {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
  }
  .storepage .applist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .storepage .applist .q-card {
    margin: 2vmin;
    border-radius: 2vmin;
    box-shadow: 0 1px 10px rgb(0 0 0 / 30%),
      0 2px 4px rgb(0 0 0 / 21%),
      0 3px 1px -4px rgb(0 0 0 / 18%);
    will-change: all;
    transition: all 0.35s;
  }
  .storepage .applist .q-card:hover {
    box-shadow: 0 1px 5px rgb(0 0 0 / 20%),
      0 2px 2px rgb(0 0 0 / 14%),
      0 3px 1px -2px rgb(0 0 0 / 12%);
  }
  .storepage .applist .q-card__section--horiz {
    padding: 12px;
  }
  .storepage .applist .q-card__section--vert {
    padding: 0 0 0 12px;
  }
  .storepage .applist .q-avatar {
    display: flex;
    padding: 2px;
    box-sizing: content-box;
    border-radius: 2vmin;
    justify-content: center;
  }
  .storepage .applist .q-avatar__content, .q-avatar img:not(.q-icon):not(.q-img__image) {
    display: flex;
    height: auto;
    width: auto;
    max-width: 1em;
    max-height: 1em;
    font-size: inherit;
  }
  .storepage .applist h6 {
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
    width: 160px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .storepage .applist .wrap {
    --j-height: 48px;
    --j-line-height: 16px;
    height: var(--j-height);
    line-height: var(--j-line-height);
    overflow: hidden;
    box-sizing: content-box;
    width: 160px;
    font-size: 13px;
    color: gray;
  }
  .storepage .applist .wrap .text {
    float: right;
    margin-left: -5px;
    width: 100%;
    word-break:break-all;
  }
  .storepage .applist .wrap::before {
    float: left;
    width: 5px;
    content: '';
    height: var(--j-height);
  }
  .storepage .applist .wrap::after {
    float: right;
    content: "...";
    height: var(--j-line-height);
    line-height: var(--j-line-height);
    padding-right: 5px;
    text-align: right;
    width: 3em;
    margin-left: -3em;
    position: relative;
    left: 100%;
    top: calc(0px - var(--j-line-height));
    background: linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
  }
  .storepage .applist i {
    margin: 0 2vmin;
    width: 264px;
    height: 0;
  }
  .storepage .topbar {
    position: fixed;
    width: 100%;
    height: 20vmin;
    background: linear-gradient(white 36%, rgba(0,0,0,0));
    z-index: 1;
  }
  .storepage .topbar .search {
    width: 8vmin;
    height: 8vmin;
    border-radius: 4vmin;
    background: white;
    box-shadow: 0 1px 2px rgba(0,0,0,0.08), 
                0 2px 4px rgba(0,0,0,0.08), 
                0 4px 8px rgba(0,0,0,0.08), 
                0 8px 16px rgba(0,0,0,0.08),
                0 16px 32px rgba(0,0,0,0.08), 
                0 32px 64px rgba(0,0,0,0.08);
    position: absolute;
    top: 2.2vmin;
    left: calc(4vmin + 28px);
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row-reverse;
    transition-property: width, box-shadow;
    transition-duration: 0.5s;
  }
  .storepage .topbar .search:hover {
    width: 54vmin;
    box-shadow: 0 1px 1px rgba(0,0,0,0.06), 
              0 2px 2px rgba(0,0,0,0.06), 
              0 4px 4px rgba(0,0,0,0.06), 
              0 6px 8px rgba(0,0,0,0.06),
              0 8px 16px rgba(0,0,0,0.06);
  }
  .storepage .topbar .search .q-icon {
    color: gray;
    transition: all 0.5s;
    margin: 1.9vmin;
  }
  .storepage .topbar .search:hover .q-icon {
    color: var(--q-primary);
  }
  .storepage .topbar .search .q-field {
    opacity: 0;
    transition: all 0.5s;
  }
  .storepage .topbar .search:hover .q-field {
    opacity: 1;
    flex-grow: 1;
    margin-left: 4vmin;
  }
</style>