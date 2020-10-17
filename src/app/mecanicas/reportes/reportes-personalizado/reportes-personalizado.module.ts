import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesPersonalizadoPrincipalComponent } from './reportes-personalizado-principal/reportes-personalizado-principal.component';
import { ReportesPersonalizadosComponentesModule } from './reportes-personalizados-componentes/reportes-personalizados-componentes.module';



@NgModule({
  declarations: [ReportesPersonalizadoPrincipalComponent],
  imports: [
    CommonModule,
    ReportesPersonalizadosComponentesModule,
  ]
})
export class ReportesPersonalizadoModule { }
