import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { AmbienteService } from '@servicios/ambiente.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { TiposdocumentosController } from '@controladores/tiposdocumentos.controller';
import { TiposdocumentosInterface } from '@interfaces/tiposdocumentos.interface';
import { MunicipiosController } from '@controladores/municipios.controller';
import { MunicipiosInterface } from '@interfaces/municipios.interface';
import { ProgramasController } from '@controladores/programas.controller';
import { ProgramasInterface } from '@interfaces/programas.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cargue-principal',
  templateUrl: './cargue-principal.component.html',
  styleUrls: ['./cargue-principal.component.css']
})


export class CarguePrincipalComponent implements OnInit  {

  tipoCargue: number;

  private subscripcionRuta: any;

  constructor( 
    private servicioAmbiente : AmbienteService,
    private llamadoHttp : HttpClient,
    private utilidadFechas: DatePipe,
    private rutaActiva: ActivatedRoute
  ) { 

  }

  ngOnInit() {

    this.subscripcionRuta = this.rutaActiva.params.subscribe( parametros => {
      this.tipoCargue = parametros['tipo']; 

      console.log ( this.tipoCargue , "TipoRecibido" ); 

      ///ACA BA TODA LA EJECOCIÖN INICIAL DEL COMPONENTE
    });    

  }

  ngOnDestroy() {
    this.subscripcionRuta.unsubscribe();
  }

}