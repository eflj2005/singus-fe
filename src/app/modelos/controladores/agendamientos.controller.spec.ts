import { AgendamientosController } from './agendamientos.controller';

import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

describe('AgendamientosController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new AgendamientosController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
