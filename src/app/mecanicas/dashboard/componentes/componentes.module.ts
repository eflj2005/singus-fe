import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { MenuComponent } from './menu/menu.component';
import { WorkspaceComponent } from './workspace/workspace.component';



@NgModule({
  declarations: [EncabezadoComponent, MenuComponent, WorkspaceComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentesModule { }
