import { TestBed } from '@angular/core/testing';

import { TruckerRegisterService } from './trucker-register.service';

describe('TruckerRegisterService', () => {
  let service: TruckerRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TruckerRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
