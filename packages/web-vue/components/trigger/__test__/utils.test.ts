import { getElementScrollRect } from '../utils';

describe('trigger utils', () => {
  test('getElementScrollRect tolerates a null element', () => {
    const containerRect = {
      top: 0,
      left: 0,
      bottom: 100,
      right: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect;

    expect(() => getElementScrollRect(null, containerRect)).not.toThrow();
    expect(getElementScrollRect(null, containerRect)).toEqual({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      scrollTop: 0,
      scrollBottom: 0,
      scrollLeft: 0,
      scrollRight: 0,
      width: 0,
      height: 0,
    });
  });
});
