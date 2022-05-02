# Spark Store QE

这是星火应用商店官网的开发分支.

## 链接地址

- [正式渠道](https://www.spark-app.store/)

- [实时构建（Vercel）](https://spark.jwyihao.top/)

- [实时构建（Github Pages）](https://jiwangyihao.github.io/spark-store-qe/)

- [延后构建（Gitee Pages）](https://jwyh.gitee.io/spark-store-qe/)

## 团队介绍

由深度科技论坛（bbs.deepin.org） shenmo 发起的星火工作组致力于丰富 Linux 生态， 取“星星之火，可以燎原”之意，组建了星火应用商店。 我们是个年轻的团队，大部分成员是 00 后，有小学生，中学生，大学生，来自五湖四海。 尽管我们年龄不同，资历不同，但是我们努力建设 Linux 生态的目标是相同的， 我们有信心、也有勇气做到这些！如果你与我们志同道合，欢迎加入我们！

网站制作管理：chaodn Playhi momen jiwangyihao 时间世界 moshengrenx

UI 概念设计师：PossibleVing qygwhk

## 加入我们

### 软件维护员

- 职位描述

  - 能力要求：会使用 deepin V20 或其它 Linux 发行版，会打字，会上网，会下载 Linux 软件包，有责任心，有电脑；

  - 职责：搜集软件，打包软件。维护者可以不是开发者，但必须有认真负责的态度。若不能继续维护，请在星火钉钉/QQ 群通知管理员；

  - 投递须知：[https://deepin-community-store.gitee.io/spark-wiki/#/Submit/Submit](https://deepin-community-store.gitee.io/spark-wiki/#/Submit/Submit)。

### 联系方式

- QQ 群：872690351

## 温馨提示

- `clone` 的时候如果速度太慢或者内容太多，一般情况下可以利用 `--depth=1`。

---

## GitHub Action 构建说明

1. 在[GitHub](https://github.com/jiwangyihao/spark-store-qe)上 Fork 本仓库
2. 将更改推送至你 Fork 的仓库
3. 在 Action/SPA Build 中查看并下载构建

---

## 本地构建说明

### 环境准备

1. 安装 nvm（这是直到 2022/4/15 时的最新版本，参见[nvm 项目安装说明](https://github.com/nvm-sh/nvm#installing-and-updating)）

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
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
   yarn
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

---

#### 于 2022/4/13 增加的内容：

**！注意：没有其他问题的情况下仍然建议使用上述步骤配置环境**

#### 下载 nodejs 12.22.1

​ 解压后，添加临时环境变量 语法`export PATH=路径:$PATH`

export PATH=/home/momen/node-v12.22.1-linux-x64/bin:$PATH

`请使用绝对路径`

检查 node -v 是否可用

#### 安装 yarn

`yarn global add @quasar/cli`

```bash
....

 .d88888b.
d88P" "Y88b
888     888
888     888 888  888  8888b.  .d8888b   8888b.  888d888
888     888 888  888     "88b 88K          "88b 888P"
888 Y8b 888 888  888 .d888888 "Y8888b. .d888888 888
Y88b.Y8b88P Y88b 888 888  888      X88 888  888 888
 "Y888888"   "Y88888 "Y888888  88888P' "Y888888 888
       Y8b


 Quasar • ⚠  Error. This command must NOT be executed inside of a Quasar project folder.

error Command failed.
Exit code: 1
Command: /home/momen/.yarn/bin/create-quasar
Arguments:
Directory: /home/momen/Desktop/web-new/website
Output:

info Visit https://yarnpkg.com/en/docs/cli/create for documentation about this command.

```

重点：Command 为 quasar 路径，加在临时环境变量中

`export PATH=/home/momen/.yarn/bin:$PATH`

#### 生成 quasar

进入网页根目录 `quasar build`
