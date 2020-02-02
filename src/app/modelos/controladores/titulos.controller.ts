

import { HttpClient } from '@angular/common/http';

import { GenericoModel } from './generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { TitulosInterface } from '@interfaces/titulos.interface';

export class TitulosController extends GenericoModel {

  registros: TitulosInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "titulos";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();
  }

}