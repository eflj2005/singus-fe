import { HttpClient } from '@angular/common/http';

import { GenericoModel } from './generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { TiposestudiosInterface } from '@interfaces/tiposestudios.interface';

export class TiposestudiosController extends GenericoModel {

  registros: TiposestudiosInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "tiposestudios";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();
  }

}