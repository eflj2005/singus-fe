import { HttpClient } from '@angular/common/http';

import { ExperienciasInterface } from '@interfaces/experiencias.interface';

import { AmbienteService } from '@servicios/ambiente.service';

import { GenericoModel } from './generico.model';

import { PersonasController } from './personas.controller';
import { EstudiosController } from './estudios.controller';
import { SectoreslaboralesController } from './sectoreslaborales.controller';
import { TiposdocumentosController } from './tiposdocumentos.controller';
import { RangosingresosController } from './rangosingresos.controller';
import { MunicipiosController } from './municipios.controller';
import { TiposcontratosController } from './tiposcontratos.controller';


export class ExperienciasController extends GenericoModel {

  registros: ExperienciasInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService 
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "experiencias";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();

    this.AgregarForanea( new PersonasController(instanciaHttpClient,InstanciaAmbienteService)  );   
    this.AgregarForanea( new EstudiosController(instanciaHttpClient,InstanciaAmbienteService)  );
    this.AgregarForanea( new SectoreslaboralesController(instanciaHttpClient,InstanciaAmbienteService)  );
    this.AgregarForanea( new TiposcontratosController(instanciaHttpClient,InstanciaAmbienteService)  );
    this.AgregarForanea( new RangosingresosController(instanciaHttpClient,InstanciaAmbienteService)  );
    this.AgregarForanea( new MunicipiosController(instanciaHttpClient,InstanciaAmbienteService)  );
    
  }  

}
