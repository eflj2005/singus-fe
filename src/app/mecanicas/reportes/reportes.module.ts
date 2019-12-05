import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReportesPredefinidosModule } from "./reportes-predefinidos/reportes-predefinidos.module";
import { ReportesPredefinidosPrincipalComponent } from "./reportes-predefinidos/reportes-predefinidos-principal/reportes-predefinidos-principal.component";

const rutas: Routes =[
  
  { path:'', component: ReportesPredefinidosPrincipalComponent , children:[
    { path:'predefinidos', component: ReportesPredefinidosPrincipalComponent}
  ]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReportesPredefinidosModule,
    RouterModule.forChild(rutas)  
  ]
})
export class ReportesModule { }
