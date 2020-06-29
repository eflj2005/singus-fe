import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonasSubagendamientoComponentesArbolesComponent } from './personas-subagendamiento-componentes-arboles/personas-subagendamiento-componentes-arboles.component';
import { PersonasSubagendamientoComponentesListaComponent } from './personas-subagendamiento-componentes-lista/personas-subagendamiento-componentes-lista.component';
import { PersonasSubagendamientoComponentesProcesarComponent } from './personas-subagendamiento-componentes-procesar/personas-subagendamiento-componentes-procesar.component';



@NgModule({
  declarations: [PersonasSubagendamientoComponentesArbolesComponent, PersonasSubagendamientoComponentesListaComponent, PersonasSubagendamientoComponentesProcesarComponent],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports:  [
    PersonasSubagendamientoComponentesArbolesComponent,
    PersonasSubagendamientoComponentesListaComponent
  ]
})
export class PersonasSubagendamientoComponentesModule { }
