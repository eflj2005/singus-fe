import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComunicacionesPrincipalComponent } from './comunicaciones-principal/comunicaciones-principal.component';
import { ComunicacionesComponentesModule } from './comunicaciones-componentes/comunicaciones-componentes.module';



@NgModule({
  declarations: [ComunicacionesPrincipalComponent],
  imports: [
    CommonModule,
    ComunicacionesComponentesModule
  ]
})
export class ComunicacionesModule { }
