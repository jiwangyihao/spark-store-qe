# Spark Store QE

星火应用商店官网，使用 Vue3 + Quasar 开发。

## 链接地址

- [正式渠道](https://www.spark-app.store/)

- [实时构建（Vercel）](https://spark.jwyihao.top/)

- [实时构建（Github Pages）](https://jiwangyihao.github.io/spark-store-qe/)

- [实时构建（Gitee Pages）](https://deepin-community-store.gitee.io/spark-store-qe/)

## 项目历程

星火应用商店的官网最初由 @chaodn 和 @Playhi 搭建，后由 @吉王义昊 使用 Quasar 和 Vue3 以 @PossibleVing 的设计稿为蓝本重新构建。现在主要开发工作由 @吉王义昊 负责，日常运维由 @shenmo 和 @momen 完成。

现在的开发目标是进一步完善 web 商店和进行对应用投递及审核的整合（开发者中心的构建）。

曾参与过或正在参与网站制作管理的人：chaodn Playhi momen 吉王义昊 时间世界 moshengrenx PossibleVing qygwhk shenmo

## 参与协作

### 简介

本项目托管于 [Gitee](https://gitee.com/deepin-community-store/spark-store-qe) 和 [GitHub](https://github.com/jiwangyihao/spark-store-qe) 上，你可以提交 PR 来帮助我们的开发！（两个仓库配置了自动同步，向两个仓库中的任一提交均可）

### 分支介绍

仓库中 `master` 分支是主分支；`gh-pages` 分支是 GitHub Pages 和 Gitee Pages 使用的，由 GitHub Action 自动构建；`old` 分支是早期开发的记录，仅用作留档。

### 目录介绍

- `.github` GitHub Action 的 Workflow 配置；
- `.workflow` Gitee 自动构建的配置；
- `public` 公开访问目录，仅用于存放网站图标；
- `src` 源文件夹；
  - `assets` 资源文件夹；
  - `boot` 插件，其中 `api.ts` 是网络请求相关的 API；
  - `components` 组件；
  - `css` 通用样式表，使用 SCSS 编写；
  - `i18n` 多语言配置（未实装）；
  - `layouts` 布局；
  - `pages` 页面，包含各个页面的主要代码；
  - `router` 路由，官网中静态的外部地址（下载地址）也在这里配置；
  - `stores` 基于 Pinia 的状态管理（暂时用处不大）；
  - `App.vue` Vue 应用入口（基本没有实际内容）；
- `src-electron` Electron 源文件夹（目前处于搁置状态）；
- `ghpage_quasar.config.js` Quasar 配置文件（For GitHub Pages 和 Gitee Pages）；
- `quasar.config.js` Quasar 配置文件；
- `vercel.json` 用于 Vercel 构建的配置。

### 代码规范

- 变量命名遵循基本规范（小驼峰和语义化）；
- 尽量提供注释；
- 提交前必须使用 `Prettier` 格式化代码（命令见构建说明）；
- 提交信息尽量遵循[更新日志规则](https://deepin-community-store.gitee.io/spark-wiki/#/Dev/Spark-Store-Git-Repo?id=%e6%9b%b4%e6%96%b0%e6%97%a5%e5%bf%97%e8%a7%84%e5%88%99)。

---

## GitHub Action 构建说明

1. 在 [GitHub](https://github.com/jiwangyihao/spark-store-qe) 上 Fork 本仓库
2. 将更改推送至你 Fork 的仓库
3. 在 Action/SPA Build 中查看并下载构建

---

## 本地构建说明

### 环境准备

1. 安装 nvm（这是直到 2023/7/16 时的最新版本，参见[nvm 项目安装说明](https://github.com/nvm-sh/nvm#installing-and-updating)）

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
   ```

   执行`command -v nvm`检查安装

2. 安装 Node.js

   ```bash
   nvm install --lts
   ```

3. 安装 Yarn

   ```bash
   corepack enable
   ```

   **！注意：如果你正在使用<16.10 的 Node.js（如果始终按照上述提示操作请略过此提示），应当使用`npm i -g corepack`安装 Yarn**

4. 安装 Quasar CLI

   ```bash
   yarn global add @quasar/cli
   ```

5. 安装依赖
   ```bash
   yarn install
   ```

### 调试编译

- 本地服务器调试

  ```bash
  quasar dev
  ```

- 构建用于生产的版本

  ```bash
  quasar build
  ```

  构建的文件位于路径`/dist/spa`中

- 使用 Lint 检查代码

  ```bash
  yarn lint
  # or
  npm run lint
  ```

- 格式化代码
  ```bash
  yarn format
  # or
  npm run format
  ```
