import { HttpClient } from '@angular/common/http';

import { GenericoModel } from './generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { RangosingresosInterface } from '@interfaces/rangosingresos.interface';

export class RangosingresosController extends GenericoModel {

  registros: RangosingresosInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "rangosingresos";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();
  }

}