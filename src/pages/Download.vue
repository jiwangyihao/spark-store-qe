<script setup>
//下载地址在/src/router/routes.js中设置

// noinspection NpmUsedModulesInstalled
import {ref} from "vue";
import { useMeta } from 'quasar'
import FooterView from '../components/FooterView'

useMeta({
  title: '下载',
  // 可选的; 将最终标题设置为“Index Page - My Website”，对于多级meta有用
  titleTemplate: title => `${title} - 星火应用商店`,
})

//控制安装说明（Q&A）弹窗的显示
const showTips = ref(false)

//Q&A中的消息内容
const qaMessages = [
  {
    //值为数组，数组中可以是一到多个字符串，支持HTML，多个字符串表示多条消息（多段话）
    question: ["我在使用UOS但我不想打开开发者模式"],
    answer: ["看看这个：<a href='https://gitee.com/deepin-community-store/spark-store-uos/releases'>https://gitee.com/deepin-community-store/spark-store-uos/releases</a>"]
  },
  {
    question: ["在哪进交流群？"],
    answer: ["872690351"]
  },
  {
    question: ["如何开启多线程下载？"],
    answer: ["右上角菜单--->设置--->源列表旁边的刷新按钮，然后重启应用"]
  },
  {
    question: ["去哪反馈？"],
    answer: ["应用详情页面有按钮"]
  },
  {
    question: ["在哪里投稿？"],
    answer: ["右上角菜单--->投递应用"]
  },
  {
    question: ["我不是deepin/UOS用户，可以使用星火应用商店吗？"],
    answer: ["可以，但是请先下载依赖补充包"]
  },
  {
    question: ["下载的web应用不能启动怎么办？"],
    answer: [
      "如果你在使用ubuntu 20.04，推荐更新dtk到5.4版本，也可参考Debian11的解决方法",
      "如果你是使用Debian 11的用户，理论上不会出问题，如果闪退，请卸载spark-webapp-runtime并下载swrt-lite包来修复",
      "sudo apt remove spark-webapp-runtime -y && sudo apt install swrt-lite -y"
    ]
  },
  {
    question: ["wine应用不能启动"],
    answer: ["带上你的发行版名称&版本去应用反馈/催更"]
  },
  {
    question: ["星火商店会影响系统正常更新吗？"],
    answer: ["星火商店的源优先级被调的低于系统默认，不会影响"]
  },
  {
    question: ["有些应用已经过时或者失效了，我想让他下架"],
    answer: ["前往<a href='https://gitee.com/deepin-community-store/software_-issue'>https://gitee.com/deepin-community-store/software_-issue</a>"]
  },
  {
    question: ["提示有更新之后在菜单里的Auto Upgrade操作却提示更新了0个软件包"],
    answer: [
      "这个软件包所需要的依赖高于你的系统依赖。这可能是为了其他发行版编译的软件包，不能安装是正常的。如果觉得烦。。。可以在设置中按1关闭更新提醒服务"
    ]
  }
]

//时间线中的更新日志
const updateHistory= [
{
    version: "3.0.3-11",
    time: "2022-04-11 11:43",
    details: [
      "提供了自动更新服务。"
    ]
  },
  {
    version: "3.0.3-10",
    time: "2022-04-07 15:30",
    details: [
      "这东西还要手写过来的？就不能直接让用户跳转到gitee去看发行日志吗",
      "太反人类了",
	    "图呢？我想放个图啊！咋放图嘞？",
      "支持html标签吗？",
	    "我在这写一个标签直接指向30310版本的发行日志应该没人发现吧",
	    "<a href='https://gitee.com/deepin-community-store/spark-store/releases/3.0.3-10'>https://gitee.com/deepin-community-store/spark-store/releases/3.0.3-10</a>",
	    "(｡･∀･)ﾉﾞ多省事！啥？jwyh说这样不美观？哼，又不是不能用！以后我还要辶",
	    "",
	    "搞事情的shenmo已经被拖走了",
      "",
      "正式的更新日志 by jwyh：",
      "大幅度优化了非deepin/UOS系统下的显示效果；",
      "修改了control文件，防止在编译时误使用了dtk2的kit；",
      "spark-dstore-patch现在会在编译时一并编译，跨平台已可以实现；",
      "spark-dstore-patch现在有一个独立的仓库 https://gitee.com/deepin-community-store/spark-dstore-patch。"
    ]
  },
  {
    version: "3.0.3-9",
    time: "2022-02-26 19:43",
    details: [
      "更改包构建方式，现在支持dpkg-build-package；",
      "更改key的安装方法；",
      "表明我们还活着。"
    ]
  },
  {
    version: "3.0.3-8",
    time: "2022-01-14 00:39",
    details: [
      "不再与最新版本的spark-dstore-patch冲突；",
      "现在默认不会显示已集成dstore patch的信息了，仅在同时安装了patch后显示；",
      "安装时会同时加入新的密钥，旧的将会在不久后废除，所以请尽快更新到3.0.3-8+版本；",
      "这回记住修改关于界面的版本号了。"
    ]
  },
  {
    version: "3.0.3-7",
    time: "2021-12-13 20:15",
    details: [
      "更改版本号&催更地址。"
    ]
  },
  {
    version: "3.0.3-6",
    time: "2021-12-11 17:54",
    details: [
      "现在在非UOS/deepin上安装星火应用商店就可以正确处理UOS包啦！"
    ]
  },
  {
    version: "3.0.3-5",
    time: "2021-10-26 20:43",
    details: [
      "在UOS上重编译以适配。"
    ]
  },
  {
    version: "3.0.3-4",
    time: "2021-10-24 23:48",
    details: [
      "添加了临时催更功能，减轻维护者负担，放弃维护无人使用的应用。"
    ]
  },
  {
    version: "3.0.3—LTS",
    time: "2021-07-06 10:20",
    details: [
      "支持应用详情页显示升级/重新安装；",
      "修复应用详情页经常加载失败的问题；",
      "修复应用详情页写在失败的问题；",
      "修复下载列表和通知栏不显示应用缩略图的问题；",
      "支持动态获取下载镜像源列表；",
      "尝试开启 Hidpi 支持；",
      "DTK 界面版本后续随缘维护更新。"
    ]
  },
  {
    version: "3.0.2",
    time: "2021-06-13 14:41",
    details: [
      "修正 3.0.1 版本中非 DDE 环境下标题栏显示异常的问题；",
      "安装时发送邮件统计安装数量。"
    ]
  },
  {
    version: "3.0.1",
    time: "2021-04-17 15:54",
    details: [
      "合并 multiple 分支，支持多线程下载软件包（由 @枯叶蚊 大佬实现）；",
      "修改返回图标按钮以及返回按钮逻辑；",
      "修改默认源服务器列表；",
      "修复启动时首页颜色主题不跟随系统主题颜色的问题；",
      "修正设置界面源服务器选择下拉框中“开发者模式”提示文字可被选中的问题。",
      "该版本由 UOS 个人版 + Qt 5.11.3 编译，如果存在运行问题请及时反馈......"
    ]
  },
  {
    version: "3.0",
    time: "2020-12-17 00:24",
    details: [
      "支持应用搜索功能，限制前一次搜索完成后才能进行第二次搜索（打开分享链接不受影响）；",
      "修复多屏幕下截图预览偏移的问题，固定在主屏幕下显示；",
      "修复返回列表之后不能记住上次浏览位置的问题；",
      "更新源服务器优先级；",
      "调整安装应用方式的顺序为： 星火内置安装器 ， 深度软件包安装器 ， gdebi ；",
      "修改打包方式，支持从启动器右键卸载商店。",
      "由于打包方式修改，安装过3.0~alpha版本的用户需要先卸载商店再重新安装，或者重复安装两次才能正确覆盖文件位置。"
    ]
  },
  {
    version: "3.0~alpha2",
    time: "2020-12-15 00:36",
    details: [
      "修复了搜索功能经常请求错误的问题；",
      "修复了搜索之后点击返回列表按钮页面显示逻辑错误的问题；",
      "修复了返回列表之后不能记住上次浏览位置的问题；",
      "更新了源服务器优先级；",
      "调整了安装选项的顺序；",
      "重新打包，修复上个版本中无法使用 dpkg 安装的问题。"
    ]
  },
  {
    version: "3.0~alpha1",
    time: "2020-12-06 12:33",
    details: [
      "尝试修复多屏幕下截图预览偏移的问题，固定在主屏幕下显示。（待测试）"
    ]
  },
  {
    version: "3.0~alpha0",
    time: "2021-04-17 15:54",
    details: [
      "由大佬 AdamSmith 完成了搜索功能，支持多线程下载搜索结果列表的软件图标；",
      "由于多线程下载的问题，所以在 前一次搜索完成之前 无法进行下一次搜索，请耐心等待；",
      "打开 spk分享链接 不受影响。"
    ]
  }
]
</script>

<template>
  <q-page class="flex flex-start downPage varImageBg downBackground">
    <h1>下载</h1>
    <h2>DOWNLOADS</h2>
    <div class="row" style="width: 76vw">
      <div class="row" style="flex-grow:1;padding:4vmin">
        <div class="row downCard">
          <q-avatar size="48px">
            <img src="../assets/icons/favicon-96x96.png" alt="">
          </q-avatar>
          <div class="row" style="flex-direction:column; align-items: flex-start;margin-left:2vmin">
            <h3>软件本体</h3>
            <div class="row">
              <q-btn
                color="primary"
                text-color="white"
                @click="showTips = true"
                style="padding: 0 3vmin;"
                dense
                rounded
                unelevated
              >
                点击下载
              </q-btn>
              <span>最新版本 3.0.3-11</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="flex-grow:1;padding:4vmin">
        <div class="row downCard">
          <q-avatar size="48px">
            <img src="../assets/img/download/download-debian.png" alt="">
          </q-avatar>
          <div class="row" style="flex-direction:column; align-items: flex-start;margin-left:2vmin">
            <h3>依赖包</h3>
            <div class="row">
              <q-btn
                color="primary"
                text-color="white"
                to="/download_dependencies_latest"
                style="padding: 0 3vmin;"
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
      <q-timeline color="primary" layout="comfortable">
        <q-timeline-entry
          v-for="(v,k) in updateHistory"
          :key="k"
          :title="v.version"
          :subtitle="v.time"
        >
          <div>
            <ul style="padding-inline-start: 0;">
              <li v-for="(t,key) in v.details" :key="key">{{t}}</li>
            </ul>
          </div>
        </q-timeline-entry>
      </q-timeline>
    </div>

    <!-- 安装说明（Q&A）弹窗 -->
    <div :class="['tipsContainer',{active : showTips}]" @click="showTips = false">
      <div class="tipsPanel" @click.stop>
        <div class="logoPanel"></div>
        <div class="contentPanel">
          <h3>安装说明 Q&A</h3>
          <q-scroll-area class="qaCard">
            <div class="qaSection" v-for="(message,key) in qaMessages" :key="key">
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
              <q-chat-message
                :text="message.answer"
                text-html
                sent
              >
                <template #avatar>
                  <div class="avatar">A</div>
                </template>
              </q-chat-message>
            </div>
          </q-scroll-area>
          <q-btn
            color="primary"
            text-color="white"
            to="/download_latest"
          >
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
@import "../css/quasar.variables";

.downPage {
  position: relative;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
  padding-top: 10vmin;
  flex-wrap: nowrap;

  &.varImageBg.downBackground::before {
    @include var-image-bg.image("download",'background');
    content:"";
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
      color: rgb(127,127,127);
    }
  }

  .tipsContainer {
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,.2);
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
    };

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
          content: "";
          display: block;
          width: 7vmin;
          height: 7vmin;
          border-radius: 1vmin;
          background: {
            color: white;
            image: url("../assets/icons/favicon-128x128.png");
            repeat: no-repeat;
            size: 4vmin;
            position: center;
          };
          box-shadow:
            0 0 0 rgba(0, 0, 0, 0.056),
            0 0 0.1vmin rgba(0, 0, 0, 0.081),
            0 0 0.1vmin rgba(0, 0, 0, 0.1),
            0 0 0.2vmin rgba(0, 0, 0, 0.119),
            0 0 0.4vmin rgba(0, 0, 0, 0.144),
            0 0 1vmin rgba(0, 0, 0, 0.2)
        ;

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
          background: rgba($primary,.05);
          border-radius: 1vmin;

          .scrollarea__container {
            border-radius: 0.6vmin;
          }

          .q-scrollarea__bar {
            right: 2px;
            border-radius: 9px;
            background-color: #027be3;
            width: 9px;
            opacity: 0.2
          }

          .q-scrollarea__thumb {
            right: 4px;
            border-radius: 5px;
            background-color: #027be3;
            width: 5px;
            opacity: 0.75
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
@import "../css/quasar.variables";
.qaCard {
  .scrollarea__container {
    border-radius: 0.6vmin;
  }

  .q-scrollarea__bar {
    right: 2px;
    border-radius: 9px;
    background-color: $primary;
    width: 9px;
    opacity: 0.2
  }

  .q-scrollarea__thumb {
    right: 4px;
    border-radius: 5px;
    background-color: $primary;
    width: 5px;
    opacity: 0.75
  }

  .q-message-text:last-child {
    min-height: unset;
  }
}
</style>
