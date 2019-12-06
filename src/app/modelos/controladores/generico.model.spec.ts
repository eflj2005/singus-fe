import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { GenericoModel } from './generico.model';

describe('GenericoModel', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;        
    expect(new GenericoModel(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
