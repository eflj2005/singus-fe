import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { InicioLoguearComponent } from './inicio-loguear/inicio-loguear.component';
import { InicioRegistrarAdministradorComponent } from './inicio-registrar-administrador/inicio-registrar-administrador.component';
import { InicioValidarCodigoComponent } from './inicio-validar-codigo/inicio-validar-codigo.component';
import { InicioCambiarClaveComponent } from './inicio-cambiar-clave/inicio-cambiar-clave.component';
import { InicioRecuperarClaveComponent } from './inicio-recuperar-clave/inicio-recuperar-clave.component';


@NgModule({
  declarations: [
    InicioLoguearComponent,     
    InicioRegistrarAdministradorComponent, 
    InicioValidarCodigoComponent,   
    InicioCambiarClaveComponent, 
    InicioRecuperarClaveComponent, 
  ],
  imports: [
    FormsModule,
    NgbAlertModule,
    CommonModule
  ], 
  exports: [
    InicioLoguearComponent,
    InicioRegistrarAdministradorComponent,     
    InicioValidarCodigoComponent,
    InicioCambiarClaveComponent, 
    InicioRecuperarClaveComponent, 
  
  ]
})
export class InicioComponentesModule { }
