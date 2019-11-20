import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeneralesModule } from '@app/generales/generales.module';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonasAgendamientoListaComponent } from './personas-agendamiento-lista/personas-agendamiento-lista.component';




@NgModule({
  declarations: [
    PersonasAgendamientoListaComponent
  ],
  imports: [
    FormsModule,
    NgbAlertModule,
    CommonModule,
    GeneralesModule
  ],exports :[
    PersonasAgendamientoListaComponent
  ]
})
export class PersonasAgendamientoComponentesModule { 
  
}
