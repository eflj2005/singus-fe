import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { ReconocimientosController } from './reconocimientos.controller';

describe('ReconocimientosController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;    
    expect(new ReconocimientosController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
