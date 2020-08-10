import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { AmbienteService } from '@servicios/ambiente.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import { CarguesController } from '@controladores/cargues.controller';

@Component({
  selector: 'app-cargues-principal',
  templateUrl: './cargues-principal.component.html',
  styleUrls: ['./cargues-principal.component.css']
})


export class CarguesPrincipalComponent implements OnInit  {

  private subscripcionRuta: Subscription;

  controladorCargues: CarguesController;
  controlVisual: { [indice:string] : any}; 

  constructor( 
    private servicioAmbiente : AmbienteService,
    private llamadoHttp : HttpClient,
    private utilidadFechas: DatePipe,
    private rutaActiva: ActivatedRoute,
    progreso: NgbProgressbarConfig
  ) { 

    progreso.max      = 100;
    progreso.striped  = true;
    progreso.animated = true;
    progreso.type     = 'info';
    progreso.height   = '20px';

    this.controlVisual ={
      progresoActual: 35, 
      pasoActualProgreso: 0,
      pasoActualValor: 1, 
      desactivarPasos: { anterior: false, siguiente: false, inicio: false },
      controlPasos: { anterior: false, siguiente: false }
    }

  }

  ngOnInit() {

    this.subscripcionRuta = this.rutaActiva.params.subscribe( parametros => {
      
      this.controladorCargues = new CarguesController(this.servicioAmbiente, this.llamadoHttp, parametros['tipo']);

      ///ACA BA TODA LA EJECOCIÖN INICIAL DEL COMPONENTE
    });    

  }

  ngOnDestroy() {
    this.subscripcionRuta.unsubscribe();
  }

  CambiarPaso( movimiento: number){

    console.log(this.controlVisual.pasoActualValor,"PasoAnt");
    var nuevoValor: number;

    nuevoValor = this.controlVisual.pasoActualValor;

    if( movimiento == 0 ){
      nuevoValor = 1;
    }
    else{
      let validacion:Boolean = true;
      if(movimiento == 1 && this.controlVisual.controlPasos.siguiente){
        validacion = confirm("¿Esta seguro de continuar?, la acción no podra ser reversada");
      }
      if(movimiento == -1 && this.controlVisual.controlPasos.anterior){
        validacion = confirm("¿Esta seguro de continuar?, la acción no podra ser reversada");
      }      
      if(validacion)  nuevoValor = nuevoValor + movimiento;
    }

    this.controlVisual.pasoActualValor = nuevoValor;
    console.log(this.controlVisual.pasoActualValor,"PasDes");
    
  }

}

