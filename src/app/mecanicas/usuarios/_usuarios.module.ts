import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosPrincipalComponent } from './usuarios-principal/usuarios-principal.component';
import { UsuariosComponentesModule } from "@mecanicas/usuarios/usuarios-componentes/usuarios-componentes.module";
import { UsuariosComponentesListaComponent } from './usuarios-componentes/usuarios-componentes-lista/usuarios-componentes-lista.component';
import { UsuariosComponentesProcesarComponent } from './usuarios-componentes/usuarios-componentes-procesar/usuarios-componentes-procesar.component';


const rutas: Routes =[
  
  { path:'', component: UsuariosPrincipalComponent , children:[
    { path:'lista', component: UsuariosComponentesListaComponent},
    { path:'procesar', component: UsuariosComponentesProcesarComponent },
  ]}
];


@NgModule({
  declarations: [UsuariosPrincipalComponent],
  imports: [
    CommonModule,
    UsuariosComponentesModule,
    RouterModule.forChild(rutas)    
  ],
  exports: [ RouterModule ]
  
})
export class UsuariosModule { }
