import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardEncabezadoComponent } from './dashboard-encabezado/dashboard-encabezado.component';
import { DashboardMenuComponent } from './dashboard-menu/dashboard-menu.component';
import { DashboardWorkspaceComponent } from './dashboard-workspace/dashboard-workspace.component';



@NgModule({
  declarations: [DashboardEncabezadoComponent, DashboardMenuComponent, DashboardWorkspaceComponent],
  imports: [
    CommonModule
  ],exports:[DashboardEncabezadoComponent,DashboardMenuComponent,DashboardWorkspaceComponent]
})
export class DashboardComponentesModule { }
