import { ButtonManager } from './button-manager';

describe('ButtonManager', () => {
  it('should create an instance', () => {
    expect(new ButtonManager("#fff", false, true, false, true)).toBeTruthy();
  });
});
