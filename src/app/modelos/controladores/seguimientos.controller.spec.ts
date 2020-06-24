import { SeguimientosController } from './seguimientos.controller';

import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

describe('SeguimientosController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new SeguimientosController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();    
  });
});
