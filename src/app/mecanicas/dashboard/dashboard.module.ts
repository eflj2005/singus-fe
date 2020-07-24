import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPrincipalComponent } from './dashboard-principal/dashboard-principal.component';
import {DashboardComponentesModule} from '@mecanicas/dashboard/dashboard-componentes/dashboard-componentes.module'
import { RouterModule, Routes } from '@angular/router';
import {  CarguePrincipalComponent } from "@mecanicas/carge/cargue-principal/cargue-principal.component";
import { PersonasActualizacionPrincipalComponent } from '@mecanicas/personas/personas-actualizacion/personas-actualizacion-principal/personas-actualizacion-principal.component';
import { PersonasAgendamientoPrincipalComponent } from '../personas/personas-agendamiento/personas-agendamiento-principal/personas-agendamiento-principal.component';
import { MaestrasPrincipalComponent } from "@mecanicas/maestras/maestras-principal/maestras-principal.component";
import { UsuariosPrincipalComponent } from "@mecanicas/usuarios/usuarios-principal/usuarios-principal.component";
import { UsuariosComponentesListaComponent } from '../usuarios/usuarios-componentes/usuarios-componentes-lista/usuarios-componentes-lista.component';
import { UsuariosComponentesProcesarComponent } from '../usuarios/usuarios-componentes/usuarios-componentes-procesar/usuarios-componentes-procesar.component';
import { DashboardEstadisticasComponent } from './dashboard-componentes/dashboard-estadisticas/dashboard-estadisticas.component';
import { EventosPrincipalComponent } from "@mecanicas/eventos/eventos-principal/eventos-principal.component";
import { ReportesAlertasPrincipalComponent } from "@mecanicas/reportes/reportes-alertas/reportes-alertas-principal/reportes-alertas-principal.component";
import { ReportesPredefinidosPrincipalComponent } from "@mecanicas/reportes/reportes-predefinidos/reportes-predefinidos-principal/reportes-predefinidos-principal.component";
import { ReportesPersonalizadoPrincipalComponent } from "@mecanicas/reportes/reportes-personalizado/reportes-personalizado-principal/reportes-personalizado-principal.component";
import { AuditoriaPrincipalComponent } from "@mecanicas/auditoria/auditoria-principal/auditoria-principal.component";
import { PersonasSubagendamientoPrincipalComponent } from '@mecanicas/personas/personas-subagendamiento/personas-subagendamiento-principal/personas-subagendamiento-principal.component';
// import { ReportesModule } from "@mecanicas/reportes/reportes.module";
//Rutas para redirecciones por url
const rutas: Routes =[
  
    { path:'', component: DashboardPrincipalComponent , children:[
      { path:'estadisticas', component:DashboardEstadisticasComponent},
      { path:'personas', component:PersonasActualizacionPrincipalComponent},
      { path:'agendamiento', component: PersonasAgendamientoPrincipalComponent },
      { path:'subagendamiento', component: PersonasSubagendamientoPrincipalComponent },
      { path:'cargue/:tipo', component: CarguePrincipalComponent},
      { path: 'eventos',  component: EventosPrincipalComponent },
      { path:'maestras', component: MaestrasPrincipalComponent },
      { path: 'predefinidos', component: ReportesPredefinidosPrincipalComponent },
      { path: 'alertas', component: ReportesAlertasPrincipalComponent },
      { path: 'personalizados', component: ReportesPersonalizadoPrincipalComponent },
      { path: 'auditoria', component: AuditoriaPrincipalComponent },
      // { path: 'reportes', loadChildren: () => import('@mecanicas/reportes/reportes.module').then(m => m.ReportesModule) },
      { path: 'usuarios', loadChildren: () => import('@mecanicas/usuarios/_usuarios.module').then(m => m.UsuariosModule) }

      // { path:'usuarios', component: UsuariosPrincipalComponent }
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
