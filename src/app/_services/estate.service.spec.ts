import { TestBed } from '@angular/core/testing';

import { EstateService } from './estate.service';

describe('EstateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstateService = TestBed.get(EstateService);
    expect(service).toBeTruthy();
  });
});
