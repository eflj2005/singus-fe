import { HttpClient } from '@angular/common/http';

import { GenericoModel } from '@controladores/generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { DireccionesInterface } from '@interfaces/direcciones.interface';
import { MunicipiosController } from './municipios.controller';

export class DireccionesController extends GenericoModel {

  registros: DireccionesInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "direcciones";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();

    this.AgregarForanea( new MunicipiosController(instanciaHttpClient,InstanciaAmbienteService) );
  }

}