import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { InicioPrincipalComponent } from '@mecanicas/inicio/inicio-principal/inicio-principal.component';
import {DashboardPrincipalComponent} from '@app/mecanicas/dashboard/dashboard-principal/dashboard-principal.component';


//Rutas para redirecciones por url
const rutas: Routes =[
  
  { path:'', redirectTo:'login', pathMatch:'full' },

  { path:'login', component: InicioPrincipalComponent },
  { path:'dashboard', component: DashboardPrincipalComponent }


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
