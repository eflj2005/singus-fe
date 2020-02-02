import { HttpClient } from '@angular/common/http';

import { GenericoModel } from './generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { TiposcontratosInterface } from '@interfaces/tiposcontratos.interface';

export class TiposcontratosController extends GenericoModel {

  registros: TiposcontratosInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "tiposcontratos";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();
  }

}