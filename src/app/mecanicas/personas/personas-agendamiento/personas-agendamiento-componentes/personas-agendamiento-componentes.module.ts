import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeneralesModule } from '@app/generales/generales.module';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonasAgendamientoListaComponent } from './personas-agendamiento-lista/personas-agendamiento-lista.component';
import { PersonasAgendamientoCrearComponent } from './personas-agendamiento-crear/personas-agendamiento-crear.component';
import { PersonasAgendamientoEditarComponent } from './personas-agendamiento-editar/personas-agendamiento-editar.component';




@NgModule({
  declarations: [
    PersonasAgendamientoListaComponent,
    PersonasAgendamientoCrearComponent,
    PersonasAgendamientoEditarComponent
  ],
  imports: [
    FormsModule,
    NgbAlertModule,
    CommonModule,
    GeneralesModule
  ],exports :[
    PersonasAgendamientoListaComponent,
    PersonasAgendamientoCrearComponent,
    PersonasAgendamientoEditarComponent
  ]
})
export class PersonasAgendamientoComponentesModule { 
  
}
