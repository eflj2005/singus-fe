import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardModule} from '@mecanicas/dashboard/dashboard.module'
import { InicioModule } from "./inicio/inicio.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InicioModule,
    DashboardModule
  ]
})
export class MecanicasModule { }
