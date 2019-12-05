import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesPredefinidosPrincipalComponent } from './reportes-predefinidos-principal/reportes-predefinidos-principal.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [ReportesPredefinidosPrincipalComponent],
  imports: [
    CommonModule,
    NgbModule,
    ChartsModule
  ],
  exports: [ReportesPredefinidosPrincipalComponent]
})
export class ReportesPredefinidosModule { }
