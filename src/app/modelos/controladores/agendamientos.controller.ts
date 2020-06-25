import { HttpClient } from '@angular/common/http';

import { GenericoModel } from '@controladores/generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { AgendamientosInterface } from '@interfaces/agendamientos.interface';
import { AgendasController } from './agendas.controller';
import { SeguimientosController } from './seguimientos.controller';

export class AgendamientosController extends GenericoModel{
  
  registros: AgendamientosInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService 
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "agendamientos";
    this.fechasDefinidas = [];

    this.DetectarCampos().subscribe();

    this.AgregarForanea( new AgendasController(instanciaHttpClient,InstanciaAmbienteService)  );
    this.AgregarForanea( new SeguimientosController(instanciaHttpClient,InstanciaAmbienteService)  );
  }  

}
