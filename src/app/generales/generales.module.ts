import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';

import { FormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CambiarClaveComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbAlertModule
  ],
  exports: [
    CambiarClaveComponent
  ]
})
export class GeneralesModule { }
