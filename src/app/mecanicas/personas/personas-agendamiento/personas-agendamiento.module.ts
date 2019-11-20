import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonasAgendamientoPrincipalComponent } from './personas-agendamiento-principal/personas-agendamiento-principal.component';
import {PersonasAgendamientoComponentesModule} from'@mecanicas/personas/personas-agendamiento/personas-agendamiento-componentes/personas-agendamiento-componentes.module'


@NgModule({
  declarations: [PersonasAgendamientoPrincipalComponent],
  imports: [
    CommonModule,
    PersonasAgendamientoComponentesModule   
  
  ]
})
export class PersonasAgendamientoModule { }
