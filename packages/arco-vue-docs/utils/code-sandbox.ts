import { getParameters } from 'codesandbox/lib/api/define';
import { mainContent, styleContent } from './code-template';

const babelContent = `module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
`;

const sendPost = (parameters: string) => {
  const form = document.createElement('form');
  form.action = 'https://codesandbox.io/api/v1/sandboxes/define';
  form.target = '_blank';
  form.method = 'POST';
  form.style.display = 'none';
  const field = document.createElement('input');
  field.name = 'parameters';
  field.type = 'hidden';
  field.value = parameters;
  form.appendChild(field);
  const query = document.createElement('input');
  query.name = 'query';
  query.type = 'hidden';
  query.value = 'file=/src/App.vue';
  form.appendChild(query);
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

export const openCodeSandbox = (content: string) => {
  const parameters = getParameters({
    files: {
      'package.json': {
        // @ts-ignore
        content: {
          dependencies: {
            'vue': '^3.2.0',
            'dayjs': '^1.0',
            '@arco-design/web-vue': 'latest',
          },
          devDependencies: {
            '@vue/cli-plugin-babel': '^5.0',
            '@vue/cli-service': '^5.0',
            '@vue/compiler-sfc': '^3.2.0',
          },
        },
      },
      // @ts-ignore
      'babel.config.js': {
        content: babelContent,
      },
      // @ts-ignore
      'src/style.css': {
        content: styleContent,
      },
      // @ts-ignore
      'src/main.js': {
        content: mainContent,
      },
      // @ts-ignore
      'src/App.vue': {
        content,
      },
    },
  });

  sendPost(parameters);
};
