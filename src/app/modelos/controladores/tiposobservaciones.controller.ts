import { HttpClient } from '@angular/common/http';

import { GenericoModel } from '@controladores/generico.model';
import { AmbienteService } from '@servicios/ambiente.service';
import { TiposobservacionesInterface } from '@interfaces/tiposobservaciones.interface';

export class TiposobservacionesController extends GenericoModel{
  registros: TiposobservacionesInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService 
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "tiposobservaciones";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();

  }  

}
