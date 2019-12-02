import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventosComponentesListaComponent } from './eventos-componentes-lista/eventos-componentes-lista.component';
import { EventosComponentesCrearComponent } from './eventos-componentes-crear/eventos-componentes-crear.component';
import { EventosComponentesEditarComponent } from './eventos-componentes-editar/eventos-componentes-editar.component';
import {  NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserModule } from '@angular/platform-browser';
import {  NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [EventosComponentesListaComponent, EventosComponentesCrearComponent, EventosComponentesEditarComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgbTooltipModule,
    NgbDropdownModule,
    FormsModule, 
    ReactiveFormsModule,
    NgbTypeaheadModule, 
    BrowserModule

  ],
  exports: [EventosComponentesListaComponent, EventosComponentesCrearComponent, EventosComponentesEditarComponent]
})
export class EventosComponentesModule { }
