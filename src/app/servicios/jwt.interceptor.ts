 import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { AutenticacionService } from './autenticacion.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(
    private autenticador: AutenticacionService
  ) { }

  intercept(solicitud: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    // add authorization header with jwt token if available
    let usuarioActual = this.autenticador.UsuarioActualValor;
    if(usuarioActual && usuarioActual.token){
      solicitud = solicitud.clone({
        setHeaders: {
          Authorization: `Bearer ${usuarioActual.token}`
        }
      });
    }

    return next.handle(solicitud);
  }
}
