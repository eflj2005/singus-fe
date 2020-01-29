import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { MunicipiosController } from './municipios.controller';

describe('CiudadesController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;    
    expect(new MunicipiosController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
