import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { AreasController } from './areas.controller';

describe('AreasController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new AreasController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
