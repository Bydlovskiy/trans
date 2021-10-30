import { TestBed } from '@angular/core/testing';

import { CompanySettingsService } from './company-settings.service';

describe('CompanySettingsService', () => {
  let service: CompanySettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanySettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
