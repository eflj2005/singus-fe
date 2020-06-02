import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { RangosingresosController } from './rangosingresos.controller';

describe('RangosingresosController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new RangosingresosController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();    
  });
});
