import { HttpClient } from '@angular/common/http';
import { GenericoModel } from '@controladores/generico.model';
import { AmbienteService } from '@servicios/ambiente.service';
import { CoordinadoresInterface } from '@interfaces/coordinadores.interface';


export class CoordinadoresController extends GenericoModel {
    
  registros: CoordinadoresInterface[]= [];
  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "coordinadores";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();
  }

}
