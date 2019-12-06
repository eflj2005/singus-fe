import { HttpClient } from '@angular/common/http';

import { GenericoModel } from '@modelos/generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { CiudadesInterface } from '../interfaces/ciudades.interface';

export class CiudadesController extends GenericoModel {

  registros: CiudadesInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "ciudades";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();

  }

}
