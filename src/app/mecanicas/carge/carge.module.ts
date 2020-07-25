import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarguePrincipalComponent } from './cargue-principal/cargue-principal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CargueComponentesModule } from './cargue-componentes/cargue-componentes.module';



@NgModule({
  declarations: [CarguePrincipalComponent],
  imports: [
    CommonModule,
    NgbModule,
    CargueComponentesModule
  ],
  exports :[CarguePrincipalComponent ]
})
export class CargeModule {
}
