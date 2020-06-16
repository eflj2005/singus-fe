import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PersonasActualizacionModule} from '@mecanicas/personas/personas-actualizacion/personas-actualizacion.module';
import {PersonasAgendamientoModule } from '@mecanicas/personas/personas-agendamiento/personas-agendamiento.module'
import { PersonasSubagendamientoModule } from './personas-subagendamiento/personas-subagendamiento.module';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PersonasActualizacionModule,
    PersonasAgendamientoModule,
    PersonasSubagendamientoModule
  ]
})
export class PersonasModule { }
