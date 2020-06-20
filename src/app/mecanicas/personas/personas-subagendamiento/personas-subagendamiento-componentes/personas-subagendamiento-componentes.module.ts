import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonasSubagendamientoComponentesArbolagendasComponent } from './personas-subagendamiento-componentes-arbolagendas/personas-subagendamiento-componentes-arbolagendas.component';



@NgModule({
  declarations: [PersonasSubagendamientoComponentesArbolagendasComponent],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports:  [PersonasSubagendamientoComponentesArbolagendasComponent]
})
export class PersonasSubagendamientoComponentesModule { }
