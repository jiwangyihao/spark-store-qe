<!--suppress NpmUsedModulesInstalled -->
<template>
  <q-page class="flex flex-center mainPage">
    <div class="row">
      <q-img
        src="../assets/img/index/1.png"
        spinner-color="white"
        class="bgPic"
      />
      <div class="row P1st">
        <h1 class="app_name">
          Spark Store
          <q-chip size="2vmin" icon="get_app">
            3.0.2
          </q-chip>
        </h1>
        <h2>Debian 系发行版的专属应用商店</h2>
        <div class="row window">
          <div class="row">
            <div class="row" style="flex-direction: column; flex-wrap: nowrap;">
              <p>极速下载</p>
              <p>一键安装</p>
              <p>享你所想</p>
              <p>予你所求</p>
              <p>明暗随性</p>
              <p>精彩不同</p>
              <p>全新设计</p>
              <p>为你而来</p>
            </div>
            <div class="row">
              <q-img
                src="../assets/img/index/3.png"
                spinner-color="white"
                width="100%"
                class=""
              />
              <q-img
                src="../assets/img/index/4.png"
                spinner-color="white"
                width="80%"
                class=""
              />
              <div class="row" style="flex-direction: column;">
                <q-btn color="primary" style="margin-bottom: 2vmin;" to="/download">
                  <q-avatar size="20px" style="filter: brightness(100) grayscale(1);">
                    <img src="../assets/icons/favicon-128x128.png">
                  </q-avatar>
                  下载最新版本
                </q-btn>
                <q-btn color="white" text-color="primary" to="/download">
                  查看更新日志
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <q-img
        src="../assets/img/index/2.png"
        spinner-color="white"
        width="46vw"
        class=""
      />
    </div>
    <div class="row" style="padding-bottom: 10vmin;">
      <div class="row P2nd">
        <q-img
          src="../assets/img/index/6.png"
          spinner-color="white"
          width="14vmin"
          class=""
        />
        <h2>星星之火，可以燎原。</h2>
        <p>从过去到未来，操作系统国产化替代渐成趋势；</p>
        <p>完善 Linux 发行版生态已迫在眉睫。</p>
        <p>如何才能满足用户的使用需求，让海量应用触手可及？</p>
        <p>而这，便是星火开发者联盟矢志不渝所追求的价值。</p>

        <p>星火商店——从社区中来，到社区中去。</p>
      </div>
      <q-img
        src="../assets/img/index/5.png"
        spinner-color="white"
        width="46vw"
        class=""
      />
    </div>
    <div class="row">
      <div class="row P3rd">
        <q-img
          src="../assets/img/index/8.png"
          spinner-color="white"
          width="36vmin"
          class=""
        />
        <h2>多，为你而来</h2>
        <p>海量应用，涉及方方面面，</p>
        <p>寻找应用从未如此轻松</p>
      </div>
      <q-img
        src="../assets/img/index/7.png"
        spinner-color="white"
        width="54vw"
        class=""
      />
    </div>
    <div class="row" style="flex-direction: row-reverse;">
      <div class="row P4th">
        <q-img
          src="../assets/img/index/10.png"
          spinner-color="white"
          width="36vmin"
          class=""
        />
        <h2>快，举重若轻</h2>
        <p>极速下载，一键安装体验，</p>
        <p>下载应用从未如此简单</p>
      </div>
      <q-img
        src="../assets/img/index/9.png"
        spinner-color="white"
        width="54vw"
        class=""
      />
    </div>
    <div class="row">
      <div class="row P5th">
        <q-img
          src="../assets/img/index/12.png"
          spinner-color="white"
          width="36vmin"
          class=""
        />
        <h2>好，精益求精</h2>
        <p>社区经营维护，精挑细选，</p>
        <p>使用应用从未如此舒心</p>
      </div>
      <q-img
        src="../assets/img/index/11.png"
        spinner-color="white"
        width="54vw"
        class=""
      />
    </div>
    <div class="row" style="padding-bottom: 10vmin;">
      <div class="row P6th">
        <h2>
          <q-img
            src="../assets/img/index/14.png"
            spinner-color="white"
            width="6vmin"
            class=""
          />
          请尽情体验吧
        </h2>
        <p>The best way to predict future is to invent it !</p>
        <div class="row">
          <q-btn color="black" style="margin-bottom: 2vmin;" to="/download">
            前往下载最新版本
          </q-btn>
        </div>
        <div class="row">
          <q-btn flat padding="xs 0" :ripple="false">
            <q-img
              src="../assets/img/index/15.png"
              spinner-color="white"
              width="8px"
              style="margin-right: 1vmin"
              contain
            />
            加入我们一同构建 Spark Store  >
          </q-btn>
        </div>
      </div>
      <q-img
        src="../assets/img/index/13.png"
        spinner-color="white"
        width="46vw"
        class=""
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useMeta } from 'quasar'

export default defineComponent({
  name: 'PageIndex',
  setup () {
    // needs to be called in setup()
    useMeta({
      title: '首页',
      // 可选的; 将最终标题设置为“Index Page - My Website”，对于多级meta有用
      titleTemplate: title => `${title} - 星火应用商店`,
    })
  }
})

</script>
