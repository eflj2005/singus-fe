import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AmbienteService } from '@servicios/ambiente.service';
import { UsuarioInterface } from '@modelos/usuario.interface';
import { IRespuesta } from '@app/modelos/respuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private usuarioActualIntermediario: BehaviorSubject<UsuarioInterface>;
  public usuarioActual: Observable<UsuarioInterface>

  constructor(
    private llamadoHttp: HttpClient,
    private datosAmbiente: AmbienteService
  ) { 
    this.usuarioActualIntermediario = new BehaviorSubject<UsuarioInterface>(JSON.parse(localStorage.getItem('usuarioActual')));
    this.usuarioActual = this.usuarioActualIntermediario.asObservable();
  }

  public get UsuarioActualValor(): UsuarioInterface {
    return this.usuarioActualIntermediario.value;
  }

  public ValidarAdministrador(){

    const llamado = this.llamadoHttp.get(this.datosAmbiente.getUrlRecursos()+"pasarela.php?accion=inicio");
    
    llamado.subscribe(
      (respuesta: IRespuesta  ) => {    
        if(respuesta.mensaje == true) this.datosAmbiente.inicioModo=1;
        else                          this.datosAmbiente.inicioModo=2;
        this.datosAmbiente.inicioPaso=1;          
      },
      error => {
        console.log(error);
      }
    );
  }  

  IniciarSesion(documento:number, clave: string){
    
    const llamado =  this.llamadoHttp.post<IRespuesta>( this.datosAmbiente.getUrlRecursos + "pasarela.php?accion=inicio_sesion", { documento , clave } );
    
    llamado.subscribe(
      (respuesta: IRespuesta) => {
        var notificacion:IRespuesta = null;
        var usuario:UsuarioInterface = null;

        switch (respuesta.codigo){
          case 1:
            usuario = respuesta.mensaje;
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('usuarioActual', JSON.stringify(usuario));
            this.usuarioActualIntermediario.next(usuario);            
            
            notificacion.codigo = respuesta.codigo;
            notificacion.mensaje = null;
          break;
          case 2:         //es estudiante
            usuario = respuesta.mensaje;
            notificacion.codigo = respuesta.codigo;
            notificacion.mensaje = usuario.correo; 
          break;          
          case 3:         //autenticación erronea
              notificacion.codigo = respuesta.codigo;
              notificacion.mensaje = "Documento o clave erronea. Verifique e intente de nuevo";
          break;
          case 4:         //usuario bloqueado
              notificacion.codigo = respuesta.codigo;
              notificacion.mensaje = "usuario bloqueado o inactivo. Contactese con el administrador";
          break;          
        }

       return notificacion;
      }
    );

    return llamado;
  }

  CerrarSesion(){
    // remove user from local storage to log user out
    localStorage.removeItem('usuarioActual');
    this.usuarioActualIntermediario.next(null);
  }
}