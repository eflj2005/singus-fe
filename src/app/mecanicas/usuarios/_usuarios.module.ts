import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosPrincipalComponent } from './usuarios-principal/usuarios-principal.component';
import { UsuariosComponentesModule } from "@mecanicas/usuarios/usuarios-componentes/usuarios-componentes.module";
import { UsuariosComponentesListaComponent } from './usuarios-componentes/usuarios-componentes-lista/usuarios-componentes-lista.component';
import { UsuariosComponentesProcesarComponent } from './usuarios-componentes/usuarios-componentes-procesar/usuarios-componentes-procesar.component';
import { GeneralesModule } from '@generales/_generales.module';
import { CambiarClaveComponent } from '@generales/cambiar-clave/cambiar-clave.component';


const rutas: Routes =[
  
  { path:'', component: UsuariosPrincipalComponent , children:[
    { path:'lista', component: UsuariosComponentesListaComponent},
    { path:'procesar', component: UsuariosComponentesProcesarComponent },
    { path:'cambiarclave', component: CambiarClaveComponent },
  ]}
];


@NgModule({
  declarations: [UsuariosPrincipalComponent],
  imports: [
    CommonModule,
    UsuariosComponentesModule,
    GeneralesModule,
    RouterModule.forChild(rutas)    
  ],
  exports: [ RouterModule ]
  
})
export class UsuariosModule { }
