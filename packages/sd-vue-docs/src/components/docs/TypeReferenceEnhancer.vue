<script setup lang="ts">
  import { createApp, onBeforeUnmount, onMounted } from 'vue';

  import SDVue from '@sdata/web-vue';

  import TypeReferenceToken from './TypeReferenceToken.vue';

  interface TypeReferenceEntry {
    code: string;
    kind: string;
    modulePath: string;
  }

  interface TypeReferenceManifest {
    packageName: string;
    types: Record<string, TypeReferenceEntry>;
  }

  const hostClassName = 'type-reference-token-host';
  const skipSelector = `.${hostClassName}, .demo-editor, .not-content`;
  const skipTagNames = new Set(['BUTTON', 'INPUT', 'OPTION', 'SCRIPT', 'STYLE', 'TEXTAREA']);
  const mountedApps = new Map<HTMLElement, ReturnType<typeof createApp>>();
  let manifestPromise: Promise<TypeReferenceManifest> | null = null;
  let matcher: RegExp | null = null;
  let pageLoadHandler: (() => void) | null = null;

  async function fetchManifest() {
    const response = await fetch('/vendor/sd-web-vue/deps/type-reference-manifest.json');

    if (!response.ok) {
      throw new Error(`Type reference manifest load failed: ${response.status}`);
    }

    return (await response.json()) as TypeReferenceManifest;
  }

  function loadManifest() {
    if (manifestPromise) {
      return manifestPromise;
    }

    manifestPromise = fetchManifest()
      .then((manifest) => {
        configureMatcher(manifest.types ?? {});
        return manifest;
      })
      .catch((error) => {
        console.warn('[sd-vue-docs] Failed to load type references.', error);
        return {
          packageName: '@sdata/web-vue',
          types: {},
        } satisfies TypeReferenceManifest;
      });

    return manifestPromise;
  }

  function configureMatcher(types: Record<string, TypeReferenceEntry>) {
    const typeNames = Object.keys(types);

    if (typeNames.length === 0) {
      matcher = null;
      return;
    }

    const pattern = typeNames
      .toSorted((left, right) => right.length - left.length)
      .map((name) => escapeRegExp(name))
      .join('|');
    matcher = new RegExp(`(^|[^\\w$])(${pattern})(?![\\w$])`, 'g');
  }

  function escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function shouldProcessTextNode(textNode: Node) {
    const parentElement = textNode.parentElement;

    if (!parentElement || skipTagNames.has(parentElement.tagName)) {
      return false;
    }

    if (parentElement.closest(skipSelector)) {
      return false;
    }

    return Boolean(textNode.nodeValue?.trim());
  }

  function createHost(typeName: string) {
    const host = document.createElement('span');
    host.className = hostClassName;
    host.dataset.typeName = typeName;
    return host;
  }

  function replaceTextNode(textNode: ChildNode) {
    if (!matcher || !textNode.parentElement) {
      return;
    }

    const text = textNode.nodeValue ?? '';
    matcher.lastIndex = 0;

    if (!matcher.test(text)) {
      matcher.lastIndex = 0;
      return;
    }

    matcher.lastIndex = 0;
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;

    for (const match of text.matchAll(matcher)) {
      const fullMatch = match[0] ?? '';
      const prefix = match[1] ?? '';
      const typeName = match[2] ?? '';
      const matchIndex = match.index ?? 0;
      const contentStartIndex = matchIndex + prefix.length;

      if (contentStartIndex > lastIndex) {
        fragment.append(document.createTextNode(text.slice(lastIndex, contentStartIndex)));
      }

      fragment.append(createHost(typeName));
      lastIndex = matchIndex + fullMatch.length;
    }

    if (lastIndex < text.length) {
      fragment.append(document.createTextNode(text.slice(lastIndex)));
    }

    textNode.replaceWith(fragment);
  }

  function destroyDetachedApps() {
    for (const [host, app] of mountedApps.entries()) {
      if (host.isConnected) {
        continue;
      }

      app.unmount();
      mountedApps.delete(host);
    }
  }

  function mountHosts(root: Element, types: Record<string, TypeReferenceEntry>) {
    const hosts = root.querySelectorAll<HTMLElement>(
      `.${hostClassName}:not([data-type-reference-mounted])`,
    );

    for (const host of hosts) {
      const typeName = host.dataset.typeName;

      if (!typeName || !types[typeName]) {
        continue;
      }

      host.dataset.typeReferenceMounted = 'true';
      const app = createApp(TypeReferenceToken, {
        entry: types[typeName],
        typeName,
      });
      app.use(SDVue);
      app.mount(host);
      mountedApps.set(host, app);
    }
  }

  async function enhanceTypeReferences() {
    destroyDetachedApps();
    const root = document.querySelector('.sl-markdown-content');

    if (!root) {
      return;
    }

    const manifest = await loadManifest();

    if (!matcher || Object.keys(manifest.types).length === 0) {
      return;
    }

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return shouldProcessTextNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });
    const textNodes: ChildNode[] = [];

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode as ChildNode);
    }

    for (const textNode of textNodes) {
      replaceTextNode(textNode);
    }

    mountHosts(root, manifest.types);
  }

  onMounted(() => {
    void enhanceTypeReferences();
    pageLoadHandler = () => {
      void enhanceTypeReferences();
    };
    document.addEventListener('astro:page-load', pageLoadHandler);
  });

  onBeforeUnmount(() => {
    if (pageLoadHandler) {
      document.removeEventListener('astro:page-load', pageLoadHandler);
    }

    for (const app of mountedApps.values()) {
      app.unmount();
    }
    mountedApps.clear();
  });
</script>

<template></template>
