import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { SedesController } from './sedes.controller';

describe('SedesController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new SedesController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
