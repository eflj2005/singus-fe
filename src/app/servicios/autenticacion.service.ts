import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AmbienteService } from '@servicios/ambiente.service';
import { UsuarioInterface } from '@interfaces/usuario.interface';
import { RespuestaInterface } from '@interfaces/respuesta.interface';

import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { Console } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private usuarioActualIntermediario: BehaviorSubject<UsuarioInterface> = null;
  public usuarioActual: Observable<UsuarioInterface> = null;

  constructor(
    private llamadoHttp: HttpClient,
    private datosAmbiente: AmbienteService,
    private enrutador: Router
  ) { 
      this.usuarioActualIntermediario = new BehaviorSubject<UsuarioInterface>(JSON.parse(localStorage.getItem('usuarioActual')));
      this.usuarioActual = this.usuarioActualIntermediario.asObservable();
  }

  validarToken(){
    let esValido = true;

    if (this.usuarioActualIntermediario.value != null) {

      // ===========token prueba - fecha caducada===========
      // let tokenPrueba = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIwIjp7Imp0aSI6IlZjUlYrbTcwZklKWndmUHZ4aHFYUDEwMDRtcmphOWRcL1ZQVGdmSEZFSVlZPSIsImlhdCI6MTYwNzY1OTMwNywibmJmIjoxNjA3NjU5MzE3LCJleHAiOjE2MDc2NzczMDcsImlzcyI6ImxvY2FsaG9zdCJ9LCJkYXRhIjp7ImlkIjoiMzYiLCJkb2N1bWVudG8iOiIxMjM0NjQ0MzEwIiwibm9tYnJlcyI6Ikp1YW4gRXN0ZWJhbiIsImFwZWxsaWRvcyI6IlBhcnJhIiwiY29ycmVvIjoicGFycmFkdWN1YXJhanVhbmVzdGViYW5AZ21haWwuY29tIiwicm9sIjoiRCJ9fQ.cx33RrrXanrGcLa82p8oY8kBZUhu18DiDUYwNralm8k";
      // let decoded = jwt_decode(tokenPrueba);

      let decoded = jwt_decode(this.usuarioActualIntermediario.value.token);
      let expToken = new Date(0);
      expToken.setUTCSeconds(decoded[0].exp);
      let fechaActual = new Date();

      // console.log(expToken);
      // console.log(fechaActual);

      if (expToken.getTime() < fechaActual.getTime()) {
        alert("La sesion a caducado, ingrese nuevamente.");
        this.CerrarSesion();
        this.datosAmbiente.inicioModo=1;
        esValido = false;
      }
    }
    else if(this.usuarioActualIntermediario.value == null){
      esValido = false;
      this.CerrarSesion();
    }
    return esValido;
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

  IniciarSesion( documento:number, clave: string, generarToken: boolean ): Observable<RespuestaInterface> {
    let datosEnviados =  { accion:'iniciar_sesion', documento: documento, clave: clave, generarToken: generarToken };
    return this.llamadoHttp.post<RespuestaInterface>( this.datosAmbiente.GetUrlRecursos() + "pasarela.php", datosEnviados ).pipe(
      map(
        (respuesta: RespuestaInterface) => {
          console.log(respuesta);
          if (respuesta.codigo == 200){
            if(generarToken){
              let token = respuesta.mensaje;
              let decoded = jwt_decode(token); 

              let usuarioRecibido:UsuarioInterface = decoded['data'];
              usuarioRecibido.token = respuesta.mensaje;

              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('usuarioActual', JSON.stringify(usuarioRecibido));
              this.usuarioActualIntermediario.next(usuarioRecibido);
            }
          }

          return respuesta;
        }
      )
    );
  }

  CerrarSesion(){
    // remove user from local storage to log user out
    this.enrutador.navigate( ['/login'] );
    this.usuarioActualIntermediario.next(null);
    localStorage.removeItem('usuarioActual');
  }
}