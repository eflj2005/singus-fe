import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { TiposcontratosController } from './tiposcontratos.controller';

describe('TiposcontratosController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new TiposcontratosController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();    
  });
});
