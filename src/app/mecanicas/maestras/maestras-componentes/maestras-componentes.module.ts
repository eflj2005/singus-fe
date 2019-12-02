import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaestrasComponentesListaComponent } from './maestras-componentes-lista/maestras-componentes-lista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MaestrasComponentesListaComponent],
  imports: [
    CommonModule,
    FormsModule ,
    ReactiveFormsModule,
    NgbModule
  ],
  exports:[ MaestrasComponentesListaComponent ]
})
export class AdministracionMaestrasComponentesModule { }
