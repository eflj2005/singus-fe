import { HttpClient } from '@angular/common/http';

import { GenericoModel } from './generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { SedesInterface } from '@interfaces/sedes.interface';
import { InstitucionesController } from './instituciones.controller';

export class SedesController extends GenericoModel {

  registros: SedesInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService    
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "sedes";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();

    this.AgregarForanea( new InstitucionesController(instanciaHttpClient,InstanciaAmbienteService)  );

  }

}
