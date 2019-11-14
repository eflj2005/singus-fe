import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericoControlador } from "./generico.modelo";
import { UsuariosControlador  } from "./usuarios.modelo";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GenericoControlador,
    UsuariosControlador,
  ]
})
export class ModelosModule { }
