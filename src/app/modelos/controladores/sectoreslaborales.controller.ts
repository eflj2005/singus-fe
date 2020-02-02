import { HttpClient } from '@angular/common/http';

import { GenericoModel } from './generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { SectoreslaboralesInterface } from '@interfaces/sectoreslaborales.interface';

export class SectoreslaboralesController extends GenericoModel {

  registros: SectoreslaboralesInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "sectoreslaborales";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();
  }

}