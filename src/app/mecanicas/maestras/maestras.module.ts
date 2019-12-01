import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaestrasPrincipalComponent } from './maestras-principal/maestras-principal.component';
import { AdministracionMaestrasComponentesModule } from "@app/mecanicas/maestras/maestras-componentes/maestras-componentes.module";
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [MaestrasPrincipalComponent],
  imports: [
    CommonModule,
    AdministracionMaestrasComponentesModule,
    NgbTabsetModule
  ]
})
export class MaestrasModule { }
