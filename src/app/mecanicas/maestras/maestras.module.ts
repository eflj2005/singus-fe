import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaestrasPrincipalComponent } from './maestras-principal/maestras-principal.component';
import { AdministracionMaestrasComponentesModule } from "@mecanicas/maestras/maestras-componentes/administracion-maestras-componentes.module";


@NgModule({
  declarations: [MaestrasPrincipalComponent],
  imports: [
    CommonModule,
    AdministracionMaestrasComponentesModule
  ]
})
export class MaestrasModule { }
