import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AmbienteService } from '@servicios/ambiente.service';
import { UsuarioInterface } from '@modelos/usuario.interface';

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
    this.usuarioActualIntermediario = new BehaviorSubject<UsuarioInterface>(JSON.parse(localStorage.getItem('currentUser')));
    this.usuarioActual = this.usuarioActualIntermediario.asObservable();
  }

  public get UsuarioActualValor(): UsuarioInterface {
    return this.usuarioActualIntermediario.value;
  }

  IniciarSesion(documento:number, clave: string){
    return this.llamadoHttp.post<any>( 
      this.datosAmbiente.getUrlRecursos + "pasarela.php?accion=inicio_sesion", { documento, clave } 
    ).pipe(
      map(
        usuario => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('usuarioActual', JSON.stringify(usuario));
          this.usuarioActualIntermediario.next(usuario);
          return usuario;
        }

      )
    )
  }

  CerrarSesion(){
    // remove user from local storage to log user out
    localStorage.removeItem('usuarioActual');
    this.usuarioActualIntermediario.next(null);
  }
}