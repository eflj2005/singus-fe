import { HttpClient } from '@angular/common/http';

import { GenericoModel } from './generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { CiudadesInterface } from '@interfaces/ciudades.interface';

export class MunicipiosController extends GenericoModel {

  registros: CiudadesInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "municipios";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();

  }

}
