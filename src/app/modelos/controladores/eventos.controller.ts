import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EventoInterface } from '@interfaces/eventos.interface';
import { RespuestaInterface } from '@interfaces/respuesta.interface';

import { AmbienteService } from '@servicios/ambiente.service';

import { GenericoModel } from './generico.model';



export class EventosController extends GenericoModel {

    registros: EventoInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService 
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "eventos";

    this.DetectarCampos().subscribe();

  }

 
}
