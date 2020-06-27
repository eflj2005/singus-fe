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
// import { ResponsablesController } from "@controladores/responsables.controller";        //REVISAR - ELIMINACION DE CONTROLADOR
import { PersonasInterface } from "@interfaces/personas.interface";
import { PersonasController } from "@controladores/personas.controller";
import { CohortesController } from "@controladores/cohortes.controller";
import { ProgramasController } from "@controladores/programas.controller";
import { SedesController } from "@controladores/sedes.controller";
import { AgendasController } from "@controladores/agendas.controller";
import { AgendasInterface } from '@interfaces/agendas.interface';
import { UsuariosController } from '@controladores/usuarios.controller';
import { UsuarioInterface } from '@interfaces/usuario.interface';
import { typeWithParameters } from '@angular/compiler/src/render3/util';


interface  ResponsableSeleccionado  {
  id :number,
  nombres :  string
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

  // controladorResponsables: ResponsablesController;      //REVISAR - ELIMINACION DE CONTROLADOR
  controladorUsuarios: UsuariosController;
  controladorAgendas: AgendasController;
  controladorPersonas: PersonasController;
  controladorSedes : SedesController;
  controladorCohortes : CohortesController;
  controladorProgramas : ProgramasController;
  
  registroUsuarios: UsuarioInterface[];
  registrosAgendas:  AgendasInterface[];
  registrosPersonas:  ListaPersonasInterface[];

  sedeid: number = -1 ;
  cohorteid:number = -1 ;
  programaid: number = -1 ;


  responsableSelecionado : ResponsableSeleccionado  = {'id': null, 'nombres': ''};
  filtros: Array<string>; 
  rol : string;
  responsables$: Observable<UsuarioInterface[]>;
  agendados$: Observable<ListaPersonasInterface[]>;
  filterResponsables = new FormControl('');
  filterAgendados=  new FormControl('');

  seleccionarTodos: any = {
    nuevasPersonas: false,
    nuevosEstudios: false,
    conCambios: false
  }

  constructor(private servicioAmbiente: AmbienteService , private pipe: DecimalPipe, private modal: NgbModal, private llamadoHttp :HttpClient ) {
    this.ConsultaResponsables();
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

  
  BuscarResponsable(text: string , pipe: PipeTransform ): UsuarioInterface[] {
      let registrosResponsablesTemp =  this.registroUsuarios.filter(responsable => responsable.rol == this.rol );
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
  
    if (this.cohorteid == -1 && this.programaid == -1 && this.sedeid == -1){
      registrosAgendadosTemp = this.registrosPersonas;
    }else if(this.cohorteid != -1 && this.programaid != -1 && this.sedeid != -1) {
      registrosAgendadosTemp=  this.registrosPersonas.filter(agendado => agendado.sede ==  this.controladorSedes.actual.descripcion && agendado.programa == this.controladorProgramas.actual.descripcion && agendado.cohorte == this.controladorCohortes.actual.descripcion);
    }else{
      if (this.sedeid != -1 && this.programaid == -1 && this.cohorteid == -1) {
        registrosAgendadosTemp=  this.registrosPersonas.filter(agendado => agendado.sede ==  this.controladorSedes.actual.descripcion);
      } else if (this.cohorteid != -1 && this.programaid == -1 && this.sedeid == -1) {
        registrosAgendadosTemp=  this.registrosPersonas.filter(agendado => agendado.cohorte == this.controladorCohortes.actual.descripcion);
      } else if(this.programaid != -1 && this.cohorteid == -1 && this.sedeid == -1) {
        registrosAgendadosTemp=  this.registrosPersonas.filter(agendado => agendado.programa == this.controladorProgramas.actual.descripcion);
      } else{
        if (this.sedeid != -1 && this.cohorteid != -1 ) {
          registrosAgendadosTemp=  this.registrosPersonas.filter(agendado => agendado.sede ==  this.controladorSedes.actual.descripcion && agendado.cohorte == this.controladorCohortes.actual.descripcion);
        } else if (this.sedeid != -1 && this.programaid != -1 ) {
          registrosAgendadosTemp=  this.registrosPersonas.filter(agendado =>  agendado.sede ==  this.controladorSedes.actual.descripcion && agendado.programa == this.controladorProgramas.actual.descripcion);
        } else if(this.programaid != -1 && this.cohorteid != -1 ) {
          registrosAgendadosTemp=  this.registrosPersonas.filter(agendado => agendado.programa == this.controladorProgramas.actual.descripcion && agendado.cohorte == this.controladorCohortes.actual.descripcion);
        }
      } 
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
     this.controladorUsuarios.Encontrar('id', id);                                                                                 
     this.responsableSelecionado.id = this.controladorUsuarios.actual.id;                                                                       
     this.responsableSelecionado.nombres = this.controladorUsuarios.actual.nombres + ' ' + this.controladorUsuarios.actual.apellidos;     
  }

  ConsultaResponsables(){

      this.controladorUsuarios = new UsuariosController(this.llamadoHttp, this.servicioAmbiente);
      this.controladorUsuarios.CargarDesdeDB(true, "S").subscribe(
       (respuesta: RespuestaInterface) =>{
         switch(respuesta.codigo){
           case 200:
             this.registroUsuarios = this.controladorUsuarios.todos ;
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
      this.controladorSedes.EstaListo("cargue")      //&&               //REVISAR - ELIMINACION DE CONTROLADOR
      // this.controladorResponsables.EstaListo("cargue")               //REVISAR - ELIMINACION DE CONTROLADOR
    );

    return validador;
  }

  AgregarFiltro( filtroNombre :string ){
       switch (filtroNombre) {
         case 'programa':
           if (this.programaid != -1) {
            this.controladorProgramas.Encontrar('id', this.programaid);
           }
           break;
         case 'sede':
            if (this.sedeid != -1) {
              this.controladorSedes.Encontrar('id',  this.sedeid);
            }
           break;
         case 'cohorte':
            if(this.cohorteid != -1){
              this.controladorCohortes.Encontrar('id', this.cohorteid);
            }
           break;
         default:
           break;
       }
     this.AplicarFiltros(2);
  }

}

