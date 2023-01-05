<!--suppress NpmUsedModulesInstalled -->
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import FooterView from "../components/FooterView.vue";

const module = ref("about");

function goWanted() {
  module.value = "wanted";
}

useMeta({
  title: "关于",
  // 可选的; 将最终标题设置为“Index Page - My Website”，对于多级meta有用
  titleTemplate: (title) => `${title} - 星火应用商店`,
  meta: {
      description: { name: 'description', content: '关于星火应用商店spark store' },
      keywords: { name: 'keywords', content: 'spark store,星火应用商店,星火商店,星火应用商店下载,星火商店下载,deepin应用商店,uos,ubuntu,deepin'},
      equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' }
    }
});
</script>

<template>
  <q-page class="flex flex-center" style="align-items: flex-start">
    <transition-group
      enter-active-class="animated backInRight"
      enter-leave-class="animated backOutLeft"
    >
      <div v-show="module === 'about'" class="row aboutPage" key="about">
        <div class="row">
          <h1>关于</h1>
          <h2>ABOUT US</h2>
        </div>
        <div class="row">
          <p>
            由深度科技论坛（bbs.deepin.org） shenmo 发起的星火工作组致力于丰富
            Linux 生态，
          </p>
          <p>取“星星之火，可以燎原”之意，组建了星火应用商店。</p>
          <p>
            我们是个年轻的团队，大部分成员是 00
            后，有小学生，中学生，大学生，来自五湖四海。
          </p>
          <p>
            尽管我们年龄不同，资历不同，但是我们努力建设 Linux
            生态的目标是相同的，
          </p>
          <p>我们有信心、也有勇气做到这些！</p>
          <p></p>
          <p>如果你与我们志同道合，欢迎加入我们！</p>
        </div>
        <q-btn
          color="white"
          text-color="rgb(61,49,56)"
          style="padding: 0 3vmin; font-weight: bold"
          @click="goWanted"
          rounded
        >
          招贤纳士 >
        </q-btn>
      </div>
      <div v-show="module === 'wanted'" class="row wantedPage" key="wanted">
        <div class="row title">
          <h1>招贤纳士</h1>
          <h2>WE WANT YOU</h2>
        </div>
        <div class="row method">
          联系方式：872690351<span style="color: rgb(132, 128, 126)"
            >（QQ 群）</span
          >
        </div>
        <div class="row jobCard">
          <h4>软件维护员</h4>
          <p>
            <strong>能力要求：</strong>会使用 deepin V20 或其它 Linux
            发行版，会打字，会上网，会下载 Linux 软件包，有责任心，有电脑；
          </p>
          <p>
            <strong>职责：</strong
            >搜集软件，打包软件。维护者可以不是开发者，但必须有认真负责的态度。若不能继续维护，请在星火钉钉/QQ群通知管理员。
          </p>
          <p>
            <strong>投递须知：</strong
            ><a
              href="https://deepin-community-store.gitee.io/spark-wiki/#/Submit/Submit"
              >https://deepin-community-store.gitee.io/spark-wiki/#/Submit/Submit</a
            >
          </p>
        </div>
      </div>
    </transition-group>
    <footer-view></footer-view>
  </q-page>
</template>

<style scoped lang="scss">
@use "../css/var-image-bg";

.aboutPage {
  position: relative;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: space-evenly;
  width: 100vw;
  height: calc(100vh - 10vmin);
  padding-top: 10vmin;

  &::before {
    @include var-image-bg.image("about", "background");
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    filter: brightness(0.5);
  }

  > .row {
    flex-direction: column;
    align-items: center;
  }

  h1 {
    margin: 0;
    color: white;
    font-size: 6vmin;
    line-height: 2em;
    position: relative;

    &::after {
      content: "";
      width: 1.2em;
      height: 0.16em;
      background-color: white;
      position: absolute;
      left: 50%;
      bottom: 0;
      border-radius: 0.08em;
      transform: translateX(-50%);
    }
  }

  h2 {
    color: white;
    margin: 0;
    font-size: 3vmin;
    font-weight: 400;
    letter-spacing: 0.3em;
    line-height: 2em;
  }

  p {
    color: white;
    margin: 0;
    font-size: 2.2vmin;
    line-height: 2.2em;
  }
}

.wantedPage {
  min-height: calc(100vh - 10vmin);
  position: relative;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: flex-start;
  padding: 10vmin 8vmin;
  flex-direction: column;
  flex-grow: 1;

  &::before {
    @include var-image-bg.image("about", "banner");
    content: "";
    width: 100%;
    height: 56vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    filter: "brightness(0.7)";
  }

  .title {
    margin-top: 6vmin;
  }

  h1 {
    margin: 0;
    color: white;
    font-size: 6vmin;
    line-height: 2em;
  }

  h2 {
    color: rgba(255, 255, 255, 0.42);
    margin: 0 0 0 3vmin;
    font-size: 6vmin;
    font-weight: 400;
    line-height: 2em;
  }

  p {
    color: white;
    margin: 0;
    font-size: 2.2vmin;
    line-height: 2.2em;
  }

  .method {
    background-color: white;
    border-radius: 2vmin;
    padding: 0.4vmin 4vmin;
    font-size: 2vmin;
    box-shadow: 0 0 28px 0 rgb(0 0 0 / 30%);
    color: rgb(25, 46, 66);
  }

  .jobCard {
    width: 80%;
    background-color: white;
    box-shadow: 0 0 28px 0 rgb(0 0 0 / 30%);
    border-radius: 1vmin;
    margin: 4vmin 0;
    padding: 3vmin;
    position: relative;
    flex-direction: column;

    h4 {
      margin: 0 0 3vmin;
      font-size: 3vmin;
      line-height: 1em;

      &::after {
        content: "";
        height: 1em;
        width: 0.3em;
        background-color: var(--q-primary);
        position: absolute;
        left: 0;
      }
    }

    p {
      color: black;
    }
  }
}
</style>
