import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonasSubagendamientoComponentesArbolesagendasComponent } from './personas-subagendamiento-componentes-arbolesgendas/personas-subagendamiento-componentes-arbolesagendas.component';
import { PersonasSubagendamientoComponentesListaagendamientoComponent } from './personas-subagendamiento-componentes-listaagendamiento/personas-subagendamiento-componentes-listaagendamiento.component';



@NgModule({
  declarations: [PersonasSubagendamientoComponentesArbolesagendasComponent, PersonasSubagendamientoComponentesListaagendamientoComponent],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports:  [
    PersonasSubagendamientoComponentesArbolesagendasComponent,
    PersonasSubagendamientoComponentesListaagendamientoComponent
  ]
})
export class PersonasSubagendamientoComponentesModule { }
