import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { ReportesPredefinidosModule } from "./reportes-predefinidos/reportes-predefinidos.module";
import { ReportesAlertasModule } from "./reportes-alertas/reportes-alertas.module";
import { ReportesPersonalizadoModule } from "./reportes-personalizado/reportes-personalizado.module";
import { ReportesAlertasPrincipalComponent } from "./reportes-alertas/reportes-alertas-principal/reportes-alertas-principal.component";
import { ReportesPredefinidosPrincipalComponent } from "./reportes-predefinidos/reportes-predefinidos-principal/reportes-predefinidos-principal.component";

const rutas: Routes =[
  
  { path:'', component: ReportesPredefinidosPrincipalComponent , children:[
    { path:'predefinidos', component: ReportesPredefinidosPrincipalComponent},
    { path:'alertas', component: ReportesAlertasPrincipalComponent}
  ]}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReportesAlertasModule,
    ReportesPredefinidosModule,
    ReportesPersonalizadoModule,    
    NgbTooltipModule,
    RouterModule.forChild(rutas)    
  ],
  exports: [ RouterModule ]
})

export class ReportesModule { }
