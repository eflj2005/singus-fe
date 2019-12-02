import { HttpClient } from '@angular/common/http';

import { GenericoModel } from '@modelos/generico.model';
import { AreaInterface } from '@modelos/interfaces/area.interface';
import { AmbienteService } from '@servicios/ambiente.service';

export class CiudadesController extends GenericoModel {

  registros: AreaInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.tablaObjetivo = "ciudades";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();

  }

}
