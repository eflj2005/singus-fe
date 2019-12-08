import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesPredefinidosPrincipalComponent } from './reportes-predefinidos-principal/reportes-predefinidos-principal.component';
import { ChartsModule } from 'ng2-charts';
import 'chartjs-plugin-labels';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';



@NgModule({
  declarations: [ReportesPredefinidosPrincipalComponent],
  imports: [
    CommonModule,
    NgbModule,
    ChartsModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    PDFExportModule
  ],
  exports: [ReportesPredefinidosPrincipalComponent]
})
export class ReportesPredefinidosModule { }
