import { TestBed } from '@angular/core/testing';

import { ProcesoLogeoService } from './proceso-logeo.service';

describe('ProcesoLogeoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcesoLogeoService = TestBed.get(ProcesoLogeoService);
    expect(service).toBeTruthy();
  });
});
