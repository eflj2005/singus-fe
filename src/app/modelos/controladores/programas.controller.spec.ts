import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { ProgramasController } from './programas.controller';

describe('ProgramasController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;    
    expect(new ProgramasController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
