import { HttpClient } from '@angular/common/http';

import { GenericoModel } from './generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { ProgramasInterface } from '@interfaces/programas.interface';

export class ProgramasController extends GenericoModel {

  registros: ProgramasInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "programas";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();
  }

}