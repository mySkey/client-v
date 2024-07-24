# client-v

## 介绍

前端版本号检测插件，不需要接口支持，所以一般用于前端版本检测。

- 有版本更新时提示 Modal 框，可以轮询调用 `getRemoteVersion` 和 `getClientVersion` 来对比版本号，如果版本号不一致，则提示 Modal 框，让用户选择是否更新。

- 有新版本时，切换页面，文件是 hash，有的文件会不存在，所以可以在切换时强刷到新的页面，在路由变化前使用`authFrontVersion`或`throttleAuthFrontVersion` 来检测版本号，如果不一致，插件会自动强刷到新页面。

- 一般开发环境不需要，可以根据环境判断函数是否需要调用

## 说明

插件会生成一个当前时间的 `client_c_version.json` 文件放到配置的目录（一般就是我们的打包`dist`），然后在路由 change 时对比客户端的版本号和服务器上最新的文件中的版本号，如果版本号不一致，则会强刷将要去的页面。

## 安装

```
npm install -S client-v
```

## 打包命令

在 `build` 命令后添加 `client-v -d dist`

```json
{
  "scripts": {
    "build": "max build && client-v -d dist"
  }
}
```

或者在 `build` 的 `hooks` 中添加

```json
{
  "scripts": {
    "build": "max build",
    "postbuild": "client-v -d dist"
  }
}
```

## Vue 在路由切换时加入检测代码

```js
/** 节流1s检测 */
import { throttleAuthFrontVersion } from 'client-v';
/** 直接检测 */
import { authFrontVersion } from 'client-v';

function beforeRouter(to, from, next) {
  throttleAuthFrontVersion(to);
}

router.beforeEach(beforeRouter);
```

## React 在路由切换时加入检测代码

```js
/** 节流1s检测 */
import { throttleAuthFrontVersion } from 'client-v';
/** 直接检测 */
import { authFrontVersion } from 'client-v';

export function onRouteChange({ location }) {
  throttleAuthFrontVersion(location);
}
```

### 导出的函数

| 参数                     | 说明                   | 类型      | 默认值 | 版本 |
| ------------------------ | ---------------------- | --------- | ------ | ---- |
| getRemoteVersion         | 获取远程版本号         | Functioin | -      | -    |
| getClientVersion         | 获取本地版本号         | Functioin | -      | -    |
| authFrontVersion         | 立即检测版本号是否一致 | Functioin | -      | -    |
| throttleAuthFrontVersion | 节流检测版本号是否一致 | Functioin | -      | -    |

## LICENSE

MIT
