import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './usuarios/login/login.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { RegitroAdministradorComponent } from './usuarios/regitro-administrador/regitro-administrador.component';
import { InicioSesionComponent } from './usuarios/inicio-sesion/inicio-sesion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegitroAdministradorComponent,
    InicioSesionComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
