import { NgModule } from '@angular/core';
import { UsuariosModule } from "@app/mecanicas/usuarios/_usuarios.module";
import { CommonModule } from '@angular/common';
import { CargeModule } from "@mecanicas/carge/carge.module";
import { EventosModule } from "@mecanicas/eventos/eventos.module";
import { DashboardModule} from '@mecanicas/dashboard/dashboard.module';
import { InicioModule } from "@mecanicas/inicio/inicio.module";
import { PersonasModule} from '@mecanicas/personas/personas.module';
import { MaestrasModule } from "@app/mecanicas/maestras/_maestras.module";
import { ComunicacionesModule } from './comunicaciones/comunicaciones.module';




@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    InicioModule,
    DashboardModule,
    PersonasModule,
    CargeModule,
    EventosModule,
    MaestrasModule,
    UsuariosModule,
    ComunicacionesModule
  ]
})
export class MecanicasModule { }
