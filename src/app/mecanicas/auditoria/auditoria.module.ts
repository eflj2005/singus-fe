import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditoriaPrincipalComponent } from './auditoria-principal/auditoria-principal.component';
import { NgbTabsetModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import {  NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserModule } from '@angular/platform-browser';
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import {  NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AuditoriaPrincipalComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgbTabsetModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    BrowserModule,
    NgbTooltipModule,
    NgbDropdownModule
  ]
})
export class AuditoriaModule { }
