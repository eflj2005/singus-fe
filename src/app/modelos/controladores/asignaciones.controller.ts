import { HttpClient } from '@angular/common/http';

import { GenericoModel } from '@controladores/generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { AsignacionesInterface } from '@interfaces/asignaciones.interface';
import { AgendasController } from './agendas.controller';
import { UsuariosController } from './usuarios.controller';

export class AsignacionesController extends GenericoModel {
 
    registros: AsignacionesInterface[]= [];
    
    constructor( 
        private instanciaHttpClient :HttpClient,
        private InstanciaAmbienteService :AmbienteService    
      ) {
        super(instanciaHttpClient,InstanciaAmbienteService);
    
        this.nombreTabla = "asignaciones";
        this.fechasDefinidas = [];
    
        this.DetectarCampos().subscribe();

        this.AgregarForanea( new AgendasController(instanciaHttpClient,InstanciaAmbienteService)  );
        this.AgregarForanea( new UsuariosController(instanciaHttpClient,InstanciaAmbienteService)  );
      }
}
