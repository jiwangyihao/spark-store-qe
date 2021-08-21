<template>
  <q-page class="flex storepage">
    <div class="body">
      <transition-group
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div v-if="this.$route.path.match('sort')" class="sort" key="sort">
          <q-card>
            <q-card-section>
              666
            </q-card-section>
          </q-card>
        </div>
        <div v-if="this.$route.path.match('rank')" class="rank" key="rank">
          <h5>施工ing...</h5>
        </div>
      </transition-group>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  name: 'PageIndex',
  data: () => {
    return {
      appList: [],
      source: "https://d.store.deepinos.org.cn",
      imgSource: "https://cdn.jsdelivr.net/gh/Jerrywang959/jsonpng"
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // 对路由变化做出响应...
        if (toParams.hasOwnProperty("sort")) {
          axios
            //39.106.2.2:38324
            .get(
              `${this.source}/store/${toParams.sort}/applist.json`
            )
            //applist.json 软件列表
            .then((res) => {
              this.appList = res.data;
            });
        }
      }
    )
  },
  meta: {
    title: 'WEB商店',
    // 可选的; 将最终标题设置为“Index Page - My Website”，对于多级meta有用
    titleTemplate: title => `${title} - 星火应用商店`,
  }
}
</script>
<style>
  .storepage {
    padding-left: 10vmin;
  }
  .body {
    display: flex;
    flex-grow: 1;
    padding: 4vmin;
  }
  .body>span {
    display: flex;
    flex-grow: 1;
  }
  .rank {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
  }
</style>