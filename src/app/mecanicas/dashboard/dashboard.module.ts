import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPrincipalComponent } from './dashboard-principal/dashboard-principal.component';
import {DashboardComponentesModule} from '@mecanicas/dashboard/dashboard-componentes/dashboard-componentes.module'
import { RouterModule, Routes } from '@angular/router';
import { PersonasActualizacionPrincipalComponent } from '@mecanicas/personas/personas-actualizacion/personas-actualizacion-principal/personas-actualizacion-principal.component';
import { PersonasAgendamientoPrincipalComponent } from '../personas/personas-agendamiento/personas-agendamiento-principal/personas-agendamiento-principal.component';
import { AdministracionMaestrasPrincipalComponent } from "@mecanicas/administracion/administracion-maestras/administracion-maestras-principal/administracion-maestras-principal.component";
import { UsuariosPrincipalComponent } from "@mecanicas/usuarios/usuarios-principal/usuarios-principal.component";
//Rutas para redirecciones por url
const rutas: Routes =[
  
    { path:'', component: DashboardPrincipalComponent , children:[
      { path:'lista', component:PersonasActualizacionPrincipalComponent},
      { path:'agendamiento', component: PersonasAgendamientoPrincipalComponent },
      { path:'maestras', component: AdministracionMaestrasPrincipalComponent },
      { path:'usuarios', component: UsuariosPrincipalComponent }
    ]}

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
  declarations: [DashboardPrincipalComponent],
  imports: [
    CommonModule,
    DashboardComponentesModule,
    RouterModule.forChild(rutas)
  ]
})
export class DashboardModule { }
