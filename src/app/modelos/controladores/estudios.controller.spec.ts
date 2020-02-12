import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { EstudioController } from './estudios.controller';

describe('EstudiosController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;        
    expect(new EstudiosController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();    
  });
});
