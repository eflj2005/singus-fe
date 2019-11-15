import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { GenericoModel } from './generico.model';
import { UsuarioInterface } from './usuario.interface';

import { AmbienteService } from '@app/servicios/ambiente.service';

export interface IDatosRespuesta{
  codigo: number,
  mensaje: any;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosController extends GenericoModel {
  
  constructor(
    private llamadoHttp :HttpClient,
    private datosAmbiente: AmbienteService,
  ){ super(); }


  registros: UsuarioInterface[]= [];

  public ValidarAdministrador(){

    const llamado = this.llamadoHttp.get(this.datosAmbiente.getUrlRecursos()+"pasarela.php?accion=inicio");
    
    llamado.subscribe(
      (respuesta: IDatosRespuesta) => {  
        
        if(respuesta.mensaje == true) this.datosAmbiente.inicioModo=1;
        else                          this.datosAmbiente.inicioModo=2;

        this.datosAmbiente.inicioPaso=1;          
      }
    );

  }
}
