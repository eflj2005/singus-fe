import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonasSubagendamientoComponentesArbolagendasComponent } from './personas-subagendamiento-componentes-arbolagendas/personas-subagendamiento-componentes-arbolagendas.component';
import { PersonasSubagendamientoComponentesListaagendamientoComponent } from './personas-subagendamiento-componentes-listaagendamiento/personas-subagendamiento-componentes-listaagendamiento.component';



@NgModule({
  declarations: [PersonasSubagendamientoComponentesArbolagendasComponent, PersonasSubagendamientoComponentesListaagendamientoComponent],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports:  [PersonasSubagendamientoComponentesArbolagendasComponent]
})
export class PersonasSubagendamientoComponentesModule { }
