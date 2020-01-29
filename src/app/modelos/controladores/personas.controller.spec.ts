import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { PersonasController } from './personas.controller';

describe('PersonasController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;        
    expect(new PersonasController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
