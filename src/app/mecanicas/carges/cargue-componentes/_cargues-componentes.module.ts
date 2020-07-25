import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarguesComponentesPrecargarComponent } from './cargues-componentes-precargar/cargues-componentes-precargar.component';
import { NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [CarguesComponentesPrecargarComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgbPopoverModule
  ],
  exports: [
    CarguesComponentesPrecargarComponent
  ]
})
export class CargueComponentesModule { }
