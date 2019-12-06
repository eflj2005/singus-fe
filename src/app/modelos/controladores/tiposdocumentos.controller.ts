import { HttpClient } from '@angular/common/http';

import { GenericoModel } from '@modelos/generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { TiposdocumentosInterface } from '../interfaces/tiposdocumentos.interface';

export class TiposdocumentosController extends GenericoModel {

  registros: TiposdocumentosInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "tiposdocumentos";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();
  }

}
