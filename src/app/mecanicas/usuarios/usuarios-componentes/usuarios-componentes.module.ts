import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponentesListaComponent } from './usuarios-componentes-lista/usuarios-componentes-lista.component';
import { UsuariosComponentesProcesarComponent } from './usuarios-componentes-procesar/usuarios-componentes-procesar.component';
import { UsuariosComponentesEditarComponent } from './usuarios-componentes-editar/usuarios-componentes-editar.component';
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [UsuariosComponentesListaComponent, UsuariosComponentesProcesarComponent, UsuariosComponentesEditarComponent],
  imports: [
    CommonModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    NgbTooltipModule,
    RouterModule
  ],
  exports:[ UsuariosComponentesEditarComponent ,  UsuariosComponentesProcesarComponent, UsuariosComponentesListaComponent ]
})
export class UsuariosComponentesModule { }
