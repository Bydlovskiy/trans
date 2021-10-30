import { TestBed } from '@angular/core/testing';

import { CarsSettingsService } from './cars-settings.service';

describe('CarsSettingsService', () => {
  let service: CarsSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarsSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
