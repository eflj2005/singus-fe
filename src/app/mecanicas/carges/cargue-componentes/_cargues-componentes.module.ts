import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarguesComponentesPrecargarComponent } from './cargues-componentes-precargar/cargues-componentes-precargar.component';
import { NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { CarguesComponentesAnalizartipo1Component } from './cargues-componentes-analizartipo1/cargues-componentes-analizartipo1.component';
import { FormsModule } from '@angular/forms';
import { CargesComponentesProcesarComponent } from './carges-componentes-procesar/carges-componentes-procesar.component';



@NgModule({
  declarations: [
    CarguesComponentesPrecargarComponent, 
    CarguesComponentesAnalizartipo1Component, 
    CargesComponentesProcesarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgbPopoverModule
  ],
  exports: [
    CarguesComponentesPrecargarComponent,
    CarguesComponentesAnalizartipo1Component,
    CargesComponentesProcesarComponent
  ]
})
export class CargueComponentesModule { }
