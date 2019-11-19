import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { InicioPrincipalComponent } from '@mecanicas/inicio/inicio-principal/inicio-principal.component';
import {DashboardPrincipalComponent} from '@app/mecanicas/dashboard/dashboard-principal/dashboard-principal.component';
import { DashboardWorkspaceComponent} from '@mecanicas/dashboard/dashboard-componentes/dashboard-workspace/dashboard-workspace.component';
import { CambiarClaveComponent } from './generales/cambiar-clave/cambiar-clave.component';
import { GuardianService } from './servicios/guardian.service';




//Rutas para redirecciones por url
const rutas: Routes =[
  
  { path:'', redirectTo:'dashboard', pathMatch:'full' },

  { path:'login', component: InicioPrincipalComponent , /* canActivate: [ GuardianService ] */},
  { path:'dashboard', component: DashboardPrincipalComponent , /* canActivate: [ GuardianService ] */},

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
