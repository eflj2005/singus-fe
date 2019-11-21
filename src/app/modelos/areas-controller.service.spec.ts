import { TestBed } from '@angular/core/testing';

import { AreasController } from './areas.controller';

describe('AreasController', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AreasController = TestBed.get(AreasController);
    expect(service).toBeTruthy();
  });
});
