// @ts-ignore
import React from 'react';
// @ts-ignore
import ReactDOM from 'react-dom';
import Navbar from '@arco-materials/site-navbar-new';
import { ConfigProvider } from '@arco-design/web-react';
import './index.less';
import './navbar.css';

interface NavBarOptions {
  version?: string;
  lang?: string;
  handleLanguageChange?: (lang: string) => void;
}

const siteBase = '/arco-design-vue/';

const ReactApp = ({
  lang = 'zh-CN',
  handleLanguageChange = () => {},
  version,
}: NavBarOptions) => {
  return (
    <ConfigProvider prefixCls={'arco-react'}>
      {/* @ts-ignore site-navbar types omit ThemeProvider */}
      <Navbar.NavbarThemeProvider>
        <Navbar
          lang={lang}
          onChangeLanguage={handleLanguageChange}
          algoliaTag="vue"
          defaultVersion={version}
          onChangeTheme={(theme: string) => {
            document
              .querySelector('#react-root')
              ?.setAttribute('arco-theme', theme);
          }}
          hideRtl
          hideUser
          hideSearch
          logoHref={siteBase}
          versions={[{ version, link: siteBase }]}
          // Relative hrefs break on GitHub Pages; keep official Arco Design destinations.
          tabs={[
            {
              title: '设计',
              enTitle: 'Design',
              href: 'https://arco.design/docs/spec/introduce',
              dropdown: true,
            },
            {
              title: '开发',
              enTitle: 'Development',
              href: 'https://arco.design/vue/docs/start',
              dropdown: true,
            },
            {
              title: '生态产品',
              enTitle: 'Ecosystem',
              dropdown: true,
            },
          ]}
        />
      </Navbar.NavbarThemeProvider>
    </ConfigProvider>
  );
};

const renderNavBar = (options?: NavBarOptions) => {
  ReactDOM.render(
    <ReactApp {...(options ?? {})} />,
    document.getElementById('react-root')
  );
};
export default renderNavBar;
