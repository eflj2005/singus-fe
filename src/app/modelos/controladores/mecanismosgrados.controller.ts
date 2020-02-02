import { HttpClient } from '@angular/common/http';

import { GenericoModel } from './generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { MecanismosgradosInterface } from '@interfaces/mecanismosgrados.interface';

export class MecanismosgradosController extends GenericoModel {

  registros: MecanismosgradosInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "mecanismosgrados";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();
  }

}