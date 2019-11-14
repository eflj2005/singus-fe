import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';

import { ServiciosModule } from '@servicios/servicios.module';
import { GeneralesModule  } from '@generales/generales.module';
import { MecanicasModule } from '@mecanicas/mecanicas.module';

import { ModelosModule } from '@modelos/modelos.module'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    ServiciosModule,
    GeneralesModule,
    MecanicasModule,
    ModelosModule
  ],
  providers: [ 
    HttpClientModule
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
