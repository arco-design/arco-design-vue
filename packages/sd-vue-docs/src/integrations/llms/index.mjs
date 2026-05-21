import { fileURLToPath } from 'node:url';

const llmsIndexEntrypoint = fileURLToPath(new URL('./routes/llms-index.ts', import.meta.url));
const llmsFullEntrypoint = fileURLToPath(new URL('./routes/llms-full.ts', import.meta.url));
const llmsComponentEntrypoint = fileURLToPath(
  new URL('./routes/llms-component.ts', import.meta.url),
);

export function sdDocsLlmsIntegration() {
  return {
    name: 'sd-design-llms',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({
          entrypoint: llmsIndexEntrypoint,
          pattern: '/llms/llms.txt',
          prerender: true,
        });
        injectRoute({
          entrypoint: llmsFullEntrypoint,
          pattern: '/llms/llms-full.txt',
          prerender: true,
        });
        injectRoute({
          entrypoint: llmsComponentEntrypoint,
          pattern: '/llms/components/[slug].md',
          prerender: true,
        });
      },
    },
  };
}
