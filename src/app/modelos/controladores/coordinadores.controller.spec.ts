import { CoordinadoresController } from './coordinadores.controller';
import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

describe('Coordinadores.Controller', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new CoordinadoresController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
