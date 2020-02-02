import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { TiposestudiosController } from './tiposestudios.controller';

describe('TiposestudiosController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new TiposestudiosController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();    
  });
});
