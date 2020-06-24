import { HttpClient } from '@angular/common/http';

import { GenericoModel } from '@controladores/generico.model';
import { AmbienteService } from '@servicios/ambiente.service';
import { SeguimientosInterface } from '@interfaces/seguimientos.interface';
import { PersonasController } from './personas.controller';
import { TiposobservacionesController } from './tiposobservaciones.controller';

export class SeguimientosController extends GenericoModel{
  
  registros: SeguimientosInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService 
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "seguimientos";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();

    this.AgregarForanea( new PersonasController(instanciaHttpClient,InstanciaAmbienteService)  );
    this.AgregarForanea( new TiposobservacionesController(instanciaHttpClient,InstanciaAmbienteService)  );
  }  

}
