import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionMaestrasDetalleComponent } from './administracion-maestras-detalle/administracion-maestras-detalle.component';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AdministracionMaestrasDetalleComponent],
  imports: [
    CommonModule,
    NgbTabsetModule
  ],
  exports:[ AdministracionMaestrasDetalleComponent]
})
export class AdministracionMaestrasComponentesModule { }
