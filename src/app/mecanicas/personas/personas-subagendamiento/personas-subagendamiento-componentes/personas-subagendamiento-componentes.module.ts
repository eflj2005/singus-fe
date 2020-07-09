import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonasSubagendamientoComponentesArbolesComponent } from './personas-subagendamiento-componentes-arboles/personas-subagendamiento-componentes-arboles.component';
import { PersonasSubagendamientoComponentesListaComponent } from './personas-subagendamiento-componentes-lista/personas-subagendamiento-componentes-lista.component';
import { PersonasSubagendamientoComponentesProcesarComponent } from './personas-subagendamiento-componentes-procesar/personas-subagendamiento-componentes-procesar.component';
import { FormsModule } from '@angular/forms';
import { PersonasActualizacionComponentesModule } from '@mecanicas/personas/personas-actualizacion/personas-actualizacion-componentes/personas-actualizacion-componentes.module';
import { PersonasActualizacionInformacionComponent } from '@mecanicas/personas/personas-actualizacion/personas-actualizacion-componentes/personas-actualizacion-informacion/personas-actualizacion-informacion.component';




@NgModule({
  declarations: [PersonasSubagendamientoComponentesArbolesComponent, PersonasSubagendamientoComponentesListaComponent, PersonasSubagendamientoComponentesProcesarComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    PersonasActualizacionComponentesModule
  ],
  entryComponents: [PersonasSubagendamientoComponentesProcesarComponent, PersonasActualizacionInformacionComponent],
  exports:  [
    PersonasSubagendamientoComponentesArbolesComponent,
    PersonasSubagendamientoComponentesListaComponent,
    PersonasSubagendamientoComponentesProcesarComponent
  ]
})
export class PersonasSubagendamientoComponentesModule { }
