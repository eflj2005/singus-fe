import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonasActualizacionPrincipalComponent } from './personas-actualizacion-principal/personas-actualizacion-principal.component';
import {PersonasActualizacionComponentesModule} from '@mecanicas/personas/personas-actualizacion/personas-actualizacion-componentes/personas-actualizacion-componentes.module';
import { ArrayFilterModule } from '@app/generales/arraytFilter.module';





@NgModule({
  declarations: [PersonasActualizacionPrincipalComponent],
  imports: [
    CommonModule,
    PersonasActualizacionComponentesModule,
    ArrayFilterModule
    
    
    
  ]
})
export class PersonasActualizacionModule { }
