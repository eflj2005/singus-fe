import { HttpClient } from '@angular/common/http';

import { GenericoModel } from './generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { AreaInterface } from '@interfaces/area.interface';

export class AreasController extends GenericoModel {

  registros: AreaInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "areas";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();
  }

}
