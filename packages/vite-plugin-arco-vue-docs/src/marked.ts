import marked from 'marked';
// @ts-ignore
import { cleanUrl, escape } from 'marked/src/helpers';
import yaml from 'js-yaml';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index';
import { parse } from '@vue/compiler-sfc';
import path from 'path';
import { FileImportToken, I18nDescriptionToken } from './interface';

const languages = ['shell', 'js', 'ts', 'jsx', 'tsx', 'less', 'diff'];
loadLanguages(languages);

const frontMatter = {
  name: 'frontMatter',
  level: 'block',
  tokenizer(src: string) {
    const rule = /^```yaml\n+(.+?)\n+```(?:\n|$)/s;
    const match = rule.exec(src);
    if (match) {
      const text = match[1].trim();
      const attributes = yaml.load(text);

      return {
        type: 'frontMatter',
        raw: match[0],
        text,
        attributes,
      };
    }
    return undefined;
  },
  renderer() {
    // frontMatter不返回内用
    return '';
  },
};

const fileImport = {
  name: 'fileImport',
  level: 'block',
  tokenizer(src: string) {
    const rule = /^@import\s+(.+)(?:\n|$)/;
    const match = rule.exec(src);
    if (match) {
      const filename = match[1].trim();
      const basename = path.basename(filename, '.md');

      return {
        type: 'fileImport',
        raw: match[0],
        filename,
        basename,
      };
    }
    return undefined;
  },
  renderer(token: FileImportToken) {
    return `<demo-${token.basename} />\n`;
  },
};

const i18nDescription = {
  name: 'i18nDescription',
  level: 'block',
  tokenizer(src: string) {
    const rule = /^##\s+(zh-CN|en-US)\n+(.+?)\n+---(?:\n|$)/s;
    const match = rule.exec(src);

    if (match) {
      const text = match[2].trim();
      const content = marked(text);
      return {
        type: 'i18nDescription',
        raw: match[0],
        text,
        locale: match[1],
        content,
      };
    }
    return undefined;
  },
  renderer(token: I18nDescriptionToken) {
    return token.content;
  },
};

marked.setOptions({
  highlight(
    code: string,
    lang: string,
    callback?: (error: any, code?: string) => void
  ): string | void {
    if (lang === 'vue') {
      const { descriptor, errors } = parse(code);
      const { script, styles } = descriptor;

      let htmlContent = code;
      const hasStyle = Boolean(styles.length > 0);
      if (script?.content) {
        htmlContent = htmlContent.replace(script.content, '$script$');
      }
      if (hasStyle) {
        styles.forEach((style, index) => {
          htmlContent = htmlContent.replace(style.content, `$style-${index}$`);
        });
      }

      let highlighted = Prism.highlight(
        htmlContent,
        Prism.languages.html,
        'html'
      );
      if (script?.content) {
        const lang = script.lang ?? 'js';
        const highlightedScript = Prism.highlight(
          script.content,
          Prism.languages[lang],
          lang
        );
        highlighted = highlighted.replace('$script$', highlightedScript);
      }
      if (hasStyle) {
        styles.forEach((style, index) => {
          const lang = style.lang ?? 'css';
          const highlightedStyle = Prism.highlight(
            style.content,
            Prism.languages[lang],
            lang
          );
          highlighted = highlighted.replace(
            `$style-${index}$`,
            highlightedStyle
          );
        });
      }

      return highlighted;
    }
    if (languages.includes(lang)) {
      return Prism.highlight(code, Prism.languages[lang], lang);
    }
    return code;
  },
});

marked.use({
  breaks: true,
  xhtml: true,
  renderer: {
    heading(text: string, level: number, raw: string) {
      if (level === 2) {
        const anchor = raw.replace(/\s+/g, '-');
        return `<anchor-head level="${level}" href="${anchor}">${text}</anchor-head>`;
      }
      return `<h${level} id="${raw}">${text}</h${level}>`;
    },
    link(this: any, href, title, text) {
      href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
      if (href === null) {
        return text;
      }
      let out = `<a class="link" href="${escape(href)}"`;
      if (title) {
        if (/_blank/.test(title)) {
          out += ` target="_blank"`;
          title = title.replace('_blank', '').trim();
          if (title) {
            out += ` title="${title}"`;
          }
        } else {
          out += ` title="${title}"`;
        }
      }
      out += `>${text}</a>`;
      return out;
    },
    code(this: any, code, infostring) {
      const lang = (infostring || '').match(/\S*/)?.[0];
      if (this.options.highlight) {
        const out = this.options.highlight(code, lang);
        if (out != null && out !== code) {
          code = out;
        }
      }
      code = code.replace(/{{|}}/g, (string) => {
        if (string === '{{') {
          return '&#123;&#123;';
        }
        return '&#125;&#125;';
      });
      code = `${code.replace(/\n$/, '')}\n`;

      if (!lang) {
        return `<pre class="code-content"><code>${code}</code></pre>\n`;
      }

      return `<pre class="code-content"><code class="${this.options.langPrefix}lang">${code}</code></pre>\n`;
    },
    table(header: string, body: string) {
      return `<a-table class="component-api-table">
  <colgroup>
    <col style="min-width: 120px"/>
  </colgroup>
  <a-thead>${header}</a-thead><a-tbody>${body}</a-tbody>
</a-table>`;
    },
    tablerow(content: string): string {
      return `<a-tr>${content}</a-tr>`;
    },
    tablecell(content: string, { header, align }): string {
      if (header) {
        return `<a-th>${content}</a-th>`;
      }
      return `<a-td>${content}</a-td>`;
    },
  },
  // @ts-ignore @types/marked版本过低导致
  extensions: [i18nDescription, fileImport, frontMatter],
});

export default marked;
