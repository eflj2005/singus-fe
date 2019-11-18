import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmbienteService } from './ambiente.service';
import { AutenticacionService } from './autenticacion.service';
import { ErrorInterceptorService } from './error.interceptor';
import { GuardianService } from './guardian.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers: [ 
    AmbienteService,
    AutenticacionService,
    GuardianService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true  }
  ], exports :[

  ] 
})
export class ServiciosModule {

  constructor ( @Optional() @SkipSelf() servicios: ServiciosModule ){
    if(servicios){
      throw new Error("No se ejcutara, doble importación de servicios");
    }
  }


}
