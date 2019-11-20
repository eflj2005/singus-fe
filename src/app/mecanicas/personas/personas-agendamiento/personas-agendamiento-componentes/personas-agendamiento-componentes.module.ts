import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonasAgendamientoListaComponent } from './personas-agendamiento-lista/personas-agendamiento-lista.component';



@NgModule({
  declarations: [
    PersonasAgendamientoListaComponent
  ],
  imports: [
    CommonModule
  ],exports :[
    PersonasAgendamientoListaComponent
  ]
})
export class PersonasAgendamientoComponentesModule { }
