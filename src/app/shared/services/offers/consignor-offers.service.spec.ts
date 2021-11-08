import { TestBed } from '@angular/core/testing';

import { ConsignorOffersService } from './consignor-offers.service';

describe('ConsignorOffersService', () => {
  let service: ConsignorOffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsignorOffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
