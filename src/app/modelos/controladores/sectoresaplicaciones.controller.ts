import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';
import { GenericoModel } from './generico.model';

import { SectoresaplicacionesInterface } from '@interfaces/sectoresaplicaciones.interface';

export class SectoresaplicacionesController extends GenericoModel{

  registros: SectoresaplicacionesInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "sectoresaplicaciones";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();

  }  

}
