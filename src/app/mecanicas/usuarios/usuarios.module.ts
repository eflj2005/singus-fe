import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosPrincipalComponent } from './usuarios-principal/usuarios-principal.component';
import { UsuariosComponentesModule } from "@mecanicas/usuarios/usuarios-componentes/usuarios-componentes.module";



@NgModule({
  declarations: [UsuariosPrincipalComponent],
  imports: [
    CommonModule,
    UsuariosComponentesModule
  ]
})
export class UsuariosModule { }
