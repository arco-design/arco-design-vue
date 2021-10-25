const CSS_EXTERNAL = [
  'https://unpkg.com/@arco-design/web-vue@2.x/dist/arco.css',
];
const JS_EXTERNAL = [
  'https://unpkg.com/vue@3.x/dist/vue.global.prod.js',
  'https://unpkg.com/dayjs@1.x/dayjs.min.js',
  'https://unpkg.com/@arco-design/web-vue@2.x/dist/arco-vue.min.js',
  'https://unpkg.com/@arco-design/web-vue@2.x/dist/arco-vue-icon.min.js',
];

const parseContent = (content: string) => {
  const htmlContent = content.match(/<template>(.*)<\/template>/s)?.[1] ?? '';
  let jsContent = content.match(/<script.*?>(.*)<\/script>/s)?.[1] ?? '';
  let css = content.match(/<style.*?>(.*)<\/style>/s)?.[1] ?? '';

  jsContent = jsContent
    .replace(/import (.*?) from '(.*?)'/gs, (match, p1, p2) => {
      switch (p2) {
        case 'vue':
          p2 = 'window.Vue';
          break;
        case '@arco-design/web-vue':
          p2 = 'window.ArcoVue';
          break;
        case '@arco-design/web-vue/es/icon':
          p2 = 'window.ArcoVueIcon';
          break;
        default:
      }
      return `const ${p1} = ${p2}`;
    })
    .replace(/export default (.*)/s, 'const Main = $1');

  const html = `<div id="root" style="padding: 20px;">${htmlContent}</div>\n`;
  const js = `${
    jsContent || 'const Main = {};'
  }\nconst app = Vue.createApp(Main);\napp.use(window.ArcoVue);\napp.use(window.ArcoVueIcon);\napp.mount('#root');`;

  css = css.replace(/:deep\((.+?)\)/g, (_, p1) => p1);

  return {
    html,
    js,
    css,
  };
};

const post = (data) => {
  const form = document.createElement('form');
  form.action = 'https://codepen.io/pen/define';
  form.target = '_blank';
  form.method = 'POST';
  form.style.display = 'none';
  const field = document.createElement('input');
  field.name = 'data';
  field.type = 'hidden';
  field.setAttribute(
    'value',
    JSON.stringify(data).replace(/"/g, '&quot;').replace(/'/g, '&apos;')
  );
  form.appendChild(field);
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

export const gotoCodepen = (content: string) => {
  const { html, js, css } = parseContent(content);

  const data = {
    title: 'Arco Vue Code Pen',
    html,
    js,
    css,
    js_pre_processor: 'typescript',
    css_external: CSS_EXTERNAL.join(';'),
    js_external: JS_EXTERNAL.join(';'),
    editors: '001',
  };

  post(data);
};
