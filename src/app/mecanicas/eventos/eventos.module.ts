import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EventosPrincipalComponent } from './eventos-principal/eventos-principal.component';
import { EventosComponentesModule } from "./eventos-componentes/eventos-componentes.module";
import { EventosComponentesListaComponent } from "./eventos-componentes/eventos-componentes-lista/eventos-componentes-lista.component";
import { EventosComponentesEditarComponent } from "./eventos-componentes/eventos-componentes-editar/eventos-componentes-editar.component";

const rutas: Routes =[
  
  { path:'', component: EventosPrincipalComponent  , children:[
    { path:'lista', component: EventosComponentesListaComponent },
    { path:'editar', component: EventosComponentesEditarComponent },
  ]}
];



@NgModule({
  declarations: [EventosPrincipalComponent],
  imports: [
    CommonModule,
    EventosComponentesModule,
    RouterModule.forChild(rutas)  
  ],
  exports: [ RouterModule ]
})
export class EventosModule { }
