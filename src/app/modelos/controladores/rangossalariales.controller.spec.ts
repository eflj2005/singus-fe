import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { RangossalarialesController } from './rangossalariales.controller';

describe('Rangossalariales.Controller', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new RangossalarialesController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();    
  });
});
