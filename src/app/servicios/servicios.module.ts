import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmbienteService } from './ambiente.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers: [ AmbienteService ]  
})
export class ServiciosModule {

  constructor ( @Optional() @SkipSelf() servicios: ServiciosModule ){
    if(servicios){
      throw new Error("No se ejcutara, doble importación de servicios");
    }
  }


}