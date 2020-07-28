import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarguesComponentesPrecargarComponent } from './cargues-componentes-precargar/cargues-componentes-precargar.component';
import { NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { CarguesComponentesAnalisistipo1Component } from './cargues-componentes-analisistipo1/cargues-componentes-analisistipo1.component';



@NgModule({
  declarations: [CarguesComponentesPrecargarComponent, CarguesComponentesAnalisistipo1Component],
  imports: [
    CommonModule,
    NgbModule,
    NgbPopoverModule
  ],
  exports: [
    CarguesComponentesPrecargarComponent,
    CarguesComponentesAnalisistipo1Component
  ]
})
export class CargueComponentesModule { }
