import { HttpClient } from '@angular/common/http';

import { MunicipiosInterface } from '@interfaces/municipios.interface';

import { AmbienteService } from '@servicios/ambiente.service';

import { GenericoModel } from './generico.model';
import { DepartamentosController } from './departamentos.controller';

export class MunicipiosController extends GenericoModel {

  registros: MunicipiosInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "municipios";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();

    this.AgregarForanea( new DepartamentosController(instanciaHttpClient,InstanciaAmbienteService) );

  }

}
