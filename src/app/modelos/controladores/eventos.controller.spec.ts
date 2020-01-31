import { EventosController } from './eventos.controller';
import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

describe('EventosController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService; 
    expect(new EventosController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
