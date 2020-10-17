import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesSeleccionVistasComponent } from './reportes-seleccion-vistas/reportes-seleccion-vistas.component';



@NgModule({
  declarations: [ReportesSeleccionVistasComponent],
  imports: [
    CommonModule
  ],
  exports:[ ReportesSeleccionVistasComponent]
})
export class ReportesPersonalizadosComponentesModule { }
