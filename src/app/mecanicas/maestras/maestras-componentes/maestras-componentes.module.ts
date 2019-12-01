import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaestrasDetalleComponent } from './maestras-detalle/maestras-detalle.component';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [MaestrasDetalleComponent],
  imports: [
    CommonModule,
    NgbTabsetModule
  ],
  exports:[ MaestrasDetalleComponent]
})
export class AdministracionMaestrasComponentesModule { }
