import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { SectoreslaboralesController } from './sectoreslaborales.controller';

describe('SectoreslaboralesController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;
    expect(new SectoreslaboralesController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
