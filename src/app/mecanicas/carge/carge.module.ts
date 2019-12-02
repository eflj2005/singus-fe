import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarguePrincipalComponent } from './cargue-principal/cargue-principal.component';
import { NgbPopoverModule  } from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [CarguePrincipalComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgbPopoverModule
   
  ],
  exports :[CarguePrincipalComponent ]
})
export class CargeModule {
}
