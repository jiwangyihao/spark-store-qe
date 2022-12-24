<!--suppress NpmUsedModulesInstalled -->
<script setup>
import { useMeta } from "quasar";
import FooterView from "../components/FooterView.vue";

useMeta({
  title: "首页",
  // 可选的; 将最终标题设置为“Index Page - My Website”，对于多级meta有用
  titleTemplate: (title) => `${title} - 星火应用商店`,
});
</script>

<template>
  <q-page class="flex flex-center mainPage">
    <div class="row indexBackground">
      <div class="row P1st">
        <h1 class="app_name">
          Spark Store
          <q-chip size="2vmin" icon="get_app"> 4.1 </q-chip>
        </h1>
        <h2>Debian 系发行版的应用商店</h2>
        <div class="row window">
          <div class="row">
            <div class="row" style="flex-direction: column; flex-wrap: nowrap">
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
              <picture>
                <source
                  type="image/avif"
                  srcset="../assets/img/index/index-appToolBar.avif"
                />
                <source
                  type="image/webp"
                  srcset="../assets/img/index/index-appToolBar.webp"
                />
                <img
                  style="width: 100%"
                  src="../assets/img/index/index-appToolBar.png"
                  alt=""
                />
              </picture>
              <picture style="width: 80%">
                <source
                  type="image/avif"
                  srcset="../assets/img/index/index-play.avif"
                />
                <source
                  type="image/webp"
                  srcset="../assets/img/index/index-play.webp"
                />
                <img
                  style="width: 100%"
                  src="../assets/img/index/index-play.png"
                  alt=""
                />
              </picture>
              <div class="row" style="flex-direction: column">
                <q-btn
                  size="2vmin"
                  padding="1vmin 2.4vmin"
                  color="primary"
                  style="margin-bottom: 2vmin"
                  to="/download"
                >
                  <!--suppress CheckImageSize -->
                  <img
                    style="
                      width: 3vmin;
                      height: 3vmin;
                      margin-right: 6px;
                      filter: brightness(100) grayscale(1);
                    "
                    src="../assets/icons/favicon-32x32.png"
                    alt=""
                  />
                  下载最新版本
                </q-btn>
                <q-btn
                  size="2vmin"
                  padding="1vmin 2.4vmin"
                  color="white"
                  text-color="primary"
                  to="/download"
                >
                  查看更新日志
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <picture>
        <source
          type="image/avif"
          srcset="../assets/img/index/index-main.avif"
        />
        <source
          type="image/webp"
          srcset="../assets/img/index/index-main.webp"
        />
        <img
          style="width: 46vw"
          src="../assets/img/index/index-main.png"
          alt=""
        />
      </picture>
    </div>
    <div class="row" style="padding-bottom: 10vmin">
      <div class="row P2nd">
        <picture>
          <source
            type="image/avif"
            srcset="../assets/img/index/index-communityDecoration.avif"
          />
          <source
            type="image/webp"
            srcset="../assets/img/index/index-communityDecoration.webp"
          />
          <img
            style="width: 14vmin"
            src="../assets/img/index/index-communityDecoration.png"
            alt=""
          />
        </picture>
        <h2>星星之火，可以燎原。</h2>
        <p>从过去到未来，操作系统国产化替代渐成趋势；</p>
        <p>完善 Linux 发行版生态已迫在眉睫。</p>
        <p>如何才能满足用户的使用需求，让海量应用触手可及？</p>
        <p>而这，便是星火开发者联盟矢志不渝所追求的价值。</p>

        <p>星火商店——从社区中来，到社区中去。</p>
      </div>
      <picture>
        <source
          type="image/avif"
          srcset="../assets/img/index/index-community.avif"
        />
        <source
          type="image/webp"
          srcset="../assets/img/index/index-community.webp"
        />
        <img
          style="width: 46vw"
          src="../assets/img/index/index-community.png"
          alt=""
        />
      </picture>
    </div>
    <div class="row">
      <div class="row features">
        <picture>
          <source
            type="image/avif"
            srcset="../assets/img/index/index-radar.avif"
          />
          <source
            type="image/webp"
            srcset="../assets/img/index/index-radar.webp"
          />
          <img
            style="width: 36vmin"
            src="../assets/img/index/index-radar.png"
            alt=""
          />
        </picture>
        <h2>多，为你而来</h2>
        <p>海量应用，涉及方方面面，</p>
        <p>寻找应用从未如此轻松</p>
      </div>
      <picture>
        <source
          type="image/avif"
          srcset="../assets/img/index/index-application.avif"
        />
        <source
          type="image/webp"
          srcset="../assets/img/index/index-application.webp"
        />
        <img
          style="width: 54vw"
          src="../assets/img/index/index-application.png"
          alt=""
        />
      </picture>
    </div>
    <div class="row" style="flex-direction: row-reverse">
      <div class="row features">
        <picture>
          <source
            type="image/avif"
            srcset="../assets/img/index/index-thunder.avif"
          />
          <source
            type="image/webp"
            srcset="../assets/img/index/index-thunder.webp"
          />
          <img
            style="width: 36vmin"
            src="../assets/img/index/index-thunder.png"
            alt=""
          />
        </picture>
        <h2>快，举重若轻</h2>
        <p>极速下载，一键安装体验，</p>
        <p>下载应用从未如此简单</p>
      </div>
      <picture>
        <source
          type="image/avif"
          srcset="../assets/img/index/index-downloadSpeed.avif"
        />
        <source
          type="image/webp"
          srcset="../assets/img/index/index-downloadSpeed.webp"
        />
        <img
          style="width: 54vw"
          src="../assets/img/index/index-downloadSpeed.png"
          alt=""
        />
      </picture>
    </div>
    <div class="row">
      <div class="row features">
        <picture>
          <source
            type="image/avif"
            srcset="../assets/img/index/index-player.avif"
          />
          <source
            type="image/webp"
            srcset="../assets/img/index/index-player.webp"
          />
          <img
            style="width: 36vmin"
            src="../assets/img/index/index-player.png"
            alt=""
          />
        </picture>
        <h2>好，精益求精</h2>
        <p>社区经营维护，精挑细选，</p>
        <p>使用应用从未如此舒心</p>
      </div>
      <picture>
        <source
          type="image/avif"
          srcset="../assets/img/index/index-dingtalk.avif"
        />
        <source
          type="image/webp"
          srcset="../assets/img/index/index-dingtalk.webp"
        />
        <img
          style="width: 54vw"
          src="../assets/img/index/index-dingtalk.png"
          alt=""
        />
      </picture>
    </div>
    <div class="row" style="padding-bottom: 10vmin">
      <div class="row P6th">
        <h2>
          <picture>
            <source
              type="image/avif"
              srcset="../assets/img/index/index-enjoyDecoration.avif"
            />
            <source
              type="image/webp"
              srcset="../assets/img/index/index-enjoyDecoration.webp"
            />
            <img
              style="width: 6vmin"
              src="../assets/img/index/index-enjoyDecoration.png"
              alt=""
            />
          </picture>
          请尽情体验吧
        </h2>
        <p>The best way to predict future is to invent it !</p>
        <div class="row">
          <q-btn color="black" style="margin-bottom: 2vmin" to="/download">
            前往下载最新版本
          </q-btn>
        </div>
        <div class="row">
          <q-btn flat padding="xs 0" :ripple="false">
            <picture>
              <source
                type="image/avif"
                srcset="../assets/img/index/index-spinner.avif"
              />
              <source
                type="image/webp"
                srcset="../assets/img/index/index-spinner.webp"
              />
              <img
                style="width: 8px; margin-right: 1vmin"
                src="../assets/img/index/index-spinner.png"
                alt=""
              />
            </picture>
            加入我们一同构建 Spark Store >
          </q-btn>
        </div>
      </div>
      <picture>
        <source
          type="image/avif"
          srcset="../assets/img/index/index-decorating.avif"
        />
        <source
          type="image/webp"
          srcset="../assets/img/index/index-decorating.webp"
        />
        <img
          style="width: 46vw"
          src="../assets/img/index/index-decorating.png"
          alt=""
        />
      </picture>
    </div>
    <footer-view></footer-view>
  </q-page>
</template>

<style scoped lang="scss">
@use "../css/var-image-bg";
.q-avatar__content {
  font-size: 1em;
}

.mainPage {
  .indexBackground {
    @include var-image-bg.image("index", "background");
  }

  > .row {
    position: relative;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    padding-top: 10vh;
    scroll-snap-align: start;

    &:first-child {
      flex-direction: column;
      align-content: space-evenly;
    }

    &:last-of-type {
      height: calc(100vh - 10vmin);
    }

    > .row {
      flex-direction: column;
    }
  }

  .app_name {
    font-family: "Comfortaa-Light", sans-serif;
    font-size: 9vmin;
    margin: 0;
    display: flex;
    color: white;
    text-shadow: 0 0 2vmin #777 !important;
    font-weight: bolder;

    .q-chip {
      font-size: 2vmin;
      font-family: "Roboto", "-apple-system", "Helvetica Neue", Helvetica, Arial,
        sans-serif;
      font-weight: 400;
      letter-spacing: normal;
    }
  }

  .P1st {
    flex-direction: column;

    h2 {
      font-size: 3.4vmin;
      color: white;
      font-weight: bolder;
      line-height: 7vmin;
      text-shadow: 0 0 2vmin #777 !important;
      margin: 0 0 4vmin;
    }

    h3 {
      font-size: 3vmin;
      color: white;
      font-weight: 500;
      margin: 0;
      line-height: 6vmin;
      text-align: center;
    }

    .window {
      padding-top: 60%;
      position: relative;

      > .row {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        backdrop-filter: blur(2.4vmin);
        border-radius: 2vmin;
        box-shadow: 0 0 28px 0 rgb(0 0 0 / 30%);
        flex-wrap: nowrap;

        > .row:first-child {
          flex-direction: column;
          flex-wrap: nowrap;
          justify-content: space-evenly;
          padding: 3vmin 3vmin 2vmin 3vmin;
          color: rgba(89, 89, 89);
        }

        > .row:last-child {
          flex-grow: 1;
          background-color: rgba(255, 255, 255, 0.7);
          border-radius: 2vmin;
          align-items: flex-start;
          justify-content: center;
          padding: 0.2vmin 1vmin;
          margin-right: -1px;
        }
      }

      p {
        font-size: 2.6vmin;
        white-space: nowrap;
        margin: 0;
      }
    }
  }

  .P2nd {
    padding-left: 6vmin;
    text-align: left;
    flex-grow: 1;

    h2 {
      font-size: 5vmin;
      margin: 0 0 3vmin;
    }

    p {
      font-size: 3vmin;
      line-height: 6vmin;
      margin: 0;

      &:last-of-type {
        font-size: 4vmin;
        font-weight: bold;
        line-height: 10vmin;
      }
    }
  }

  .features {
    padding-left: 6vmin;
    text-align: left;
    flex-grow: 1;

    h2 {
      margin: 2vmin 0;
      font-size: 5vmin;
      color: var(--q-primary);
      position: relative;
      font-weight: bold;
      line-height: 1.8em;

      &::after {
        content: "";
        width: 2em;
        height: 0.2em;
        background-color: var(--q-primary);
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }

    p {
      font-size: 4vmin;
      line-height: 8vmin;
      margin: 0;
    }
  }

  .features:nth-of-type(2) {
    padding-left: 12vmin;
  }

  .P6th {
    padding-left: 6vmin;
    text-align: left;
    flex-grow: 1;

    h2 {
      font-size: 5vmin;
      margin: 0 0 3vmin;
    }

    p {
      font-size: 3vmin;
      line-height: 6vmin;
      margin: 0;
    }
  }
}
</style>
