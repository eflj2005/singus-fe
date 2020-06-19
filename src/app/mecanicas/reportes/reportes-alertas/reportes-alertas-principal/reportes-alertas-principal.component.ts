import { Component, OnInit , PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Observable, from } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import {  AmbienteService} from '@servicios/ambiente.service';
import { PersonasInterface } from '@interfaces/personas.interface';
import { PersonasController } from '@controladores/personas.controller';
import { HttpClient } from '@angular/common/http';
import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { EstructuraConsultas } from '@generales/estructura-consultas';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// import { extendMoment } from 'moment-range';

import * as moment from 'moment';

interface ListaPersonas extends PersonasInterface{
  nombreCompleto: string;
  documento: number;
  idUniminuto: number; 
  nacimiento_fecha: string;
  programa : string ;
  actualizacion_fecha: string ;
  diasRestantesCumple: number;
  diasRestantesActualizacion: number;   

}



@Component({
  selector: 'app-reportes-alertas-principal',
  templateUrl: './reportes-alertas-principal.component.html',
  styleUrls: ['./reportes-alertas-principal.component.css'],
  providers: [DecimalPipe]
})
export class ReportesAlertasPrincipalComponent implements OnInit {

 
  personas$: Observable<ListaPersonas[]>;
  registros: ListaPersonas[];
  filter = new FormControl('');
  filter2 = new FormControl('');
  personas2$: Observable<ListaPersonas[]>;
  today: Date ;  
  tipoModal :number;

  controladorPersonas: PersonasController;

  constructor(private modal: NgbModal ,private pipe: DecimalPipe, private llamadoHttp : HttpClient,   private servicioAmbiente : AmbienteService,) { 
    
    this.controladorPersonas = new PersonasController(llamadoHttp,servicioAmbiente);
    this.registros=[];
    this.today = new Date();
    let caracteristicas  = new EstructuraConsultas();
    caracteristicas.AgregarColumna( null , "CONCAT( personas.nombres , ' ' , personas.apellidos )" , "nombreCompleto" );
    caracteristicas.AgregarColumna( "personas", "documento" , "documento");
    caracteristicas.AgregarColumna("personas", "iduniminuto", "idUniminuto");
    caracteristicas.AgregarColumna("personas", "nacimiento_fecha", "nacimineto_fecha");
    caracteristicas.AgregarColumna("personas", "actualizacion_fecha", "actualizacion_fecha");
    caracteristicas.AgregarColumna("programas", "descripcion", "programa");
    
    caracteristicas.AgregarEnlace( "estudios" ,  "personas" ,  "estudios" );
    caracteristicas.AgregarEnlace( "ofertas" ,  "ofertas" ,  "estudios" );
    caracteristicas.AgregarEnlace( "programas" ,  "programas" ,  "ofertas" );

    this.controladorPersonas.CargarDesdeDB(true, "A", caracteristicas ).subscribe(
      (respuesta: RespuestaInterface) =>{
        switch (respuesta.codigo){
          case 200:  
          this.registros = this.controladorPersonas.todos;
          this.Semaforo(this.registros);
          this.AplicarFiltros();


          break;
          default:
            alert("Error: "+respuesta.mensaje);
          break;
        }
      } 
    );

   

  }

  ngOnInit() {
    this.AplicarFiltros();
  
  }

  Semaforo(registros: ListaPersonas[]){
      let faltantes: number;
      let diasDespues: number;
      let hoy = new Date(this.today.getFullYear(),this.ElCero(this.today.getMonth()),this.ElCero(this.today.getDate()));
      let cumple : Date;
      let actualizacion : Date;
     for (let i = 0; i < registros.length; i++) {
       cumple = new Date(registros[i].nacimiento_fecha) ;
       cumple = this.CorrecionDia(cumple);
       actualizacion = new Date(registros[i].actualizacion_fecha)
       actualizacion = this.CorrecionDia(actualizacion);
       faltantes = this.CalculoDiasCumple(hoy,cumple);
       diasDespues = this.CalculoDiasActualizacion(hoy, actualizacion);
       registros[i].diasRestantesCumple = faltantes;
       registros[i].diasRestantesActualizacion = diasDespues;
     }

  }

  CalculoDiasCumple(fechaActual: Date , fechaFija: Date ){
      let faltantes : number ;
      if(fechaFija.getMonth() - fechaActual.getMonth() == 0){
        faltantes = fechaFija.getDate() - fechaActual.getDate();
        if (faltantes < 0) faltantes = 50;
      }else if (fechaFija.getMonth()==0 && fechaActual.getMonth() == 11) {
        faltantes =  (31 - fechaActual.getDate()) + fechaFija.getDate();
      } else if(fechaActual.getMonth() > fechaFija.getMonth() ){
        faltantes = 50;
        } else if(fechaFija.getMonth() - fechaActual.getMonth() >= 2) {
          faltantes =  50;
          }else if(!(fechaActual.getMonth() == 2)){
            faltantes  = (30 - fechaActual.getDate()) + fechaFija.getDate(); 
          }else{
            faltantes = (28 - fechaActual.getDate()) + fechaFija.getDate();
          }
    return faltantes;
  }

  CalculoDiasActualizacion(fechaActual: Date , fechaFija : Date){
    let diasDespues : number;
    let hoy = moment(fechaActual);
    let inicio = moment(fechaFija);
    diasDespues = hoy.diff(inicio);
    diasDespues = diasDespues/86400000
    return diasDespues;
  }

  CorrecionDia(fecha: Date){
    let correccion: Date;
    
    if(fecha.getMonth() == 2 && fecha.getDate() == 28) correccion = new Date(fecha.getFullYear(),fecha.getMonth(),fecha.getDate());
    else correccion = new Date(fecha.getFullYear(),fecha.getMonth(),fecha.getDate()+1);

    return correccion
  }

  AplicarFiltros(){
    this.personas$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.buscar(text, this.pipe ))
    )

    this.personas2$ = this.filter2.valueChanges.pipe(
      startWith(''),
      map(text => this.buscar(text, this.pipe))
    )
  }

  buscar(text: string , pipe: PipeTransform ): ListaPersonas[] {
      return this.registros.filter(persona => {
        const term = text.toLowerCase();
        return pipe.transform(persona.idUniminuto).includes(term)
            || pipe.transform(persona.documento).includes(term)
            || persona.nombreCompleto.toLowerCase().includes(term)
            || persona.programa.toLowerCase().includes(term)
            || persona.nacimiento_fecha.toLowerCase().includes(term)
            || persona.actualizacion_fecha.toLowerCase().includes(term);
      });
      
    }

    ElCero(numero){
      if(numero<10){
        numero = "0"+numero;
      }
      return numero;
    }

    VerColores(modal , tipo){
      this.tipoModal = tipo;
      let respuesta :any;
      respuesta  = this.modal.open( modal, { size : 'lg'  ,  backdropClass: 'light-blue-backdrop' } );
    }
}
