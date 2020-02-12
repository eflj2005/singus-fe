import { HttpClient } from '@angular/common/http';

import { EstudiosInterface } from '@interfaces/estudios.interface';

import { AmbienteService } from '@servicios/ambiente.service';

import { GenericoModel } from './generico.model';

import { PersonasController } from './personas.controller';
import { ProgramasController } from './programas.controller';
import { CohortesController } from './cohortes.controller';
import { TiposestudiosController } from './tiposestudios.controller';
import { TitulosController } from './titulos.controller';
import { SedesController } from './sedes.controller';
import { MecanismosgradosController } from './mecanismosgrados.controller';



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
    this.AgregarForanea( new ProgramasController(instanciaHttpClient,InstanciaAmbienteService)  );
    this.AgregarForanea( new CohortesController(instanciaHttpClient,InstanciaAmbienteService)  );
    this.AgregarForanea( new TiposestudiosController(instanciaHttpClient,InstanciaAmbienteService)  );
    this.AgregarForanea( new TitulosController(instanciaHttpClient,InstanciaAmbienteService)  );
    this.AgregarForanea( new SedesController(instanciaHttpClient,InstanciaAmbienteService)  );
    this.AgregarForanea( new MecanismosgradosController(instanciaHttpClient,InstanciaAmbienteService)  );
  }  

}
