import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { PaisesController } from './paises.controller';

describe('PaisesController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new PaisesController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();    
  });
});
