import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { AutenticacionService } from './autenticacion.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(
    private autenticador: AutenticacionService
  ) { }

  intercept(solicitud: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>>{

    
    const observable = next.handle(solicitud).pipe(
       catchError(
        respuestaError => {

          if(respuestaError.status == 401){
            // auto logout if 401 response returned from api
            this.autenticador.CerrarSesion();
            location.reload(true);
          }

          const error = respuestaError.error.message || respuestaError.statusText;
          return throwError(error);          
        }
      )
    );

    return observable;
  }
}
