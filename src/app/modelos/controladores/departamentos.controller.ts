import { HttpClient } from '@angular/common/http';

import { DepartamentosInterface } from '@interfaces/departamentos.interface';

import { AmbienteService } from '@servicios/ambiente.service';

import { GenericoModel } from './generico.model';
import { PaisesController } from './paises.controller';

export class DepartamentosController extends GenericoModel {

  registros: DepartamentosInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService 
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "departamentos";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();

    this.AgregarForanea( new PaisesController(instanciaHttpClient,InstanciaAmbienteService) );
  }  

}
