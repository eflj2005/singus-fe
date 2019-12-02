import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponentesListaComponent } from './usuarios-componentes-lista/usuarios-componentes-lista.component';
import { UsuariosComponentesProcesarComponent } from './usuarios-componentes-procesar/usuarios-componentes-procesar.component';
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [UsuariosComponentesListaComponent, UsuariosComponentesProcesarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,

  ],
  exports:[ UsuariosComponentesProcesarComponent, UsuariosComponentesListaComponent ]
})
export class UsuariosComponentesModule { }
