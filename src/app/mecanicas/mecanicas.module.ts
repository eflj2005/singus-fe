import { NgModule } from '@angular/core';
import { UsuariosModule } from "@mecanicas/usuarios/usuarios.module";
import { CommonModule } from '@angular/common';
import { DashboardModule} from '@mecanicas/dashboard/dashboard.module';
import { InicioModule } from "@mecanicas/inicio/inicio.module";
import { PersonasModule} from '@mecanicas/personas/personas.module';
import { MaestrasModule } from "@mecanicas/maestras/maestras.module";




@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    InicioModule,
    DashboardModule,
    PersonasModule,
    MaestrasModule,
    UsuariosModule
  ]
})
export class MecanicasModule { }
