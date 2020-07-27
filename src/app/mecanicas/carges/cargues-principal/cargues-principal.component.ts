import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { AmbienteService } from '@servicios/ambiente.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cargues-principal',
  templateUrl: './cargues-principal.component.html',
  styleUrls: ['./cargues-principal.component.css']
})


export class CarguesPrincipalComponent implements OnInit  {

  tipoCargue: number;
  private subscripcionRuta: Subscription;

  caracteristicasCargues: { [indice:string] : any}[] = []; 
  controlCargue: { [indice:string] : any}; 

  constructor( 
    private servicioAmbiente : AmbienteService,
    private llamadoHttp : HttpClient,
    private utilidadFechas: DatePipe,
    private rutaActiva: ActivatedRoute
  ) { 

    this.caracteristicasCargues.push({
      tipo: 1,
      estructura: [ "RECTORIA", "NOMBRE_RECTORIA", "SEDE", "DESCRIPCION_SEDE", "SPRIDEN_ID", "TIPO_DOCUMENTO", "DOCUMENTO", "APELLIDOS", "P_NOMBRE", "S_NOMBRE", "SECUENCIA", "FACULTAD", "PROGRAMA", "NOMBRE_PROGRAMA", "PROGRAMAS_ACREDITADOS", "CARRERA", "CIUDAD_EXP_DOC", "GENERO", "STATUS_RESUL", "FEC_CAMBIO_STATUS", "EDAD", "NIVEL", "JORNADA_DESC", "TEL_RE", "TEL_TR", "TEL_CEL", "MAIL_ESTU", "CREDITOS_TOTAL_INSCRITOS", "CREDITOS_TOTAL_APROBADOS", "PROMEDIO", "STATUS_GRADO", "PER_GRADO", "ANIO_GRADO", "FECHA_GRADO", "ACTA_GRADO", "LIBRO", "FOLIO", "N_DIPLOMA", "SHRDGIH_HONR_CODE" ],
      tituloProceso : "Graduados - Argos", 
    });
    this.caracteristicasCargues.push({
      tipo: 2,
      estructura: [ "RECTORIA", "NOMBRE_RECTORIA", "SEDE", "DESCRIPCION_SEDE", "SPRIDEN_ID", "TIPO_DOCUMENTO", "DOCUMENTO", "APELLIDOS", "P_NOMBRE", "S_NOMBRE", "SECUENCIA", "FACULTAD", "PROGRAMA", "NOMBRE_PROGRAMA", "PROGRAMAS_ACREDITADOS", "CARRERA", "CIUDAD_EXP_DOC", "GENERO", "STATUS_RESUL", "FEC_CAMBIO_STATUS", "EDAD", "NIVEL", "JORNADA_DESC", "TEL_RE", "TEL_TR", "TEL_CEL", "MAIL_ESTU", "CREDITOS_TOTAL_INSCRITOS", "CREDITOS_TOTAL_APROBADOS", "PROMEDIO", "STATUS_GRADO", "PER_GRADO", "ANIO_GRADO", "FECHA_GRADO", "ACTA_GRADO", "LIBRO", "FOLIO", "N_DIPLOMA", "SHRDGIH_HONR_CODE" ],
      tituloProceso : "Graduados - SAP", 
    });

    this.controlCargue ={
      caracteristicas: null,
      datos: [],
      progresoActual: 35, 
      pasoActualValor: 1, 
      pasoActualProgreso: 0 
    }

  }

  ngOnInit() {

    this.subscripcionRuta = this.rutaActiva.params.subscribe( parametros => {
      this.tipoCargue = parametros['tipo']; 

      console.log ( this.tipoCargue , "TipoRecibido" ); 

      this.controlCargue.caracteristicas =  this.caracteristicasCargues.find( elemento => { return  ( elemento.tipo == this.tipoCargue )  } );

      console.log ( this.controlCargue , "control" ); 

      ///ACA BA TODA LA EJECOCIÖN INICIAL DEL COMPONENTE
    });    

  }

  ngOnDestroy() {
    this.subscripcionRuta.unsubscribe();
  }

}

