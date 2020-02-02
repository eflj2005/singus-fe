import { HttpClient } from '@angular/common/http';

import { GenericoModel } from './generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { PaisesInterface } from '@interfaces/paises.interface';

export class PaisesController extends GenericoModel {

  registros: PaisesInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "paises";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();
  }

}