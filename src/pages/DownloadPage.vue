<script setup lang="ts">
//下载地址在/src/router/routes.js中设置

import { nextTick, Ref, ref } from 'vue';
import { useMeta } from 'quasar';
import FooterView from '../components/FooterView.vue';
import { api, updateItem, updateData } from 'boot/api';

useMeta({
  title: '下载',
  // 可选的; 将最终标题设置为“Index Page - My Website”，对于多级meta有用
  titleTemplate: (title) => `${title} - 星火应用商店`,
  meta: {
    description: {
      name: 'description',
      content: '星火应用商店spark store官方下载',
    },
    keywords: {
      name: 'keywords',
      content:
        'spark store,星火应用商店,星火商店,星火应用商店下载,星火商店下载,deepin应用商店,uos,ubuntu,deepin',
    },
    equiv: {
      'http-equiv': 'Content-Type',
      content: 'text/html; charset=UTF-8',
    },
  },
});

//控制安装说明（Q&A）弹窗的显示
const showTips = ref(false);

interface qaMessage {
  //值为数组，数组中可以是一到多个字符串，支持HTML，多个字符串表示多条消息（多段话）
  question: string[];
  answer: string[];
}

//Q&A中的消息内容
const qaMessages: qaMessage[] = [
  {
    question: ['在哪进交流群？'],
    answer: [
      "星火商店交流平台 <a href='https://www.deepinos.org/d/1207/'>点击这里进入</a>",
    ],
  },
  {
    //值为数组，数组中可以是一到多个字符串，支持HTML，多个字符串表示多条消息（多段话）
    question: ['上面这个链接挂了，显示进不去'],
    answer: [
      "我们还有 QQ 群作为备份，群号是 872690351 群2 865927727。这里还有<a href='https://www.deepinos.org/'>论坛</a>",
    ],
  },
  {
    question: ['我是国产架构，怎么获取应用？'],
    answer: [
      '目前星火商店支持arm架构的国产芯片，请下载 arm64 架构的 deb 包。请注意：支持是实验性的，请积极在星火交流平台，QQ 群或论坛向我们反馈！',
      '目前支持的发行版有 UOS 专业版，Ubuntu 22.04 以及有限的支持了银河麒麟 V10（仅保证客户端可运行，上架应用未经过测试）',
      '银河麒麟用户请下载依赖包',
    ],
  },
  {
    question: ['安装依赖包出现错误'],
    answer: [
      'UOS 或者 deepin 不需要安装，请不要安装；Kali Linux/Kdeneon 请自行编译安装，暂不支持；依赖包支持的发行版却报无法安装错误：尝试 sudo apt update 后再运行。如果仍然无法排查出问题，请参考第一条进入交流平台寻求帮助。',
    ],
  },
  {
    question: ['在哪里投稿？'],
    answer: [
      '右上角菜单--->投递应用。对于已经上架的应用的更新，建议使用投稿器一键填写投稿信息',
    ],
  },
  {
    question: ['我不是 deepin/UOS 用户，可以使用星火应用商店吗？'],
    answer: [
      '可以。对于 Ubuntu 22.04，请直接安装；对于Ubuntu 20.04/Debian 10/Debian 11，先安装依赖包',
      'Ubuntu 22.04 原版可能会出现 SSL 错误，暂无解决方案，可尝试其他衍生版本',
    ],
  },
  {
    question: ['我可以用 dpkg -i 安装吗？'],
    answer: [
      '不可以！不可以！不可以！直接调用 dpkg 是不处理依赖的！使用 sudo apt install ./xxxx.deb 来安装，或者直接使用gdebi等图形化的安装器！！！',
      'sudo apt install gdebi 来安装 gdebi',
      '不可以！不可以！不可以！直接调用 dpkg 是不处理依赖的！使用 sudo apt install ./xxxx.deb 来安装，或者直接使用gdebi等图形化的安装器！！！',
      '已经有不下 20 个人被这个坑了。CSDN 害人不浅',
    ],
  },
  {
    question: ['星火商店会影响系统正常更新吗？'],
    answer: [
      '星火商店现已将源与系统分开，不再影响系统更新。相应的，星火商店中的应用也不会随着系统更新。请在右上角的应用更新和安装设置来操作更新',
      '如果希望在命令行中安装星火源的应用，请使用 aptss。aptss 类似 apt，但是加入了星火源和多线程下载支持',
    ],
  },
  {
    question: ['有些应用已经过时或者失效了，我想让他下架'],
    answer: [
      "前往<a href='https://gitee.com/deepin-community-store/software_-issue'>https://gitee.com/deepin-community-store/software_-issue</a>",
    ],
  },
];

//获取最新版本
const latest: Ref<updateItem> = ref({
  version: '',
  time: '',
  details: [],
});
api.getLatest().then((res) => {
  latest.value = res;
});

//时间线中的更新日志
const updateHistory: Ref<updateItem[]> = ref([]);

//是否禁用滚动加载
const disableLoad = ref(false);

//获取滚动加载元素
const historyView = ref();

nextTick(() => {
  //主动触发第一次加载
  historyView.value.trigger();
});

const loadHistory = (index: number, done: () => void) => {
  api.getHistory(index).then((res: updateData) => {
    updateHistory.value = updateHistory.value.concat(res.data);
    if (res.isEnded) {
      //当加载到最后一页时禁用滚动加载
      disableLoad.value = true;
    }
    done();
  });
};
</script>

<template>
  <q-page class="flex flex-start downPage varImageBg downBackground">
    <h1>下载</h1>
    <h2>DOWNLOADS</h2>
    <div class="row" style="width: 76vw">
      <div class="row" style="flex-grow: 1; padding: 4vmin">
        <div class="row downCard">
          <q-avatar size="48px">
            <img src="../assets/icons/favicon-96x96.png" alt="" />
          </q-avatar>
          <div
            class="row"
            style="
              flex-direction: column;
              align-items: flex-start;
              margin-left: 2vmin;
            "
          >
            <h3>软件本体</h3>
            <div class="row">
              <q-btn
                color="primary"
                text-color="white"
                @click="showTips = true"
                style="padding: 0 3vmin"
                dense
                rounded
                unelevated
              >
                点击下载
              </q-btn>
              <span>最新版本 {{ latest.version }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="flex-grow: 1; padding: 4vmin">
        <div class="row downCard">
          <q-avatar size="48px">
            <img src="../assets/img/download/download-debian.png" alt="" />
          </q-avatar>
          <div
            class="row"
            style="
              flex-direction: column;
              align-items: flex-start;
              margin-left: 2vmin;
            "
          >
            <h3>依赖包(Ubuntu 20.04/Debian 11)</h3>
            <div class="row">
              <q-btn
                color="primary"
                text-color="white"
                to="/download_dependencies_latest"
                style="padding: 0 3vmin"
                dense
                rounded
                unelevated
              >
                点击下载
              </q-btn>
              <span>最新版本 5.4.20</span>
            </div>
          </div>
        </div>
      </div>

      <!--suppress CssInvalidPropertyValue -->
      <q-infinite-scroll
        @load="loadHistory"
        :initial-index="0"
        scroll-target=".downPage"
        :disable="disableLoad"
        style="width: -webkit-fill-available; min-height: 60vh"
        ref="historyView"
      >
        <q-timeline color="primary" layout="comfortable">
          <q-timeline-entry
            v-for="(v, k) in updateHistory"
            :key="k"
            :title="v.version"
            :subtitle="v.time"
          >
            <div style="max-width: 600px">
              <ul style="padding-inline-start: 0; word-break: break-word">
                <li v-for="(t, key) in v.details" :key="key">{{ t }}</li>
              </ul>
            </div>
          </q-timeline-entry>
        </q-timeline>

        <p v-if="disableLoad" class="text-center text-grey">
          ~ 已经到底了哦 (●'◡'●) ~
        </p>

        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </div>

    <!-- 安装说明（Q&A）弹窗 -->
    <div
      :class="['tipsContainer', { active: showTips }]"
      @click="showTips = false"
    >
      <div class="tipsPanel" @click.stop>
        <div class="logoPanel"></div>
        <div class="contentPanel">
          <h3>安装说明 Q&A</h3>
          <q-scroll-area class="qaCard">
            <div
              class="qaSection"
              v-for="(message, key) in qaMessages"
              :key="key"
            >
              <q-chat-message
                :text="message.question"
                text-html
                text-color="white"
                bg-color="primary"
              >
                <template #avatar>
                  <div class="avatar">Q</div>
                </template>
              </q-chat-message>
              <q-chat-message :text="message.answer" text-html sent>
                <template #avatar>
                  <div class="avatar">A</div>
                </template>
              </q-chat-message>
            </div>
          </q-scroll-area>
          <q-btn color="primary" text-color="white" to="/download_latest">
            开始下载
          </q-btn>
        </div>
      </div>
    </div>

    <footer-view></footer-view>
  </q-page>
</template>

<style scoped lang="scss">
@use '../css/var-image-bg';
@import '../css/quasar.variables';

.downPage {
  position: relative;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
  padding-top: 10vmin;
  flex-wrap: nowrap;

  &.varImageBg.downBackground::before {
    @include var-image-bg.image('download', 'background');
    content: '';
    width: 100%;
    height: 56vh;
    max-height: calc(68vmin + 48px);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  h1 {
    margin: 8vmin 0 0 0;
    color: white;
    font-size: 6vmin;
    line-height: 2em;
    position: relative;

    &::after {
      content: '';
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
    margin: 0 0 4vmin 0;
    font-size: 3vmin;
    font-weight: 400;
    letter-spacing: 0.3em;
    line-height: 2em;
  }

  .downCard {
    background-color: white;
    width: 100%;
    border-radius: 1vmin;
    box-shadow: 0 0 28px 0 rgb(0 0 0 / 30%);
    padding: 3vmin 2vmin;

    .q-avatar__content {
      font-size: 1em;
    }

    h3 {
      font-size: 15px;
      margin: 0;
      display: flex;
      line-height: 20px;
    }

    > .row > .row > span {
      display: flex;
      align-items: center;
      margin-left: 2vmin;
      color: rgb(127, 127, 127);
    }
  }

  .tipsContainer {
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    transition: {
      property: opacity, visibility;
      duration: 500ms, 0s;
      delay: 0s, 500ms;
    }

    &.active {
      opacity: 1;
      visibility: visible;
      transition-delay: 0s;
    }

    .tipsPanel {
      display: flex;
      min-width: 70vw;
      max-width: 90vw;
      width: 100vmin;
      height: 80vh;
      background-color: white;
      border-radius: 1vmin;
      overflow: hidden;
      box-shadow:
        0 0 0 rgba(0, 0, 0, 0.056),
        0 0 0.1vmin rgba(0, 0, 0, 0.081),
        0 0 0.1vmin rgba(0, 0, 0, 0.1),
        0 0 0.2vmin rgba(0, 0, 0, 0.119),
        0 0 0.4vmin rgba(0, 0, 0, 0.144),
        0 0 1vmin rgba(0, 0, 0, 0.2);

      .logoPanel {
        display: flex;
        min-width: 10vmin;
        width: 10vmin;
        height: 100%;
        background-color: #66ccff;
        align-items: flex-start;
        justify-content: center;
        padding-top: 1.5vmin;

        &::before {
          content: '';
          display: block;
          width: 7vmin;
          height: 7vmin;
          border-radius: 1vmin;
          background: {
            color: white;
            image: url('../assets/icons/favicon-128x128.png');
            repeat: no-repeat;
            size: 4vmin;
            position: center;
          }
          box-shadow:
            0 0 0 rgba(0, 0, 0, 0.056),
            0 0 0.1vmin rgba(0, 0, 0, 0.081),
            0 0 0.1vmin rgba(0, 0, 0, 0.1),
            0 0 0.2vmin rgba(0, 0, 0, 0.119),
            0 0 0.4vmin rgba(0, 0, 0, 0.144),
            0 0 1vmin rgba(0, 0, 0, 0.2);

          //filter: drop-shadow(0 0 0.5vmin white);
        }
      }

      .contentPanel {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        padding: 5vmin;

        h3 {
          //color: black;
          font-weight: bold;
          font-size: 3.2vmin;
          line-height: 4vmin;
          margin: 0 0 2vmin 0;
        }

        .qaCard {
          width: 100%;
          flex-grow: 1;
          padding: 2vmin;
          background: rgba($primary, 0.05);
          border-radius: 1vmin;

          .scrollarea__container {
            border-radius: 0.6vmin;
          }

          .q-scrollarea__bar {
            right: 2px;
            border-radius: 9px;
            background-color: #027be3;
            width: 9px;
            opacity: 0.2;
          }

          .q-scrollarea__thumb {
            right: 4px;
            border-radius: 5px;
            background-color: #027be3;
            width: 5px;
            opacity: 0.75;
          }
        }

        .avatar {
          min-width: 36px;
          width: 36px;
          height: 36px;
          font-size: 18px;
          font-weight: bold;
          line-height: 36px;
          text-align: center;
          border-radius: 18px;
        }

        .q-message-received .avatar {
          color: white;
          background: $primary;
          margin-right: 8px;
        }

        .q-message-sent .avatar {
          color: lighten($primary, 10%);
          background: #e0e0e0;
          margin-left: 8px;
        }

        .q-btn {
          align-self: flex-end;
          margin-top: 2vmin;
        }
      }
    }
  }
}
</style>

<style lang="scss">
@import '../css/quasar.variables';
.qaCard {
  .scrollarea__container {
    border-radius: 0.6vmin;
  }

  .q-scrollarea__bar {
    right: 2px;
    border-radius: 9px;
    background-color: $primary;
    width: 9px;
    opacity: 0.2;
  }

  .q-scrollarea__thumb {
    right: 4px;
    border-radius: 5px;
    background-color: $primary;
    width: 5px;
    opacity: 0.75;
  }

  .q-message-text:last-child {
    min-height: unset;
  }
}

.q-timeline--comfortable .q-timeline__subtitle {
  width: 20vw;
  max-width: 180px;
}

.q-timeline--comfortable--right .q-timeline__content {
  width: 80vw;
  max-width: 400px;
}
</style>
