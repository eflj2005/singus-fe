import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';
import { GenericoModel } from './generico.model';

import { AsociacionesInterface } from '@interfaces/asociaciones.interface';
import { PersonasController } from './personas.controller';
import { SectoresasociacionesController } from './sectoresasociaciones.controller';


export class AsociacionesController extends GenericoModel{

  registros: AsociacionesInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "asociaciones";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();

    this.AgregarForanea( new PersonasController(instanciaHttpClient,InstanciaAmbienteService) );
    this.AgregarForanea( new SectoresasociacionesController(instanciaHttpClient,InstanciaAmbienteService) );

  }

}
