import { HttpClient } from '@angular/common/http';

import { OfertasInterface } from '@interfaces/ofertas.interface';

import { AmbienteService } from '@servicios/ambiente.service';

import { GenericoModel } from './generico.model';
import { TiposestudiosController } from './tiposestudios.controller';
import { ProgramasController } from './programas.controller';
import { InstitucionesController } from './instituciones.controller';





export class OfertasController extends GenericoModel {

  registros: OfertasInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService 
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "ofertas";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();
    this.AgregarForanea( new TiposestudiosController(instanciaHttpClient,InstanciaAmbienteService)  );
    this.AgregarForanea( new ProgramasController(instanciaHttpClient,InstanciaAmbienteService)  );
    this.AgregarForanea( new InstitucionesController(instanciaHttpClient,InstanciaAmbienteService)  );

    
  }  

}
