import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardModule} from '@mecanicas/dashboard/dashboard.module';
import { InicioModule } from "./inicio/inicio.module";
import {PersonasModule} from '@mecanicas/personas/personas.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InicioModule,
    DashboardModule,
    PersonasModule

  ]
})
export class MecanicasModule { }
