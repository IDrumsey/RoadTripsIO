import { RectangleTextButtonManager } from './rectangle-text-button-manager';

describe('RectangleTextButtonManager', () => {
  it('should create an instance', () => {
    expect(new RectangleTextButtonManager("hello", "#fff", false, false, false, false, "#fff", "#fff")).toBeTruthy();
  });
});
