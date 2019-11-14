import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModeloGenerico } from "./generico.modelo";
import { UsuariosControlador  } from "./usuarios.modelo";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModeloGenerico,
    UsuariosControlador,
  ]
})
export class ModelosModule { }
