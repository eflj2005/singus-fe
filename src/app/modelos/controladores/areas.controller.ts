import { HttpClient } from '@angular/common/http';

import { GenericoModel } from '@controladores/generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { AreasInterface } from '@interfaces/areas.interface';

export class AreasController extends GenericoModel {

  registros: AreasInterface[]= [];

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