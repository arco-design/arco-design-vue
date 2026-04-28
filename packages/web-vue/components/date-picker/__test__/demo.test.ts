import demoTest from '../../../scripts/demo-test';

const mockNow = vi
  .spyOn(Date, 'now')
  .mockReturnValue(new Date('2026-04-16T00:00:00').getTime());

afterAll(() => {
  mockNow.mockRestore();
});

demoTest('date-picker');
