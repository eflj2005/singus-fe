import { AgendasController } from './agendas.controller';

import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

describe('AgendasController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new AgendasController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
