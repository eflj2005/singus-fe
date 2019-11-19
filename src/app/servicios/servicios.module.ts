import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmbienteService } from './ambiente.service';
import { AutenticacionService } from './autenticacion.service';

import { GuardianService } from './guardian.service';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers: [ 
    AmbienteService,
    AutenticacionService,
    GuardianService
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
