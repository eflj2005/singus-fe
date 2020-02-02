import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { InstitucionesController } from './instituciones.controller';

describe('InstitucionesController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new InstitucionesController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
