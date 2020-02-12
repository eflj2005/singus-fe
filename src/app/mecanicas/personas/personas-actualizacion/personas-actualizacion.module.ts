import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonasActualizacionPrincipalComponent } from './personas-actualizacion-principal/personas-actualizacion-principal.component';
import {PersonasActualizacionComponentesModule} from '@mecanicas/personas/personas-actualizacion/personas-actualizacion-componentes/personas-actualizacion-componentes.module';



@NgModule({
  declarations: [PersonasActualizacionPrincipalComponent],
  imports: [
    CommonModule,
    PersonasActualizacionComponentesModule,
  ]
})
export class PersonasActualizacionModule { }
