import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { CohortesController } from './cohortes.controller';

describe('CohortesController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;    
    expect(new CohortesController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
