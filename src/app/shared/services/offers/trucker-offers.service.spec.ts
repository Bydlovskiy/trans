import { TestBed } from '@angular/core/testing';

import { TruckerOffersService } from './trucker-offers.service';

describe('OffersService', () => {
  let service: TruckerOffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TruckerOffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
