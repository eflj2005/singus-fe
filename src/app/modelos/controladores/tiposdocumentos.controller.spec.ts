import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { TiposdocumentosController } from './tiposdocumentos.controller';

describe('TiposdocumentosController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;    
    expect(new TiposdocumentosController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
