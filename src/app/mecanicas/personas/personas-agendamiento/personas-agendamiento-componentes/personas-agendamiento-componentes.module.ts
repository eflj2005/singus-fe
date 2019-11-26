import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { GeneralesModule } from '@app/generales/generales.module';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import {  NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import { PersonasAgendamientoListaComponent } from './personas-agendamiento-lista/personas-agendamiento-lista.component';
import { PersonasAgendamientoCrearComponent } from './personas-agendamiento-crear/personas-agendamiento-crear.component';
import { PersonasAgendamientoEditarComponent } from './personas-agendamiento-editar/personas-agendamiento-editar.component';
import { PersonasAgendamientoVerComponent } from './personas-agendamiento-ver/personas-agendamiento-ver.component';




@NgModule({
  declarations: [
    PersonasAgendamientoListaComponent,
    PersonasAgendamientoCrearComponent,
    PersonasAgendamientoEditarComponent,
    PersonasAgendamientoVerComponent
  ],
  imports: [
    FormsModule,
    NgbAlertModule,
    CommonModule,
    GeneralesModule,
    ReactiveFormsModule,
    NgbTypeaheadModule 
  ],exports :[
    PersonasAgendamientoListaComponent,
    PersonasAgendamientoCrearComponent,
    PersonasAgendamientoEditarComponent,
    PersonasAgendamientoVerComponent
  ]
})
export class PersonasAgendamientoComponentesModule { 
  
}
