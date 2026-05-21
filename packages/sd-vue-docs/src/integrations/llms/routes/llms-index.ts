import { renderLlmsIndex } from '../core.mjs';

export async function GET({ site }: { site?: URL }) {
  const body = await renderLlmsIndex({ siteUrl: site?.toString() });

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
  });
}
