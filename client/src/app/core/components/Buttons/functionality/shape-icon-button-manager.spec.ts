import { ShapeIconButtonManager } from './shape-icon-button-manager';
import {faUser} from '@fortawesome/free-solid-svg-icons'

describe('ShapeIconButtonManager', () => {
  it('should create an instance', () => {
    expect(new ShapeIconButtonManager(faUser, "#fff", false, false, false, false)).toBeTruthy();
  });
});
