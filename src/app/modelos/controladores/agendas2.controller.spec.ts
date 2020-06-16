import { Agendas2Controller } from './agendas2.controller';

import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

describe('Agendas2Controller', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new Agendas2Controller(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
