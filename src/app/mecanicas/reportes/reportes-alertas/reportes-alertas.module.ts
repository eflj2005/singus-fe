import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesAlertasPrincipalComponent } from './reportes-alertas-principal/reportes-alertas-principal.component';
import { NgbTabsetModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import {  NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserModule } from '@angular/platform-browser';
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [ReportesAlertasPrincipalComponent],
  imports: [
    CommonModule,
    NgbTabsetModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    BrowserModule,
    NgbTooltipModule
  ]
})
export class ReportesAlertasModule { }
