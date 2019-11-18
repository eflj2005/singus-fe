import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { AutenticacionService } from './autenticacion.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(
    private autenticador: AutenticacionService
  ) { }

  intercept(solicitud: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>>{
    console.log(solicitud);
    console.log(next);


    const observable = next.handle(solicitud).pipe(
      catchError(
        respuestaError => {
          
          console.log(respuestaError);

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

    console.log(observable);
    
    return observable;
  }
}
