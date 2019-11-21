import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { GenericoModel } from './generico.model';
import { UsuarioInterface } from './usuario.interface';

import { AmbienteService } from '@app/servicios/ambiente.service';



@Injectable({
  providedIn: 'root'
})
export class UsuariosController extends GenericoModel {
  
  registros: UsuarioInterface[]= [];

  constructor(
    private llamadoHttp :HttpClient
  ){ super(); }





}
