import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControladoresModule } from './controladores/_controladores.module';
import { InterfacesModule } from './interfaces/_interfaces.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ControladoresModule,
    InterfacesModule
  ],
  providers: [
  ]
})
export class ModelosModule {}
