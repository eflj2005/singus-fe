import { HttpClient } from '@angular/common/http';

import { GenericoModel } from './generico.model';
import { AmbienteService } from '@servicios/ambiente.service';
import { CohortesInterface } from '@interfaces/cohortes.interface';

export class CohortesController extends GenericoModel {

  registros: CohortesInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "cohortes";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();

  }

}