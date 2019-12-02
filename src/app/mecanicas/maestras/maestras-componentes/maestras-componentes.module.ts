import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaestrasComponentesListaComponent } from './maestras-componentes-lista/maestras-componentes-lista.component';
import { MaestrasComponentesProcesarComponent } from './maestras-componentes-procesar/maestras-componentes-procesar.component';


@NgModule({
  declarations: [MaestrasComponentesListaComponent, MaestrasComponentesProcesarComponent],
  imports: [
    CommonModule,
    FormsModule ,
    ReactiveFormsModule,
    NgbModule
  ],
  entryComponents: [MaestrasComponentesProcesarComponent],
  exports:[ MaestrasComponentesListaComponent, MaestrasComponentesProcesarComponent ]
})
export class MaestrasComponentesModule { }
