import axios from 'axios';

// @ts-ignore
const isProduction = import.meta.env.PROD;

export async function checkLogin() {
  if (!isProduction) {
    window.isLogin = true;
    window.user = {
      email: 'xiaoming@bytedance.com',
      nickname: '小明',
      picture:
        'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/fbbdefc1702398f2f394c57270f7f727.png~tplv-uwbnlip3yd-png.png',
      username: 'xiaoming',
    };
  } else {
    if (!window.isLogin) {
      try {
        const { data } = await axios.get('/common/api/auth/userInfo', {
          withCredentials: true,
        });
        window.isLogin = true;
        window.user = data.result;
      } catch {
        window.isLogin = false;
      }
    }
    try {
      const appId = /arco\.design/.test(window.location.href) ? 4374 : 263440;

      window.collectEvent('init', {
        app_id: appId,
        channel: 'cn',
      });
      window.collectEvent('config', {
        evtParams: {
          site: 'ArcoDesignVue',
        },
      });
      window.collectEvent('start');
    } catch {}
  }
}
