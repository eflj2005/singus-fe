import { HttpClient } from '@angular/common/http';

import { GenericoModel } from '@controladores/generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { TelefonosInterface } from '@interfaces/telefonos.interface';

export class TelefonosController extends GenericoModel {

  registros: TelefonosInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "telefonos";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();
  }

}
