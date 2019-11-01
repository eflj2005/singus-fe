import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LoginComponent } from './usuarios/login/login.component';
import { RegitroAdministradorComponent } from './usuarios/regitro-administrador/regitro-administrador.component';
import { ValidarCodigoComponent } from './usuarios/validar-codigo/validar-codigo.component';

//Rutas para redirecciones por url
const rutas: Routes =[
  
  { path:'', redirectTo:'login', pathMatch:'full' },

  { path:'login', component: LoginComponent }


/*

  { path:'login', component: LoginComponent, children:[
    { path:'validar_codigo', component: ValidarCodigoComponent}
    { path:'cambiar_clave', component: RegitroAdministradorComponent }    
  ]}


*/

  /*
      { path:'recuperarClave', component:RecuperarClaveComponent},
      { path:'codigoVerificacion', component:CodigoVerificacionComponent},
      { path:'restablecerClave', component:RestablecerClaveComponent}
      */
];



@NgModule({
  imports: [RouterModule.forRoot(rutas, {preloadingStrategy: PreloadAllModules, useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
