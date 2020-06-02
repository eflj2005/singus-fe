import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';
import { GenericoModel } from './generico.model';

import { ReconocimientosInterface } from '@interfaces/reconocimientos.interface';
import { PersonasController } from './personas.controller';

export class ReconocimientosController extends GenericoModel{

  registros: ReconocimientosInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "reconocimientos";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();

    this.AgregarForanea( new PersonasController(instanciaHttpClient,InstanciaAmbienteService) );

  }

}
