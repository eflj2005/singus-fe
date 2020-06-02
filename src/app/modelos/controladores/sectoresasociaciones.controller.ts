import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';
import { GenericoModel } from './generico.model';

import { SectoresasociacionesInterface } from '@interfaces/sectoresasociaciones.interface';

export class SectoresasociacionesController extends GenericoModel{

  registros: SectoresasociacionesInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "sectoresasociaciones";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();

  }  

}
