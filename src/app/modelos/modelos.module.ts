import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosController } from './usuarios.controller'
import { AreasController } from './areas.controller';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    UsuariosController,
    AreasController
  ]
})
export class ModelosModule { }
