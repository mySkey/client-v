/**
 * @description: Client存储key
 * @author: mysden
 */
export const CLIENT_STORAGE_KEY = 'Client-Version';

/**
 * @description: 获取远程版本号
 * @author: mysden
 */
export const getRemoteVersion = async () => {
  const response = await fetch('/client_v_version.json', {
    method: 'get',
    headers: { 'Cache-Control': 'no-cache' },
  });
  const res = await response?.json();
  return res?.version;
};

/**
 * @description: 获取本地版本号
 * @author: mysden
 */
export const getClientVersion = () => {
  return localStorage.getItem(CLIENT_STORAGE_KEY);
};

/**
 * @description: 检验前端版本是否变动
 * @author: mysden
 * @param {*} location 将要前往的location
 */
export async function authFrontVersion(location) {
  const href = location?.href || location.pathname + location.search;
  // 开发环境不校验版本
  const excluedeModes: string[] = ['development'];
  const mode = process.env.REACT_APP_BUILD_ENV;
  if (excluedeModes?.includes(mode || '')) return;
  // 校验部署版本变动
  const version = await getRemoteVersion();

  // 获取服务端版本
  window.client_v_remoteVersion = version;
  // 获取本地版本
  window.client_v_clientVersion =
    localStorage.getItem(CLIENT_STORAGE_KEY) || '';

  // 检测到版本不一致，在路由变化时强刷页面
  if (window.client_v_clientVersion !== window.client_v_remoteVersion) {
    localStorage.setItem(CLIENT_STORAGE_KEY, client_v_remoteVersion);
    window.location.assign(href);
  }
}

/**
 * @description: 节流
 * @author: mysden
 */
export function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    // @ts-ignore
    return func.apply(this, args);
  };
}

/**
 * @description: 节流同步版本
 * @author: mysden
 */
export const throttleAuthFrontVersion = throttle(authFrontVersion, 1000);
