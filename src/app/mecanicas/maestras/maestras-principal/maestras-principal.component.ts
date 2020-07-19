import { Component, OnInit } from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service'
import { HttpClient } from '@angular/common/http';




import { AreasController } from '@controladores/areas.controller';
import { TiposdocumentosController } from '@controladores/tiposdocumentos.controller';

import { CohortesController } from '@controladores/cohortes.controller';

import { ProgramasController } from '@controladores/programas.controller';
import { InstitucionesController } from '@controladores/instituciones.controller';
import { SedesController } from '@controladores/sedes.controller';

import { TiposestudiosController } from '@controladores/tiposestudios.controller';
import { TitulosController } from '@controladores/titulos.controller';
import { MecanismosgradosController } from '@controladores/mecanismosgrados.controller';

import { MunicipiosController } from '@controladores/municipios.controller';
import { DepartamentosController } from '@controladores/departamentos.controller';
import { PaisesController } from '@controladores/paises.controller';

import { SectoreslaboralesController } from '@controladores/sectoreslaborales.controller';
import { TiposcontratosController } from '@controladores/tiposcontratos.controller';
import { RangosingresosController } from '@controladores/rangosingresos.controller';
import { SectoresasociacionesController } from '@controladores/sectoresasociaciones.controller';
import { OfertasController } from '@controladores/ofertas.controller';
import { TiposobservacionesController } from '@controladores/tiposobservaciones.controller';





@Component({
  selector: 'app-maestras-principal',
  templateUrl: './maestras-principal.component.html',
  styleUrls: ['./maestras-principal.component.css']
})
export class MaestrasPrincipalComponent implements OnInit {

  controladorAreas: AreasController;
  controladorTiposDocumentos: TiposdocumentosController;
  
  controladorCohortes: CohortesController;

  controladorProgramas: ProgramasController;
  controladorInstituciones: InstitucionesController;
  controladorSedes: SedesController;

  controladorTiposestudios: TiposestudiosController;
  controladorTitulos: TitulosController;
  controladorMecanismosgrados: MecanismosgradosController;

  controladorMunicipios: MunicipiosController;
  controladorDepartamentos: DepartamentosController;
  controladorPaises: PaisesController;

  controladorSectoreslaborales: SectoreslaboralesController;
  controladorTiposcontratos: TiposcontratosController;
  controladorRangosingresos: RangosingresosController;

  controladorSectoresasociaciones: SectoresasociacionesController;

  controladorOfertas: OfertasController;

  controladorTiposobservaciones: TiposobservacionesController;

  constructor(
    private llamadoHttp: HttpClient,
    private servicioAmbiente: AmbienteService,
  ) { 
    
    this.controladorAreas = new AreasController(llamadoHttp,servicioAmbiente);
    this.controladorTiposDocumentos = new TiposdocumentosController(llamadoHttp,servicioAmbiente);

    this.controladorCohortes = new CohortesController(llamadoHttp,servicioAmbiente);

    this.controladorProgramas = new ProgramasController(llamadoHttp,servicioAmbiente);
    this.controladorInstituciones = new InstitucionesController(llamadoHttp,servicioAmbiente);
    this.controladorSedes = new SedesController(llamadoHttp,servicioAmbiente);

    this.controladorTiposestudios = new TiposestudiosController(llamadoHttp,servicioAmbiente);
    this.controladorTitulos = new TitulosController(llamadoHttp,servicioAmbiente);
    this.controladorMecanismosgrados = new MecanismosgradosController(llamadoHttp,servicioAmbiente);    

    this.controladorMunicipios = new MunicipiosController(llamadoHttp, servicioAmbiente);
    this.controladorDepartamentos = new DepartamentosController(llamadoHttp, servicioAmbiente);
    this.controladorPaises = new PaisesController(llamadoHttp, servicioAmbiente);
  
    this.controladorSectoreslaborales = new SectoreslaboralesController(llamadoHttp, servicioAmbiente);
    this.controladorTiposcontratos = new TiposcontratosController(llamadoHttp, servicioAmbiente); 
    this.controladorRangosingresos = new RangosingresosController(llamadoHttp, servicioAmbiente); 

    this.controladorSectoresasociaciones = new SectoresasociacionesController(llamadoHttp, servicioAmbiente); 

    this.controladorOfertas = new OfertasController(llamadoHttp, servicioAmbiente); 

    this.controladorTiposobservaciones = new TiposobservacionesController(llamadoHttp, servicioAmbiente); 
    
  }
  

  ngOnInit() {
  }

}
