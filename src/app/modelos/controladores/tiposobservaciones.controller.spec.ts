import { TiposobservacionesController } from './tiposobservaciones.controller';

import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

describe('TiposobservacionesController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new TiposobservacionesController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();        
  });
});
