import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from './usuarios.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers: [ UsuariosService ]  
})
export class ServiciosModule {

  constructor ( @Optional() @SkipSelf() servicios: ServiciosModule ){
    if(servicios){
      throw new Error("No se ejcutara, doble importación de servicios");
    }
  }


}
