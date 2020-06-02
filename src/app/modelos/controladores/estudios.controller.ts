import { HttpClient } from '@angular/common/http';

import { EstudiosInterface } from '@interfaces/estudios.interface';

import { AmbienteService } from '@servicios/ambiente.service';

import { GenericoModel } from './generico.model';

import { PersonasController } from './personas.controller';
import { CohortesController } from './cohortes.controller';
import { TitulosController } from './titulos.controller';
import { MecanismosgradosController } from './mecanismosgrados.controller';
import { OfertasController } from './ofertas.controller';
import { SedesController } from './sedes.controller';

export class EstudiosController extends GenericoModel {

  registros: EstudiosInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService 
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "estudios";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();

    this.AgregarForanea( new PersonasController(instanciaHttpClient,InstanciaAmbienteService)  );   
    this.AgregarForanea( new CohortesController(instanciaHttpClient,InstanciaAmbienteService)  );
    this.AgregarForanea( new TitulosController(instanciaHttpClient,InstanciaAmbienteService)  );
    this.AgregarForanea( new MecanismosgradosController(instanciaHttpClient,InstanciaAmbienteService)  );
    this.AgregarForanea( new OfertasController(instanciaHttpClient,InstanciaAmbienteService)  );
    this.AgregarForanea( new SedesController(instanciaHttpClient,InstanciaAmbienteService)  );
    
  }  

}
