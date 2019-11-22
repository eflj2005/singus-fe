import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import {DashboardModule} from '@mecanicas/dashboard/dashboard.module';
import { InicioModule } from "./inicio/inicio.module";
import {PersonasModule} from '@mecanicas/personas/personas.module';
import { AdministracionModule } from "@mecanicas/administracion/administracion.module";




@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    InicioModule,
    DashboardModule,
    PersonasModule,
    AdministracionModule
  ]
})
export class MecanicasModule { }
