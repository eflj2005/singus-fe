import { HttpClient } from '@angular/common/http';

import { GenericoModel } from './generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { InstitucionesInterface } from '@interfaces/Instituciones.interface';

export class InstitucionesController extends GenericoModel {

  registros: InstitucionesInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "instituciones";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();
  }

}