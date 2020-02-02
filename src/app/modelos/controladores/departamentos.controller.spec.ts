import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { DepartamentosController } from './departamentos.controller';

describe('DepartamentosController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new DepartamentosController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();    
  });
});
