import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { ExperienciasController } from './experiencias.controller';

describe('ExperienciasController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;        
    expect(new ExperienciasController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();    

  });
});
