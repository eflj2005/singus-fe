import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AmbienteService } from '@servicios/ambiente.service';
import { UsuarioInterface } from '@modelos/usuario.interface';
import { IRespuesta } from '@app/modelos/respuesta.interface';

import * as jwt_decode from 'jwt-decode';

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

    const llamado = this.llamadoHttp.get(this.datosAmbiente.GetUrlRecursos()+"pasarela.php?accion=inicio");
    
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

    return llamado;
  }  

  IniciarSesion(documento:number, clave: string){
    
    let datosEnviados =  { accion:'iniciar_sesion', documento: documento, clave : clave };
    console.log(datosEnviados);

    const llamado =  this.llamadoHttp.post<IRespuesta>( this.datosAmbiente.GetUrlRecursos() + "pasarela.php", datosEnviados );
    
    alert(llamado);

    llamado.subscribe(
      (respuesta: IRespuesta) => {
        var notificacion:IRespuesta;

        console.log(respuesta);   

        if (respuesta.codigo == 200){

            let token = respuesta.mensaje;
            let decoded = jwt_decode(token); 
            console.log(decoded);   
            // var base64Url = this.token.split('.')[1];
            // var base64 = base64Url.replace('-', '+').replace('_', '/');
            // base64 = JSON.parse(atob(base64))
            // // console.log(base64);
            // this.idUsuario = base64.data.IdUsuario;
            // this.usuario = base64.data.usuario;
            // this.idEmpleado = base64.data.IdEmpleado;
            // this.empledo = base64.data.NombreEmpleado;
            // this.tipoUsuario = base64.data.TipoUsuario;



            // let usuario:UsuarioInterface = respuesta.mensaje;
            // // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('usuarioActual', JSON.stringify(usuario));
            // this.usuarioActualIntermediario.next(usuario);            
            
            // notificacion.codigo = respuesta.codigo;
            // notificacion.mensaje = null;






        }
        else{
          console.log(notificacion);
              notificacion.codigo = respuesta.codigo;
              notificacion.mensaje = respuesta.mensaje;
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