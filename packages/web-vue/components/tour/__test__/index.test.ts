import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';

import { afterEach, describe, expect, test, vi } from 'vitest';

import type { TourStep } from '../types';

import Tour from '../index';

const steps: TourStep[] = [
  {
    element: '#tour-step-a',
    popover: {
      title: '步骤一',
      description: '内容一',
    },
  },
  {
    element: '#tour-step-b',
    popover: {
      title: '步骤二',
      description: '内容二',
    },
  },
];

const flushTour = async () => {
  await nextTick();
  await Promise.resolve();
  await nextTick();
};

describe('Tour', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.body.className = '';
  });

  test('should use localized button text and keep default button actions', async () => {
    mount(Tour, {
      attachTo: document.body,
      props: {
        defaultVisible: true,
        steps,
      },
      slots: {
        default:
          '<div><button id="tour-step-a">A</button><button id="tour-step-b">B</button></div>',
      },
    });

    await flushTour();

    const nextButton = document.body.querySelector<HTMLButtonElement>('.sd-tour-popover-next-btn');
    expect(nextButton?.textContent).toContain('下一步');

    nextButton?.click();
    await flushTour();

    expect(document.body.querySelector('.sd-tour-popover-title')?.textContent).toContain('步骤二');
    expect(
      document.body.querySelector<HTMLButtonElement>('.sd-tour-popover-prev-btn')?.textContent,
    ).toContain('上一步');
    expect(
      document.body.querySelector<HTMLButtonElement>('.sd-tour-popover-next-btn')?.textContent,
    ).toContain('完成');

    document.body.querySelector<HTMLButtonElement>('.sd-tour-popover-prev-btn')?.click();
    await flushTour();

    expect(document.body.querySelector('.sd-tour-popover-title')?.textContent).toContain('步骤一');

    document.body.querySelector<HTMLButtonElement>('.sd-tour-popover-close-btn')?.click();
    await flushTour();

    expect(document.body.querySelector('.sd-tour-popover')).toBeNull();
  });

  test('should create tour controller and start from default state', async () => {
    mount(Tour, {
      attachTo: document.body,
      props: {
        defaultVisible: true,
        defaultCurrent: 1,
        steps,
      },
      slots: {
        default:
          '<div><button id="tour-step-a">A</button><button id="tour-step-b">B</button></div>',
      },
    });

    await flushTour();

    expect(document.body.querySelector('.sd-tour-popover')).not.toBeNull();
    expect(document.body.querySelector('.sd-tour-popover-title')?.textContent).toContain('步骤二');
    expect(document.body.querySelector<HTMLElement>('.sd-tour-overlay')?.style.zIndex).toBe('1000');
    expect(document.body.querySelector<HTMLElement>('.sd-tour-popover')?.style.zIndex).toBe('1001');
  });

  test('should react to controlled current changes', async () => {
    const wrapper = mount(Tour, {
      attachTo: document.body,
      props: {
        visible: true,
        current: 0,
        steps,
      },
      slots: {
        default:
          '<div><button id="tour-step-a">A</button><button id="tour-step-b">B</button></div>',
      },
    });

    const stepA = document.body.querySelector<HTMLElement>('#tour-step-a');
    const stepB = document.body.querySelector<HTMLElement>('#tour-step-b');

    expect(stepA).not.toBeNull();
    expect(stepB).not.toBeNull();

    if (stepA) {
      stepA.getBoundingClientRect = vi.fn(() => new DOMRect(10, 20, 80, 32));
    }

    if (stepB) {
      stepB.getBoundingClientRect = vi.fn(() => new DOMRect(140, 90, 120, 56));
    }

    await flushTour();

    const firstOverlayPath = document.body
      .querySelector('svg.sd-tour-overlay path')
      ?.getAttribute('d');

    await wrapper.setProps({ current: 1 });
    await flushTour();

    expect(document.body.querySelector('.sd-tour-popover-title')?.textContent).toContain('步骤二');
    expect(document.body.querySelector('svg.sd-tour-overlay path')?.getAttribute('d')).not.toBe(
      firstOverlayPath,
    );
  });

  test('should preserve user hooks and emit close', async () => {
    const wrapper = mount(Tour, {
      attachTo: document.body,
      props: {
        defaultVisible: true,
        steps,
        zIndex: 3200,
        showProgress: true,
        allowClose: false,
      },
      slots: {
        default:
          '<div><button id="tour-step-a">A</button><button id="tour-step-b">B</button></div>',
      },
    });

    await flushTour();

    const controller = (
      wrapper.vm as unknown as {
        getController: () => {
          destroy: () => void;
          getConfig: () => { showProgress?: boolean; allowClose?: boolean };
        } | null;
      }
    ).getController();

    expect(controller?.getConfig().showProgress).toBe(true);
    expect(controller?.getConfig().allowClose).toBe(false);
    expect(document.body.querySelector<HTMLElement>('.sd-tour-popover')?.style.zIndex).toBe('3201');

    await wrapper.setProps({ zIndex: 4200 });
    await flushTour();

    expect(document.body.querySelector<HTMLElement>('.sd-tour-popover')?.style.zIndex).toBe('4201');

    controller?.destroy();
    await flushTour();

    expect(document.body.querySelector('.sd-tour-popover')).toBeNull();
  });

  test('should render custom title and description slots with sd button props', async () => {
    mount(Tour, {
      attachTo: document.body,
      props: {
        defaultVisible: true,
        steps,
        buttonProps: {
          previous: { type: 'outline' },
          next: { status: 'danger' },
          close: { type: 'text' },
        },
      },
      slots: {
        default:
          '<div><button id="tour-step-a">A</button><button id="tour-step-b">B</button></div>',
        title: ({ current, title }) => {
          return h('div', { class: 'tour-title-slot' }, `${title}-${(current ?? 0) + 1}`);
        },
        description: ({ current, description }) => {
          return h('div', { class: 'tour-description-slot' }, [
            h('span', `${description}-${(current ?? 0) + 1}`),
            h('table', { class: 'tour-description-table' }, [
              h('tbody', [
                h('tr', [h('td', 'A'), h('td', 'B')]),
                h('tr', [h('td', 'C'), h('td', 'D')]),
              ]),
            ]),
          ]);
        },
      },
    });

    await flushTour();

    expect(document.body.querySelector('.tour-title-slot')?.textContent).toContain('步骤一-1');
    expect(document.body.querySelector('.tour-description-slot')?.textContent).toContain(
      '内容一-1',
    );
    expect(document.body.querySelector('.tour-description-table')).not.toBeNull();

    const nextButton = document.body.querySelector<HTMLButtonElement>('.sd-tour-popover-next-btn');
    const previousButton = document.body.querySelector<HTMLButtonElement>(
      '.sd-tour-popover-prev-btn',
    );
    const closeButton = document.body.querySelector<HTMLButtonElement>(
      '.sd-tour-popover-close-btn',
    );

    expect(nextButton?.className).toContain('sd-btn');
    expect(nextButton?.className).toContain('sd-btn-status-danger');
    expect(previousButton?.className).toContain('sd-btn-outline');
    expect(closeButton?.className).toContain('sd-btn-text');
  });

  test('should render overlay with explicit hollow fill rule', async () => {
    mount(Tour, {
      attachTo: document.body,
      props: {
        defaultVisible: true,
        steps,
      },
      slots: {
        default:
          '<div><button id="tour-step-a">A</button><button id="tour-step-b">B</button></div>',
      },
    });

    await flushTour();

    const overlay = document.body.querySelector<SVGSVGElement>('.sd-tour-overlay');
    const overlayPath = overlay?.querySelector<SVGPathElement>('path');

    expect(overlay?.getAttribute('fill-rule')).toBe('evenodd');
    expect(overlay?.getAttribute('clip-rule')).toBe('evenodd');
    expect(overlayPath?.getAttribute('fill-rule')).toBe('evenodd');
    expect(overlayPath?.getAttribute('clip-rule')).toBe('evenodd');
    expect(overlayPath?.getAttribute('d')).toContain('Z M');
  });
});
