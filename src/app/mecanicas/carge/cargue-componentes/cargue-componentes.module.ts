import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargueComponentesPrecargarComponent } from './cargue-componentes-precargar/cargue-componentes-precargar.component';
import { NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [CargueComponentesPrecargarComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgbPopoverModule
  ],
  exports: [
    CargueComponentesPrecargarComponent
  ]
})
export class CargueComponentesModule { }
