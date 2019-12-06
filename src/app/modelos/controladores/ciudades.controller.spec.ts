import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { CiudadesController } from './ciudades.controller';

describe('CiudadesController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;    
    expect(new CiudadesController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
