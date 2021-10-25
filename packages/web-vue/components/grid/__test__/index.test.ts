import { mount } from '@vue/test-utils';
import Grid from '../index';

const { Row, Col } = Grid;

const _matchMedia = window.matchMedia;
describe('Grid', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  afterAll(() => {
    window.matchMedia = _matchMedia;
  });

  test('Should render Col correctly', () => {
    const wrapper = mount(Row, {
      slots: {
        default: [Col, Col, Col],
      },
    });
    const cols = wrapper.findAll('.arco-col');
    expect(cols).toHaveLength(3);
  });

  test('Should render text correctly', () => {
    const wrapper = mount(Col, {
      slots: {
        default: `<div class='text'>abc</div>`,
      },
    });
    const textElement = wrapper.find('.text');
    expect(textElement.text()).toContain('abc');
  });
});
