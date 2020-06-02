
import { HttpClient } from '@angular/common/http';

import { GenericoModel } from '@controladores/generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import{AgendasInterface} from '@interfaces/agendas.interface'
import { CoordinadoresController } from '@controladores/coordinadores.controller';
import { ResponsablesController } from '@controladores/responsables.controller';

export class AgendasController extends GenericoModel {
 
    registros: AgendasInterface[]= [];
    
    constructor( 
        private instanciaHttpClient :HttpClient,
        private InstanciaAmbienteService :AmbienteService    
      ) {
        super(instanciaHttpClient,InstanciaAmbienteService);
    
        this.nombreTabla = "agendas";
        this.fechasDefinidas = ["inicial_fecha","final_fecha"];
    
        this.DetectarCampos().subscribe();

        this.AgregarForanea( new ResponsablesController(instanciaHttpClient,InstanciaAmbienteService)  );
        this.AgregarForanea( new CoordinadoresController(instanciaHttpClient,InstanciaAmbienteService)  );


      }
}
