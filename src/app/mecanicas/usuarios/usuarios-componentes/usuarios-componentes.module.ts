import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponentesListaComponent } from './usuarios-componentes-lista/usuarios-componentes-lista.component';
import { UsuariosComponentesCrearComponent } from './usuarios-componentes-crear/usuarios-componentes-crear.component';
import { UsuariosComponentesEditarComponent } from './usuarios-componentes-editar/usuarios-componentes-editar.component';



@NgModule({
  declarations: [UsuariosComponentesListaComponent, UsuariosComponentesCrearComponent, UsuariosComponentesEditarComponent],
  imports: [
    CommonModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTypeaheadModule 
  ],
  exports:[ UsuariosComponentesEditarComponent ,  UsuariosComponentesCrearComponent, UsuariosComponentesListaComponent ]
})
export class UsuariosComponentesModule { }
