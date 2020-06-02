import { HttpClient } from '@angular/common/http';
import { GenericoModel } from '@controladores/generico.model';
import { AmbienteService } from '@servicios/ambiente.service';
import { ResponsablesInterface } from '@interfaces/responsables.interface';



export class ResponsablesController extends GenericoModel {

    registros: ResponsablesInterface[]= [];

    constructor( 
        private instanciaHttpClient :HttpClient,
        private InstanciaAmbienteService :AmbienteService    
      ) {
        super(instanciaHttpClient,InstanciaAmbienteService);
    
        this.nombreTabla = "responsables";
        this.fechasDefinidas = [];
    
        this.DetectarCampos().subscribe();
      }

}
