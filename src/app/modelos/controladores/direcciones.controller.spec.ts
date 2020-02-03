import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { DireccionesController } from './direcciones.controller';

describe('DireccionesController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new DireccionesController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();    
  });
});
