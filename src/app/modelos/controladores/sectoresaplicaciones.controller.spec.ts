import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { SectoresaplicacionesController } from './sectoresaplicaciones.controller';

describe('SectoresaplicacionesController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;    
    expect(new SectoresaplicacionesController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
