import { OfertasController } from './ofertas.controller';
import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

describe('OfertasController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;     
    expect(new OfertasController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
