import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { CorreosController } from './correos.controller';

describe('CorreosController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new CorreosController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();    
  });
});
