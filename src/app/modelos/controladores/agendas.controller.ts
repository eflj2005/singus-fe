import { HttpClient } from '@angular/common/http';

import { GenericoModel } from '@controladores/generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { AgendasInterface } from '@interfaces/agendas.interface'

export class AgendasController extends GenericoModel {
 
    registros: AgendasInterface[]= [];
    
    constructor( 
        private instanciaHttpClient :HttpClient,
        private InstanciaAmbienteService :AmbienteService    
      ) {
        super(instanciaHttpClient,InstanciaAmbienteService);
    
        this.nombreTabla = "agendas";
        this.fechasDefinidas = [];
    
        this.DetectarCampos().subscribe();

        //OJO Por relaciones anidadas solo se puede aplicar en donde se va a utilizar de lo contrario se genera
        //asignaciónes de foraneas en ciclo infinito
        //this.AgregarForanea( new AgendasController(instanciaHttpClient,InstanciaAmbienteService)  );

      }
}
