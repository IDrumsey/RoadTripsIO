import { TestBed } from '@angular/core/testing';

import { IMapService } from './i-map.service';

fdescribe('IMapService', () => {
  let service: IMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Furthest West bound', () => {
    let coordinates: google.maps.LatLngLiteral[] = [
      {lat: -100, lng: 50},
      {lat: -99, lng: 12},
      {lat: 50, lng: -47},
      {lat: 20, lng: 85},
      {lat: -75, lng: -25},
      {lat: 86, lng: 99},
      {lat: 25, lng: 100}
    ]

    let furthestWestCoordinate = service.getFurthestWestCoordinate(coordinates)

    expect(furthestWestCoordinate).toEqual({lat: -100, lng: 50})
  })
});
