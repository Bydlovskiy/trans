import { TestBed } from '@angular/core/testing';

import { ConsignorRegisterService } from './consignor-register.service';

describe('ConsignorRegisterService', () => {
  let service: ConsignorRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsignorRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
