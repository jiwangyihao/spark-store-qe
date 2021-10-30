<template>
  <q-page class="flex flex-start downpage">
    <q-img
      src="../assets/img/download/download_1.png"
      spinner-color="white"
      height="56vh"
      style="position: absolute; top: 0; z-index:-1;"
      :img-style="{transform: 'scale(1.1)', filter: 'blur(1vmin)'}"
    />
    <h1>下载</h1>
    <h2>DOWNLOADS</h2>
    <div class="row" style="width: 76vw">
      <div class="row" style="flex-grow:1;padding:4vmin">
        <div class="row downcard">
          <q-avatar size="9vmin">
            <img src="../assets/img/download/download_2.png">
          </q-avatar>
          <div class="row" style="flex-direction:column; align-items: flex-start;margin-left:2vmin">
            <h3>软件本体</h3>
            <div class="row">
              <q-btn
                color="primary"
                text-color="white"
                to="/download"
                style="padding: 0 3vmin;"
                dense
                rounded
                unelevated
              >
                点击下载
              </q-btn>
              <span>最新版本 3.0.2</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="flex-grow:1;padding:4vmin">
        <div class="row downcard">
          <q-avatar size="9vmin">
            <img src="../assets/img/download/download_3.png">
          </q-avatar>
          <div class="row" style="flex-direction:column; align-items: flex-start;margin-left:2vmin">
            <h3>依赖包</h3>
            <div class="row">
              <q-btn
                color="primary"
                text-color="white"
                to="/download"
                style="padding: 0 3vmin;"
                dense
                rounded
                unelevated
              >
                点击下载
              </q-btn>
              <span>最新版本 3.0.2</span>
            </div>
          </div>
        </div>
      </div>
      <q-timeline color="primary" layout="comfortable">
        <q-timeline-entry
          v-for="v,k in updateHistory"
          :key="k"
          :title="v.version"
          :subtitle="v.time"
        >
          <div>
            <ul style="padding-inline-start: 0;">
              <li v-for="t,key in v.details" :key="key">{{t}}</li>
            </ul>
          </div>
        </q-timeline-entry>
      </q-timeline>
    </div>
  </q-page>
</template>

<script>
import { useMeta } from 'quasar'

export default {
  name: 'PageIndex',
  data: () => {
    return {
      updateHistory: [
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
    }
  },
  setup () {
    // needs to be called in setup()
    useMeta({
      title: '下载',
      // 可选的; 将最终标题设置为“Index Page - My Website”，对于多级meta有用
      titleTemplate: title => `${title} - 星火应用商店`,
    })
  }
}
</script>
