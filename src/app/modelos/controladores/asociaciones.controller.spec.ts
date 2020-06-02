import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { AsociacionesController } from './asociaciones.controller';

describe('AsociacionesController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;    
    expect(new AsociacionesController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
