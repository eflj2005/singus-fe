import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AmbienteService } from '@servicios/ambiente.service';
import { UsuarioInterface } from '@modelos/interfaces/usuario.interface';
import { RespuestaInterface } from '@app/modelos/respuesta.interface';

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
      (respuesta: RespuestaInterface ) => {    
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

  IniciarSesion( documento:number, clave: string ): Observable<RespuestaInterface> {
      
    let datosEnviados =  { accion:'iniciar_sesion', documento: documento, clave : clave };
    return this.llamadoHttp.post<RespuestaInterface>( this.datosAmbiente.GetUrlRecursos() + "pasarela.php", datosEnviados ).pipe(
      map(
        (respuesta: RespuestaInterface) => {
          if (respuesta.codigo == 200){
              let token = respuesta.mensaje;
              let decoded = jwt_decode(token); 

              let usuarioRecibido:UsuarioInterface = decoded['data'];
              usuarioRecibido.token = respuesta.mensaje;

              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('usuarioActual', JSON.stringify(usuarioRecibido));
              this.usuarioActualIntermediario.next(usuarioRecibido);
         
          }

          return respuesta;
        }
      )
    );

  }

  CerrarSesion(){
    // remove user from local storage to log user out
    localStorage.removeItem('usuarioActual');
    this.usuarioActualIntermediario.next(null);
  }
}