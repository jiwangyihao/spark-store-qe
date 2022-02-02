<!--suppress CssUnusedSymbol, JSUnresolvedVariable -->
<script setup>
// noinspection NpmUsedModulesInstalled
import {onMounted, ref, watch} from "vue";
// noinspection NpmUsedModulesInstalled
import { useRouter, useRoute } from 'vue-router'
import axios from "axios";
import { useMeta } from 'quasar'

const router = useRouter()
const route = useRoute()

useMeta({
  title: 'WEB商店',
  // 可选的; 将最终标题设置为“Index Page - My Website”，对于多级meta有用
  titleTemplate: title => `${title} - 星火应用商店`,
})

const appList = ref([])
const source = ref("https://d.store.deepinos.org.cn")
//const imgSource = ref("https://cdn.jsdelivr.net/gh/Jerrywang959/jsonpng")
const dataSource = ref("https://store.deepinos.org/api/")
const searchStr = ref("")
const loaded = ref(true)
const sortId = ref({})

function getSortId() {
  axios
    .post(
      `${dataSource.value}type/get_type_list`
    )
    .then((res) => {
      res.data.data.forEach(e => {
        sortId.value[e.orig_name]=e.type_id
      });
      getAppList(route.params)
    });
}

function getAppList(params) {
  if (params.hasOwnProperty("sort")) {
    // noinspection SpellCheckingInspection
    if (sortId.value.hasOwnProperty(params.sort)) {
      axios
        .post(
          `${dataSource.value}application/get_application_list`,
          {
            size: 10000,
            type_id: sortId.value[params.sort]
          }
        )
        //appList.json 软件列表
        .then((res) => {
          appList.value = res.data.data.data;
          loaded.value=true
        });
    } else {
      router.push("/Error404")
    }
  }
}

function openApp(appId,cardIndex) {
  console.log(appId, cardIndex);
}


watch(
  () => route.params,
  async toParams => {
    // 对路由变化做出响应...
    if (toParams.hasOwnProperty("sort")) {
      loaded.value = false
    } else {
      appList.value = []
    }
    getAppList(toParams)
  }
)

watch(
  () => route.path,
  async toPath => {
    // 对路由变化做出响应...
    if (toPath.match("store")) {
      if (!toPath.match("sorts")) {
        loaded.value=false
        setTimeout(() => {
          loaded.value=true
        }, 500);
      }
    }
  }
)

onMounted(() => {
  if (route.params.hasOwnProperty("sort")) {
    loaded.value=false
  }
  getSortId()
})
</script>

<template>
  <q-page class="flex storePage">
    <div class="topBar">
      <div class="search">
        <q-icon name="search" size="25px" />
        <q-input borderless v-model="searchStr">
          <template v-slot:append>
            <q-icon v-if="searchStr !== ''" name="clear" class="cursor-pointer" @click="searchStr = ''" />
          </template>
        </q-input>
      </div>
    </div>
    <q-scroll-area style="width: 100%;  margin-top: 52px" :thumb-style='{"z-index" : 1, "border-radius" : "100px"}' :visible="false">
      <div class="body relative-position">
        <transition-group
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div v-if="$route.path==='/store'&&loaded" class="rank" key="recommend">
            <h5>施工ing...</h5>
          </div>
          <div v-if="$route.path.match('rank')&&loaded" class="rank" key="rank">
            <h5>施工ing...</h5>
          </div>
          <div v-if="$route.path.match('sort')&&loaded" class="sort appList" key="sort">
            <q-card v-for="(app, index) in appList" :id="'app_'+index" :key="index" @click="// noinspection JSUnresolvedVariable
openApp(app.application_id,index)">
              <q-card-section horizontal>
                <q-avatar size="64px" rounded>
                  <img :src="source+'/store/'+$route.params.sort+'/'+app.package.replace('+', '%2B')+'/icon.png'" alt="">
                </q-avatar>
                <q-card-section>
                  <!--suppress JSUnresolvedVariable -->
                  <h6>{{app.application_name_zh}}</h6>
                  <div class="wrap">
                    <div class="text">
                      {{app.more}}
                    </div>
                  </div>
                </q-card-section>
              </q-card-section>
            </q-card>
            <i></i><i></i><i></i><i></i><i></i><i></i><i></i>
          </div>
        </transition-group>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<style>
  .storePage {
    padding-left: 10vmin;
  }
  .storePage .body {
    display: flex;
    flex-grow: 1;
    padding: 4vmin 2vmin;
  }
  .storePage .body>span {
    display: flex;
    flex-grow: 1;
    will-change: contents;
  }
  .storePage .rank {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
  }
  .storePage .appList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .storePage .appList .q-card {
    margin: 2vmin;
    border-radius: 2vmin;
    box-shadow: 0 1px 10px rgb(0 0 0 / 30%),
      0 2px 4px rgb(0 0 0 / 21%),
      0 3px 1px -4px rgb(0 0 0 / 18%);
    will-change: all;
    transition: all 0.35s;
  }
  .storePage .appList .q-card:hover {
    box-shadow: 0 1px 5px rgb(0 0 0 / 20%),
      0 2px 2px rgb(0 0 0 / 14%),
      0 3px 1px -2px rgb(0 0 0 / 12%);
  }
  .storePage .appList .q-card__section--horiz {
    padding: 12px;
  }
  .storePage .appList .q-card__section--vert {
    padding: 0 0 0 12px;
  }
  .storePage .appList .q-avatar {
    display: flex;
    padding: 2px;
    box-sizing: content-box;
    border-radius: 2vmin;
    justify-content: center;
  }
  .storePage .appList .q-avatar__content, .q-avatar img:not(.q-icon):not(.q-img__image) {
    display: flex;
    height: auto;
    width: auto;
    max-width: 1em;
    max-height: 1em;
    font-size: inherit;
  }
  .storePage .appList h6 {
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
    width: 160px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .storePage .appList .wrap {
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
  .storePage .appList .wrap .text {
    float: right;
    margin-left: -5px;
    width: 100%;
    word-break:break-all;
  }
  .storePage .appList .wrap::before {
    float: left;
    width: 5px;
    content: '';
    height: var(--j-height);
  }
  .storePage .appList .wrap::after {
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
  .storePage .appList i {
    margin: 0 2vmin;
    width: 264px;
    height: 0;
  }
  .storePage .topBar {
    position: fixed;
    width: 100%;
    height: 20vmin;
    background: linear-gradient(white 36%, rgba(0,0,0,0));
    pointer-events: none;
    z-index: 1;
  }
  .storePage .topBar .search {
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background: white;
    box-shadow: 0 1px 2px rgba(0,0,0,0.08),
                0 2px 4px rgba(0,0,0,0.08),
                0 4px 8px rgba(0,0,0,0.08),
                0 8px 16px rgba(0,0,0,0.08),
                0 16px 32px rgba(0,0,0,0.08),
                0 32px 64px rgba(0,0,0,0.08);
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
    box-shadow: 0 1px 1px rgba(0,0,0,0.06),
              0 2px 2px rgba(0,0,0,0.06),
              0 4px 4px rgba(0,0,0,0.06),
              0 6px 8px rgba(0,0,0,0.06),
              0 8px 16px rgba(0,0,0,0.06);
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
