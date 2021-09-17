import { IMapManager } from './i-map-manager';
import {InteractiveMapService} from '../../../services/maps/interactive-map.service'

describe('IMapManager', () => {
  it('should create an instance', () => {
    expect(new IMapManager([{lat: 1, lng: 1}], new InteractiveMapService())).toBeTruthy();
  });
});
