import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AmbienteService } from '@servicios/ambiente.service';
//import { UsuariosControlador } from '@modelos/usuarios.modelo';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  // private usuarioActualIntermediario: BehaviorSubject<UsuariosControlador>;
  // public usuarioActual: Observable<UsuariosControlador>

  // constructor(
  //   private llamadoHttp: HttpClient,
  //   private datosAmbiente: AmbienteService
  // ) { 
  //   this.usuarioActualIntermediario = new BehaviorSubject<UsuariosControlador>(JSON.parse(localStorage.getItem('currentUser')));
  //   this.usuarioActual = this.usuarioActualIntermediario.asObservable();
  // }

  // public get UsuarioActualValor(): UsuariosControlador {
  //   return this.usuarioActualIntermediario.value;
  // }

  // IniciarSesion(documento:number, clave: string){
  //   return this.llamadoHttp.post<any>( 
  //     this.datosAmbiente.getUrlRecursos + "pasarela.php?accion=inicio_sesion", { documento, clave } 
  //   ).pipe(
  //     map(
  //       usuario => {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('usuarioActual', JSON.stringify(usuario));
  //         this.usuarioActualIntermediario.next(usuario);
  //         return usuario;
  //       }

  //     )
  //   )
  // }

  CerrarSesion(){
    // // remove user from local storage to log user out
    // localStorage.removeItem('usuarioActual');
    // this.usuarioActualIntermediario.next(null);
  }
}