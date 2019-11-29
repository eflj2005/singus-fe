import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { DashboardEncabezadoComponent } from './dashboard-encabezado/dashboard-encabezado.component';
import { DashboardMenuComponent } from './dashboard-menu/dashboard-menu.component';
import { DashboardWorkspaceComponent } from './dashboard-workspace/dashboard-workspace.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { DashboardEstadisticasComponent } from './dashboard-estadisticas/dashboard-estadisticas.component';
import { ChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [DashboardEncabezadoComponent, DashboardMenuComponent, DashboardWorkspaceComponent, EstadisticasComponent, DashboardEstadisticasComponent],
  imports: [
    CommonModule,
    RouterModule,
    ChartsModule
  ],exports:[DashboardEncabezadoComponent,DashboardMenuComponent,DashboardWorkspaceComponent,  DashboardEstadisticasComponent]
})
export class DashboardComponentesModule { 



}
