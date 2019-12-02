import { NgModule } from '@angular/core';
import { UsuariosModule } from "@app/mecanicas/usuarios/_usuarios.module";
import { CommonModule } from '@angular/common';
import { DashboardModule} from '@mecanicas/dashboard/dashboard.module';
import { InicioModule } from "@mecanicas/inicio/inicio.module";
import { PersonasModule} from '@mecanicas/personas/personas.module';
import { MaestrasModule } from "@app/mecanicas/maestras/_maestras.module";




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
