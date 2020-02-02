import { HttpClient } from '@angular/common/http';

import { GenericoModel } from '@controladores/generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { CorreosInterface } from '@interfaces/correos.interface';

export class CorreosController extends GenericoModel {

  registros: CorreosInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "correos";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();
  }

}