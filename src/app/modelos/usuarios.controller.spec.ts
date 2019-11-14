import { TestBed } from '@angular/core/testing';

import { UsuariosController } from './usuarios.controller';

describe('UsuariosController', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuariosController = TestBed.get(UsuariosController);
    expect(service).toBeTruthy();
  });
});
