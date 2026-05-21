import { getLlmsCatalog, renderComponentMarkdown } from '../core.mjs';

export async function getStaticPaths() {
  const catalog = await getLlmsCatalog();

  return catalog.components.map((component) => ({
    params: {
      slug: component.llmsSlug,
    },
  }));
}

export async function GET({ params, site }: { params: { slug?: string }; site?: URL }) {
  if (!params.slug) {
    return new Response('Missing component slug.', { status: 400 });
  }

  const body = await renderComponentMarkdown(params.slug, { siteUrl: site?.toString() });

  if (!body) {
    return new Response('Component not found.', { status: 404 });
  }

  return new Response(body, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
    },
  });
}
