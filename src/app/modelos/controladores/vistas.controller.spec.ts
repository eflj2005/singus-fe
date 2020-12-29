
import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { VistasController } from './vistas.controller';

describe('VistasController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new VistasController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
