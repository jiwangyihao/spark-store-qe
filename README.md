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

曾参与过或正在参与网站制作管理的人：chaodn Playhi momen 吉王义昊 时间世界 moshengrenx PossibleVing qygwhk

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
