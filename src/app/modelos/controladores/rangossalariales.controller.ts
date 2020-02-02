import { HttpClient } from '@angular/common/http';

import { GenericoModel } from './generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { RangossalarialesInterface } from '@interfaces/rangossalariales.interface';

export class RangossalarialesController extends GenericoModel {

  registros: RangossalarialesInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "rangossalariales";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();
  }

}