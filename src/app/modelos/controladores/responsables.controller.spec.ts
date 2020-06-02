import { ResponsablesController } from './responsables.controller';
import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

describe('Responsables.Controller', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new ResponsablesController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
