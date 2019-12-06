import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';

import { UsuariosController } from './usuarios.controller';

describe('UsuariosController', () => {
  it('should create an instance', () => {
    let instanciaHttpClient :HttpClient;
    let InstanciaAmbienteService :AmbienteService;    
    expect(new UsuariosController(instanciaHttpClient,InstanciaAmbienteService)).toBeTruthy();
  });
});
