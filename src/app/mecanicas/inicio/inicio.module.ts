import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralesModule } from '@app/generales/_generales.module';

import { InicioPrincipalComponent } from './inicio-principal/inicio-principal.component';

import { InicioComponentesModule } from './inicio-componentes/inicio-componentes.module';


@NgModule({
  declarations: [ InicioPrincipalComponent ],
  imports: [
    CommonModule, 
    InicioComponentesModule,
    GeneralesModule,
  ]
})
export class InicioModule { }
