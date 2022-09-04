import { testMe } from './exampleTest';

describe('testMe', () => {
  it('should display return someValue', () => {
    const someTestValue = testMe();
    expect(someTestValue).toBe('someValue');
  });
});
