import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaestrasPrincipalComponent } from './maestras-principal/maestras-principal.component';
import { MaestrasComponentesModule } from "@app/mecanicas/maestras/maestras-componentes/maestras-componentes.module";
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [MaestrasPrincipalComponent],
  imports: [
    CommonModule,
    MaestrasComponentesModule,
    NgbTabsetModule
  ]
})
export class MaestrasModule { }
