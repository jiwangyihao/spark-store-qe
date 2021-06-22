<template>
  <q-page class="flex flex-center" style="align-items:flex-start">
    <transition-group
      enter-active-class="animated backInRight"
      enter-leave-class="animated backOutLeft"
    >
      <div v-show="module=='about'" class="row aboutpage" key="about">
        <q-img
          src="../assets/img/about/about_1.png"
          spinner-color="white"
          class="bgPic"
        />
        <div class="row">
          <h1>关于</h1>
          <h2>ABOUT US</h2>
        </div>
        <div class="row">
          <p>由深度科技论坛（bbs.deepin.org）大佬 shenmo 发起的星火工作组致力于丰富 Linux 生态，</p>
          <p>取“星星之火，可以燎原”之意，组建了星火应用商店。</p>
          <p>我们是个年轻的团队，大部分成员是 00 后，有小学生，中学生，大学生，来自五湖四海。</p>
          <p>尽管我们年龄不同，资历不同，但是我们努力建设 Linux 生态的目标是相同的，</p>
          <p>我们有信心、也有勇气做到这些！</p>
          <p></p>
          <p>如果你与我们志同道合，欢迎加入我们！</p>
        </div>
        <q-btn
          color="white"
          text-color="rgb(61,49,56)"
          style="padding: 0 3vmin; font-weight:bold"
          @click="goWanted"
          rounded
        >
          招贤纳士 > 
        </q-btn>
      </div>
      <div v-show="module=='wanted'" class="row wantedpage" key="wanted">
        <q-img
          src="../assets/img/about/about_2.png"
          spinner-color="white"
          height="56vh"
          style="position: absolute; top: 0; left: 0; z-index:-1;"
          :img-style="{filter: 'brightness(0.7)'}"
        />
        <div class="row title">
          <h1>招贤纳士</h1>
          <h2>WE WANT YOU</h2>
        </div>
        <div class="row method">
          联系方式：872690351<span style="color: rgb(132,128,126)">（QQ 群）</span>
        </div>
        <div class="row jobcard">
          <h4>软件维护员</h4>
          <p><strong>年龄：</strong>不限</p>
          <p><strong>性别：</strong>不限</p>
          <p><strong>工作地点：</strong>地球</p>
          <p><strong>学历要求：</strong>小学及以上</p>
          <p><strong>能力要求：</strong>会使用 deepin V20 或其它 Linux 发行版，会打字，会上网，会下载 Linux 软件包，有责任心，有电脑；</p>
          <p><strong>职责：</strong>搜集软件，打包软件。维护者可以不是开发者，但必须有认真负责的态度，对于自己维护的软件包应当维护到底。若不能维护，请在软件标题写明“已停止维护”并通知站长或其他开发者，以便于找人接手。</p>
          <p><strong>投递须知：</strong><a href="http://www.shenmo.tech:420/?p=193">http://www.shenmo.tech:420/?p=193</a></p>
        </div>
      </div>
    </transition-group>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data: () => {
    return {
      module: "about"
    }
  },
  methods: {
    goWanted: function() {
      this.module="wanted"
    }
  }
}
</script>
