import { Injectable } from '@angular/core';

import { GenericoModel } from './generico.model';
import { UsuarioInterface } from './usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosController extends GenericoModel {

  registros: UsuarioInterface[]= [];

  public ExisteAdministrador(){

  }
}
