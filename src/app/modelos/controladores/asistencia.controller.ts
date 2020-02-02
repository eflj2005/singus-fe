import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AmbienteService } from '@servicios/ambiente.service';
import { GenericoModel } from './generico.model';
import { EventosController } from "@controladores/eventos.controller";
import { PersonasController } from "@controladores/personas.controller";

export class AsistenciaController extends GenericoModel {

     registros: any[] = [];

    constructor( 
      private instanciaHttpClient :HttpClient,
      private InstanciaAmbienteService :AmbienteService 
    ) {
      super(instanciaHttpClient,InstanciaAmbienteService);
  
      this.nombreTabla = "asistencias";

      this.DetectarCampos().subscribe();

      this.AgregarForanea( new EventosController(instanciaHttpClient,InstanciaAmbienteService)  );
      this.AgregarForanea( new PersonasController(instanciaHttpClient,InstanciaAmbienteService)  );
  
    }
  
}
