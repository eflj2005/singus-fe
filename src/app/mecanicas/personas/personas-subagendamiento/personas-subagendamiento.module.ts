import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonasSubagendamientoPrincipalComponent } from './personas-subagendamiento-principal/personas-subagendamiento-principal.component';
import { PersonasSubagendamientoComponentesModule } from './personas-subagendamiento-componentes/personas-subagendamiento-componentes.module';



@NgModule({
  declarations: [PersonasSubagendamientoPrincipalComponent],
  imports: [
    CommonModule,
    PersonasSubagendamientoComponentesModule
  ]
})
export class PersonasSubagendamientoModule { }
