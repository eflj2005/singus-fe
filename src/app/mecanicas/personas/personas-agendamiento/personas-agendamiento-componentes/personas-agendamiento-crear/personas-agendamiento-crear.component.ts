import { Component, OnInit, PipeTransform} from '@angular/core';
import {formatDate} from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AmbienteService} from '@servicios/ambiente.service';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EstructuraConsultas } from '@generales/estructura-consultas';
import { HttpClient } from '@angular/common/http';

import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { ResponsablesInterface } from "@interfaces/responsables.interface";
import { ResponsablesController } from "@controladores/responsables.controller";
import { PersonasInterface } from "@interfaces/personas.interface";
import { PersonasController } from "@controladores/personas.controller";
import { CohortesController } from "@controladores/cohortes.controller";
import { ProgramasController } from "@controladores/programas.controller";
import { SedesController } from "@controladores/sedes.controller";
import { AgendasController } from "@controladores/agendas.controller";
import { AgendasInterface } from '@interfaces/agendas.interface';

interface  responsables extends ResponsablesInterface {

} 
interface  ResponsableSeleccionado  {
  id :number,
  nombres :  string
}

interface filtroAgendados{
  nombreFiltro : string

}

interface ListaPersonasInterface extends PersonasInterface {
  nombreCompleto:string;
  cohorte:string;
  sede:string;
  programa:string;
}

@Component({
  selector: 'app-personas-agendamiento-crear',
  templateUrl: './personas-agendamiento-crear.component.html',
  styleUrls: ['./personas-agendamiento-crear.component.css'],
  providers: [DecimalPipe]
})
export class PersonasAgendamientoCrearComponent implements OnInit {

  controladorResponsables: ResponsablesController;
  controladorAgendas: AgendasController;
  controladorPersonas: PersonasController;
  controladorSedes : SedesController;
  controladorCohortes : CohortesController;
  controladorProgramas : ProgramasController;
  
  
  registrosResponsables: ResponsablesInterface[];
  registrosAgendas:  AgendasInterface[];
  registrosPersonas:  ListaPersonasInterface[];

  sedeid: number = null ;
  cohorteid:number = null ;
  programaid: number = null ;


  responsableSelecionado : ResponsableSeleccionado  = {'id': null, 'nombres': ''};
  filtros: Array<string>; 
  rol : string;
  responsables$: Observable<ResponsablesInterface[]>;
  agendados$: Observable<ListaPersonasInterface[]>;
  filterResponsables = new FormControl('');
  filterAgendados=  new FormControl('');

  seleccionarTodos: any = {
    nuevasPersonas: false,
    nuevosEstudios: false,
    conCambios: false
  }

  constructor(private servicioAmbiente: AmbienteService , private pipe: DecimalPipe, private modal: NgbModal, private llamadoHttp :HttpClient ) {
    this.ConsultaRresponsables();
    this.CargarControladores();
    this.ConsultaPersonas();
    this.filtros = [];
    // this.dateFormatormat(this.now, "dddd, mmmm dS, yyyy");
    // this.FechaInicio= formatDate(new Date(), 'yyyy-MM-dd', 'en')
    
 }
  
   ngOnInit() {
      
  }
  
  Cancelar(){
    this.servicioAmbiente.agendaModo.modo = 1;
  }

  
  BuscarResponsable(text: string , pipe: PipeTransform ): ResponsablesInterface[] {
      let registrosResponsablesTemp =  this.registrosResponsables.filter(responsable => responsable.rol == this.rol );
      console.log(registrosResponsablesTemp)
      return registrosResponsablesTemp.filter(responsable => {
        const term = text.toLowerCase();
        return pipe.transform(responsable.id).includes(term)
            || pipe.transform(responsable.documento).includes(term)
            || responsable.nombres.toLowerCase().includes(term)
            || responsable.apellidos.toLowerCase().includes(term)

      });

    }

  BuscarAgendados(text: string , pipe: PipeTransform ): ListaPersonasInterface[] {
    let registrosAgendadosTemp: ListaPersonasInterface[];
    if( this.sedeid == null ){
      registrosAgendadosTemp = this.registrosPersonas;
    }else {
    //  let condicion: any;
    //   for (let i = 0; i < this.filtros.length; i++) {
    
    //    switch (i) {
    //      case 0:
    //        if (this.filtros[i] == 'programa'){
    //          condicion  =  "agendado.programa ==" + this.controladorProgramas.actual.descripcion ;
    //        }else if (this.filtros[i] == 'cohorte') {
    //          condicion  =  "agendado.cohorte ==" + this.controladorCohortes.actual.descripcion ;
    //        } else {
            
    //          condicion  =  "agendado.sede == " + " '"+this.controladorSedes.actual.descripcion+"'"  ;
    //          console.log(condicion);
    //        }
    //        break;
      
    //      default:
    //        if (this.filtros[i] == 'programa'){
    //        condicion = condicion  + ",agendado.programa ==" + this.controladorProgramas.actual.descripcion ;
    //        }else if (this.filtros[i] == 'cohorte') {
    //          condicion = condicion  + ",agendado.cohorte ==" + this.controladorCohortes.actual.descripcion ;
    //        } else {
    //          condicion = condicion  + ",agendado.sede ==" + " '"+this.controladorSedes.actual.descripcion+"'" ;
    //        }
    //        break;
    //    }
    
       
    //   }
     registrosAgendadosTemp=  this.registrosPersonas.filter(agendado => agendado.sede ==  this.controladorSedes.actual.descripcion && agendado.programa == this.controladorProgramas.actual.descripcion);
     console.log(registrosAgendadosTemp);
    }
    return registrosAgendadosTemp.filter(agendado => {
      const term = text.toLowerCase();
      return pipe.transform(agendado.iduniminuto).includes(term)
          || pipe.transform(agendado.documento).includes(term)
          || agendado.nombreCompleto.toLowerCase().includes(term)
          || agendado.cohorte.toLowerCase().includes(term)
          || agendado.sede.toLowerCase().includes(term)
          || agendado.programa.toLowerCase().includes(term);
    });

  }
  
  AplicarFiltros(filtro: number){

    switch (filtro) {
      case 1:
        this.responsables$ =  this.filterResponsables.valueChanges.pipe(
          startWith(''),
          map(text => this.BuscarResponsable(text, this.pipe))
        )
        break;
      case 2:
        this.agendados$ = this.filterAgendados.valueChanges.pipe(
          startWith(''),
          map(text => this.BuscarAgendados(text, this.pipe))
        )
        break;
      default:

        break;
    }
  }

  ActivarModal( modalRecibido : any , tipo: Number ){
    let  respuesta : any;

    switch (tipo) {
      case 1:
        respuesta  = this.modal.open( modalRecibido, { size : 'lg'  ,  backdropClass: 'light-blue-backdrop', backdrop: "static"  } );
        break;
      case 2:
       respuesta  = this.modal.open( modalRecibido, { size : 'lg'  ,  backdropClass: 'light-blue-backdrop', backdrop: "static", scrollable: true  } );
        
        break;
      default:
        break;
    }

    
  }

  SeleccionResponsable(id : number ){
    this.controladorResponsables.Encontrar('id', id);
    this.responsableSelecionado.id = this.controladorResponsables.actual.id;
    this.responsableSelecionado.nombres = this.controladorResponsables.actual.nombres + ' ' + this.controladorResponsables.actual.apellidos; 

  }

  ConsultaRresponsables(){

    let caracteristicas = new EstructuraConsultas();
    caracteristicas.AgregarColumna( "responsables", "id" , null );
    caracteristicas.AgregarColumna( "responsables", "documento" , null );
    caracteristicas.AgregarColumna( "responsables", "nombres" , null);
    caracteristicas.AgregarColumna( "responsables", "apellidos" , null );
    caracteristicas.AgregarColumna( "responsables", "rol" , null );

    this.controladorResponsables = new ResponsablesController(this.llamadoHttp,this.servicioAmbiente);
    this.controladorResponsables.CargarDesdeDB(true, "S" , caracteristicas).subscribe(
      (respuesta: RespuestaInterface) =>{
        switch(respuesta.codigo){
          case 200:
            this.registrosResponsables = this.controladorResponsables.todos ;
            this.AplicarFiltros(1);
            break;
          default:
            alert("Error: "+respuesta.mensaje);
            break;
        }
      }
    );
  }

  ConsultaPersonas(){
    this.controladorPersonas = new PersonasController(this.llamadoHttp,this.servicioAmbiente);

    let caracteristicas = new EstructuraConsultas();
    caracteristicas.AgregarColumna( null ,         "CONCAT( personas.nombres , ' ' , personas.apellidos )" , "nombreCompleto" );
    caracteristicas.AgregarColumna( "cohortes" ,   "descripcion" ,                                           "cohorte" );
    caracteristicas.AgregarColumna( "sedes" ,      "descripcion" ,                                           "sede" );
    caracteristicas.AgregarColumna( "programas" ,  "descripcion" ,                                           "programa ");
    caracteristicas.AgregarColumna( null ,         "iduniminuto" , "iduniminuto" );
    caracteristicas.AgregarColumna( null ,         "documento" ,     "documento" );
    
    caracteristicas.AgregarEnlace( "estudios" ,  "personas" ,  "estudios" );
    caracteristicas.AgregarEnlace( "cohortes" ,  "cohortes" ,  "estudios" );
    caracteristicas.AgregarEnlace( "ofertas" ,  "ofertas" ,  "estudios" );
    caracteristicas.AgregarEnlace( "sedes" ,     "sedes" ,     "estudios" );
    caracteristicas.AgregarEnlace( "programas" , "programas" , "ofertas" );  
  
    this.controladorPersonas.CargarDesdeDB(true, "A", caracteristicas ).subscribe(
      (respuesta: RespuestaInterface) =>{
        switch (respuesta.codigo){
          case 200:
            this.registrosPersonas = this.controladorPersonas.todos;
            this.AplicarFiltros(2);
          break;
          default:
            alert("Error: "+respuesta.mensaje);
          break;
        }
      } 
    );
  }

  CargarControladores(){
    this.controladorCohortes = new CohortesController(this.llamadoHttp,this.servicioAmbiente);
    this.controladorProgramas = new ProgramasController(this.llamadoHttp,this.servicioAmbiente);
    this.controladorSedes = new  SedesController(this.llamadoHttp,this.servicioAmbiente);

    this.controladorCohortes.CargarDesdeDB(true).subscribe(
      (respuesta: RespuestaInterface) =>{
        switch(respuesta.codigo){
          case 200:
            break;
          default:
            alert("Error: "+respuesta.mensaje);
            break;
        }
      }
    );

    this.controladorProgramas.CargarDesdeDB(true).subscribe(
      (respuesta: RespuestaInterface) =>{
        switch(respuesta.codigo){
          case 200:
            break;
          default:
            alert("Error: "+respuesta.mensaje);
            break;
        }
      }
    );

    this.controladorSedes.CargarDesdeDB(true).subscribe(
      (respuesta: RespuestaInterface) =>{
        switch(respuesta.codigo){
          case 200:
            break;
          default:
            alert("Error: "+respuesta.mensaje);
            break;
        }
      }
    );

  }

  EstoyListo(){
    let validador:boolean = false;

    validador = (
      this.controladorPersonas.EstaListo("cargue")   &&
      this.controladorCohortes.EstaListo("cargue")   &&
      this.controladorProgramas.EstaListo("cargue")  &&
      this.controladorSedes.EstaListo("cargue")      &&
      this.controladorResponsables.EstaListo("cargue")
    );

    return validador;
  }

  AgregarFiltro(todos: boolean , filtroNombre :string ){
    console.log("aqui");
    console.log(this.sedeid);
    console.log(filtroNombre);
    console.log(this.filtros);

    let indexFiltro = this.filtros.includes(filtroNombre);
     if (indexFiltro == false){
       switch (filtroNombre) {
         case 'programa':
           this.controladorProgramas.Encontrar('id', this.programaid);
           break;
         case 'sede':
             this.controladorSedes.Encontrar('id', this.sedeid);
           break;
         case 'cohorte':
             this.controladorCohortes.Encontrar('id', this.cohorteid);
           break;
         default:
           break;
       }
       this.filtros.push( filtroNombre );
       console.log(this.filtros);
     }else {
       switch (filtroNombre) {
         case 'programa':
           this.controladorProgramas.Encontrar('id', this.programaid);
           break;
         case 'sede':
             this.controladorSedes.Encontrar('id',  this.sedeid);
           break;
         case 'cohorte':
             this.controladorCohortes.Encontrar('id', this.cohorteid);
           break;
         default:
           break;
       }
     }
     this.AplicarFiltros(2);
  }

}

