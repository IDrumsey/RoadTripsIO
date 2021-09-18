import { IconButtonManager } from './icon-button-manager';
import {faUser} from '@fortawesome/free-solid-svg-icons'

describe('IconButtonManager', () => {
  it('should create an instance', () => {
    expect(new IconButtonManager(faUser, "#fff", false, false, false, false)).toBeTruthy();
  });
});
