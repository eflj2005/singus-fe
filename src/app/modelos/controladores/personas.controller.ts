import { HttpClient } from '@angular/common/http';

import { PersonasInterface } from '@interfaces/personas.interface';

import { AmbienteService } from '@servicios/ambiente.service';

import { GenericoModel } from './generico.model';
import { TiposdocumentosController } from './tiposdocumentos.controller';
import { MunicipiosController } from './municipios.controller';

export class PersonasController extends GenericoModel {

  registros: PersonasInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService 
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "personas";
    this.fechasDefinidas = ["nacimiento_fecha","actualizacion_fecha"];

    this.DetectarCampos().subscribe();

    this.AgregarForanea( new TiposdocumentosController(instanciaHttpClient,InstanciaAmbienteService)  );
    this.AgregarForanea( new MunicipiosController(instanciaHttpClient,InstanciaAmbienteService)  );
  }  

}
