import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaestrasDetalleComponent } from './maestras-detalle/maestras-detalle.component';

@NgModule({
  declarations: [MaestrasDetalleComponent],
  imports: [
    CommonModule,
  ],
  exports:[ MaestrasDetalleComponent]
})
export class AdministracionMaestrasComponentesModule { }
