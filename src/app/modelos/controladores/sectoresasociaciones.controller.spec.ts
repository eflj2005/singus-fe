import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { SectoresasociacionesController } from './sectoresasociaciones.controller';

describe('SectoresasociacionesController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;    
    expect(new SectoresasociacionesController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
