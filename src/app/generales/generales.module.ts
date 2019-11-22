import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';

import { FormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ArrayFilterPipe } from './arrayfilter.pipe';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  declarations: [
    CambiarClaveComponent,
    ArrayFilterPipe,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbAlertModule,
  
  ],
  exports: [
    CambiarClaveComponent,
    ArrayFilterPipe
  ]
})
export class GeneralesModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GeneralesModule,
      providers: [  ]
    };
  }
}