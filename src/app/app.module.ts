import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ServiciosModule } from '@servicios/servicios.module';
import { GeneralesModule  } from '@generales/_generales.module';
import { MecanicasModule } from '@mecanicas/mecanicas.module';

import { ModelosModule } from './modelos/_modelos.module'
import { ErrorInterceptorService } from '@servicios/error.interceptor';
import { JwtInterceptorService } from '@servicios/jwt.interceptor';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormControl } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ServiciosModule,
    GeneralesModule.forRoot(),
    MecanicasModule,
    ModelosModule,
    NgbModule,
    PDFExportModule,
    BrowserAnimationsModule  
  ],
  providers: [ 
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true  }
   ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
