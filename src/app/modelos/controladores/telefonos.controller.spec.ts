import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { TelefonosController } from './telefonos.controller';

describe('TelefonosController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new TelefonosController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();    
  });
});
