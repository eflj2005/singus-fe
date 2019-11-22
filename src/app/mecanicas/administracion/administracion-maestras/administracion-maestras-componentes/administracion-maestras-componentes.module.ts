import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionMaestrasDetalleComponent } from './administracion-maestras-detalle/administracion-maestras-detalle.component';



@NgModule({
  declarations: [AdministracionMaestrasDetalleComponent],
  imports: [
    CommonModule
  ],
  exports:[ AdministracionMaestrasDetalleComponent]
})
export class AdministracionMaestrasComponentesModule { }
