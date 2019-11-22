import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionMaestrasPrincipalComponent } from './administracion-maestras-principal/administracion-maestras-principal.component';
import { AdministracionMaestrasComponentesModule } from "@mecanicas/administracion/administracion-maestras/administracion-maestras-componentes/administracion-maestras-componentes.module";


@NgModule({
  declarations: [AdministracionMaestrasPrincipalComponent],
  imports: [
    CommonModule,
    AdministracionMaestrasComponentesModule
  ]
})
export class AdministracionMaestrasModule { }
