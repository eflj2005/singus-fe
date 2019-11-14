import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPrincipalComponent } from './dashboard-principal/dashboard-principal.component';
import {DashboardComponentesModule} from '@mecanicas/dashboard/dashboard-componentes/dashboard-componentes.module'



@NgModule({
  declarations: [DashboardPrincipalComponent],
  imports: [
    CommonModule,
    DashboardComponentesModule
  ]
})
export class DashboardModule { }