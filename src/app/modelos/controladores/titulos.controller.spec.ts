import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';


import { TitulosController } from './titulos.controller';

describe('TitulosController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new TitulosController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
