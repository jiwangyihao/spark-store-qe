# Spark Store (spark-store)

Both The App and the website of spark store.

## Install the dependencies
```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
yarn run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://v2.quasar.dev/quasar-cli/quasar-conf-js).

---

##### 2022/4/13增加了内容：

##### 下载nodejs 12.22.1

​	解压后，添加临时环境变量 语法`export    PATH=路径:$PATH`

export PATH=/home/momen/node-v12.22.1-linux-x64/bin:$PATH

`请使用绝对路径`

检查node -v 是否可用

##### 安装yarn

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

重点：Command为quasar路径，加在临时环境变量中

`export PATH=/home/momen/.yarn/bin:$PATH`



##### 生成quasar

进入网页根目录 `quasar build`
