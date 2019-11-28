import { NgModule } from '@angular/core';
import {  NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserModule } from '@angular/platform-browser';
import {  NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { GeneralesModule } from '@app/generales/_generales.module';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonasActualizacionListaComponent } from './personas-actualizacion-lista/personas-actualizacion-lista.component';
import { PersonasActualizacionInformacionComponent } from './personas-actualizacion-informacion/personas-actualizacion-informacion.component';
import { PersonasActualizacionDetalleComponent } from './personas-actualizacion-detalle/personas-actualizacion-detalle.component';




@NgModule({
  declarations: [
    PersonasActualizacionListaComponent,
    PersonasActualizacionInformacionComponent, 
    PersonasActualizacionDetalleComponent],
  imports: [
    FormsModule,
    NgbAlertModule,
    CommonModule,
    GeneralesModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    BrowserModule,
    NgbModule,
    NgbTooltipModule


  ], exports: [
    PersonasActualizacionListaComponent,
    PersonasActualizacionInformacionComponent, 
    PersonasActualizacionDetalleComponent
  ]
})
export class PersonasActualizacionComponentesModule { }
