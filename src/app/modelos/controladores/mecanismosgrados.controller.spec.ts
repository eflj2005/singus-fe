import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { MecanismosgradosController } from './mecanismosgrados.controller';

describe('MecanismosgradosController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new MecanismosgradosController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();    
  });
});
