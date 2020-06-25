import { AsignacionesController } from './asignaciones.controller';


import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

describe('AsignacionesController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new AsignacionesController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
