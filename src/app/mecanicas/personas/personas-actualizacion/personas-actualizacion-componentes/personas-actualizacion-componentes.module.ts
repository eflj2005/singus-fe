import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonasActualizacionListaComponent } from './personas-actualizacion-lista/personas-actualizacion-lista.component';
import { PersonasActualizacionInformacionComponent } from './personas-actualizacion-informacion/personas-actualizacion-informacion.component';
import { PersonasActualizacionDetalleComponent } from './personas-actualizacion-detalle/personas-actualizacion-detalle.component';




@NgModule({
  declarations: [
    PersonasActualizacionListaComponent,
    PersonasActualizacionInformacionComponent, 
    PersonasActualizacionDetalleComponent],
  imports: [
    FormsModule,
    NgbAlertModule,
    CommonModule
  ], exports: [
    PersonasActualizacionListaComponent,
    PersonasActualizacionInformacionComponent, 
    PersonasActualizacionDetalleComponent
  ]
})
export class PersonasActualizacionComponentesModule { }
