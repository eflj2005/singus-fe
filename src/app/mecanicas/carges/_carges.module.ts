import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarguesPrincipalComponent } from './cargues-principal/cargues-principal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CargueComponentesModule } from './cargue-componentes/_cargues-componentes.module';



@NgModule({
  declarations: [CarguesPrincipalComponent],
  imports: [
    CommonModule,
    NgbModule,
    CargueComponentesModule
  ],
  exports :[CarguesPrincipalComponent ]
})
export class CargesModule {
}
