import { Component, OnInit, PipeTransform} from '@angular/core';
import {formatDate, DatePipe} from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AmbienteService} from '@servicios/ambiente.service';
import { DecimalPipe } from '@angular/common';
import { Observable, empty } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EstructuraConsultas } from '@generales/estructura-consultas';
import { HttpClient } from '@angular/common/http';
import { AutenticacionService } from '@servicios/autenticacion.service';

import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { PersonasInterface } from "@interfaces/personas.interface";
import { PersonasController } from "@controladores/personas.controller";
import { CohortesController } from "@controladores/cohortes.controller";
import { ProgramasController } from "@controladores/programas.controller";
import { SedesController } from "@controladores/sedes.controller";
import { AgendasController } from "@controladores/agendas.controller";
import { AgendasInterface } from '@interfaces/agendas.interface';
import { UsuariosController } from '@controladores/usuarios.controller';
import { UsuarioInterface } from '@interfaces/usuario.interface';
import { AsignacionesController } from '@controladores/asignaciones.controller';
import { SeguimientosController } from "@controladores/seguimientos.controller";
import { AgendamientosController } from "@controladores/agendamientos.controller";
import { SeguimientosInterface } from "@interfaces/seguimientos.interface";
import { AgendamientosInterface } from "@interfaces/agendamientos.interface";
import { AsignacionesInterface } from "@interfaces/asignaciones.interface";
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { element } from 'protractor';
import { isUndefined } from 'util';



interface  ResponsableSeleccionado  {
  id :number,
  nombres :  string
}

interface ListaPersonasInterface extends PersonasInterface {
  nombreCompleto:string;
  cohorte:number;
  sede:string;
  programa:string;
  seleccionado: any ;
}

interface ListaAgendamientos extends AgendamientosInterface{
  personas_id : number;
}

interface registroSeguimientoInterface{
  id: number;
  actualizacion_fecha: string;
  tiposobservaciones_id: number;
  observacion: string;
  nombre: string;
}

@Component({
  selector: 'app-personas-agendamiento-crear',
  templateUrl: './personas-agendamiento-crear.component.html',
  styleUrls: ['./personas-agendamiento-crear.component.css'],
  providers: [DecimalPipe]
})
export class PersonasAgendamientoCrearComponent implements OnInit {
// -------------- Controladores y interfaces ---------------
  controladorUsuarios: UsuariosController;
  controladorAgendas: AgendasController;
  controladorPersonas: PersonasController;
  controladorSedes : SedesController;
  controladorCohortes : CohortesController;
  controladorProgramas : ProgramasController;
  controladorSeguimientos: SeguimientosController;
  controladorAgendamientos: AgendamientosController;
  controladorAsignaciones : AsignacionesController;
  
  registroUsuarios: UsuarioInterface[];
  registrosAgendas:  AgendasInterface[];
  registrosPersonas:  ListaPersonasInterface[] = [];
  registrosPersonasTemp: ListaPersonasInterface[];
  registrosAgendados: ListaPersonasInterface[];
  registrosAgendamientos: ListaAgendamientos[];
  
// ------------------ Filtros -------------------------------
  sedeid: number = -1 ;
  cohorteid:number = -1 ;
  programaid: number = -1 ;

// ------------------ Datos para la agenda -----------------------------
  resgistro_fecha: string;
  apertura_fecha: Date ;
  cierre_fecha: Date;
  responsableSelecionado : ResponsableSeleccionado  = {'id': null, 'nombres': ''};
  creador : number;
// ------------------------- Observables y demas -------------------------
  rol : string;
  contador :number = 0;
  agendaLista : boolean = true;
  responsables$: Observable<UsuarioInterface[]>;
  personas$: Observable<ListaPersonasInterface[]>;
  agendados$: Observable<ListaPersonasInterface[]>;
  filterResponsables = new FormControl('');
  filterPersonas=  new FormControl('');
  filterAgendados=  new FormControl('');

  seleccionarTodos: any = {
    nuevasPersonas: false,
    nuevosAgendados: false,
    conCambios: false
  }

 

  notificacionActiva:boolean=false;
  notificacionMensaje:string ="";

  constructor(private autenticador: AutenticacionService, public servicioAmbiente: AmbienteService , private pipe: DecimalPipe, private modal: NgbModal, private llamadoHttp :HttpClient, private utilidadFechas: DatePipe ) {
    this.controladorAsignaciones = new AsignacionesController(this.llamadoHttp, this.servicioAmbiente);
    this.controladorAgendamientos = new AgendamientosController(this.llamadoHttp, this.servicioAmbiente);
    this.controladorAgendas = new AgendasController(this.llamadoHttp, this.servicioAmbiente);
    this.controladorSeguimientos = new SeguimientosController(this.llamadoHttp, this.servicioAmbiente);
    this.creador = this.autenticador.UsuarioActualValor.id;
    this.resgistro_fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.ConsultaResponsables();
    this.CargarControladores();
    this.ConsultaPersonas();
    this.registrosAgendados = [];
    this.ValidarSeguimiento();
    this.rol = null;

    if(this.servicioAmbiente.agendaModo.datos != null){
      
      this.controladorAgendas = this.servicioAmbiente.agendaModo.datos.controladorBase;
      this.controladorAgendas.Encontrar("id",this.servicioAmbiente.agendaModo.datos.id);
      this.apertura_fecha = this.controladorAgendas.actual.apertura_fecha;
      this.cierre_fecha = this.controladorAgendas.actual.cierre_fecha;
      this.responsableSelecionado.id = this.controladorAgendas.actual.responsableId;
      this.responsableSelecionado.nombres = this.controladorAgendas.actual.responsable;
      this.rol = this.controladorAgendas.actual.rolResponsable;
      this.ValidarSeguimiento();
     


      // this.CargarAgenda(this.servicioAmbiente.agendaModo.datos);

    }
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
      return registrosResponsablesTemp.filter(responsable => {
        const term = text.toLowerCase();
        return pipe.transform(responsable.id).includes(term)
            || pipe.transform(responsable.documento).includes(term)
            || responsable.nombres.toLowerCase().includes(term)
            || responsable.apellidos.toLowerCase().includes(term)

      });

    }
    BuscarAgendados2(text: string , pipe: PipeTransform ):  ListaPersonasInterface[] {

      return this.registrosAgendados.filter(agendado => {
        const term = text.toLowerCase();
        return pipe.transform(agendado.iduniminuto).includes(term)
        || pipe.transform(agendado.documento).includes(term)
        || agendado.nombreCompleto.toLowerCase().includes(term)
        || pipe.transform(agendado.cohorte).includes(term)
        || agendado.sede.toLowerCase().includes(term)
        || agendado.programa.toLowerCase().includes(term);

      });

    }

  BuscarPersonas(text: string , pipe: PipeTransform ): ListaPersonasInterface[] {
  
    if (this.cohorteid == -1 && this.programaid == -1 && this.sedeid == -1){
      this.registrosPersonasTemp = this.registrosPersonas;
    }else if(this.cohorteid != -1 && this.programaid != -1 && this.sedeid != -1) {
      this.registrosPersonasTemp =  this.registrosPersonas.filter(agendado => agendado.sede ==  this.controladorSedes.actual.descripcion && agendado.programa == this.controladorProgramas.actual.descripcion && agendado.cohorte == this.controladorCohortes.actual.descripcion);
    }else{
      if (this.sedeid != -1 && this.programaid == -1 && this.cohorteid == -1) {
        this.registrosPersonasTemp =  this.registrosPersonas.filter(agendado => agendado.sede ==  this.controladorSedes.actual.descripcion);
      } else if (this.cohorteid != -1 && this.programaid == -1 && this.sedeid == -1) {
        this.registrosPersonasTemp =  this.registrosPersonas.filter(agendado => agendado.cohorte == this.controladorCohortes.actual.descripcion);
      } else if(this.programaid != -1 && this.cohorteid == -1 && this.sedeid == -1) {
        this.registrosPersonasTemp =  this.registrosPersonas.filter(agendado => agendado.programa == this.controladorProgramas.actual.descripcion);
      } else{
        if (this.sedeid != -1 && this.cohorteid != -1 ) {
          this.registrosPersonasTemp =  this.registrosPersonas.filter(agendado => agendado.sede ==  this.controladorSedes.actual.descripcion && agendado.cohorte == this.controladorCohortes.actual.descripcion);
        } else if (this.sedeid != -1 && this.programaid != -1 ) {
          this.registrosPersonasTemp =  this.registrosPersonas.filter(agendado =>  agendado.sede ==  this.controladorSedes.actual.descripcion && agendado.programa == this.controladorProgramas.actual.descripcion);
        } else if(this.programaid != -1 && this.cohorteid != -1 ) {
          this.registrosPersonasTemp =  this.registrosPersonas.filter(agendado => agendado.programa == this.controladorProgramas.actual.descripcion && agendado.cohorte == this.controladorCohortes.actual.descripcion);
        }
      } 
    }
    return this.registrosPersonasTemp.filter(agendado => {
      const term = text.toLowerCase();
      return String(agendado.iduniminuto).includes(term)
          || pipe.transform(agendado.documento).includes(term)
          || agendado.nombreCompleto.toLowerCase().includes(term)
          || pipe.transform(agendado.cohorte).includes(term)
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
        this.personas$ = this.filterPersonas.valueChanges.pipe(
          startWith(''),
          map(text => this.BuscarPersonas(text, this.pipe))
        )
        break;
      case 3:
        this.agendados$ = this.filterAgendados.valueChanges.pipe(
          startWith(''),
          map(text => this.BuscarAgendados2(text, this.pipe))
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
        this.programaid = -1;
        this.cohorteid = -1;
        this.sedeid = -1;
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
     this.ValidarSeguimiento();   
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
  
    caracteristicas.AgregarFiltro( "", "personas" , "habeasdata" , "<>", "N" );

    this.controladorPersonas.CargarDesdeDB(true, "A", caracteristicas ).subscribe(
      (respuesta: RespuestaInterface) =>{
        switch (respuesta.codigo){
          case 200:

          this.controladorPersonas.EstaListo("cargue",true).subscribe((valor:boolean) => {
            this.registrosPersonas = this.controladorPersonas.todos;
          
            if(this.servicioAmbiente.agendaModo.datos != null){
              this.CargarAgenda();
            };
            this.AplicarFiltros(2);
          });
            // this.controladorPersonas.todos.forEach(val => this.registrosPersonas.push(Object.assign({},val)));
            // this.registrosPersonas.forEach(persona => persona.seleccionado = false);

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
      this.controladorSedes.EstaListo("cargue")
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

  SeleccionarTodos(control : string){
    switch(control){
      case 'nuevasPersonas':
        if(this.seleccionarTodos.nuevasPersonas){
          for (var posicion in this.registrosPersonasTemp) {  
           this.registrosPersonasTemp[posicion].seleccionado = false;
          }  
          this.seleccionarTodos.nuevasPersonas = false;
        }
        else{
          for (var posicion in this.registrosPersonasTemp) {
            this.registrosPersonasTemp[posicion].seleccionado = true;
          }  
          this.seleccionarTodos.nuevasPersonas = true;
        }
      break;
       case 'nuevosAgendados':
         if(this.seleccionarTodos.nuevosAgendados){
            this.registrosAgendados.forEach(element => element.seleccionado = false);
            this.seleccionarTodos.nuevosAgendados = false ;
         }
         else{
            this.registrosAgendados.forEach(element => element.seleccionado = true);
            this.seleccionarTodos.nuevosAgendados = true ;
         }
       break;      
    }
  }



  EliminarSeleccionados(){

    for (let i = 0; i <= this.registrosAgendados.length; i++) {
        let index = this.registrosAgendados.findIndex(element => element.seleccionado == true);
        if (!(index == -1)){
          this.registrosPersonas.find(persona => persona.id == this.registrosAgendados[index].id ).seleccionado = false;
          this.registrosAgendados.splice(index,1);
          index = -1;
          i = 0;
        }
    }
    this.seleccionarTodos.nuevosAgendados = false;
    this.AplicarFiltros(3);   
    this.ValidarSeguimiento();

  }

  AgregarPersonas(){
    if (this.registrosAgendados.length == 0){
      for (let i = 0; i < this.registrosPersonasTemp.length; i++) {
        if (this.registrosPersonasTemp[i].seleccionado){
          let clonPersona = Object.assign({}, this.registrosPersonasTemp[i]);
          clonPersona.seleccionado = false;
          this.registrosAgendados.push(clonPersona);
        }
      }

    } else {
     
      for (let i = 0; i < this.registrosPersonasTemp.length; i++) {
        let index = this.registrosAgendados.findIndex(element => element.documento == this.registrosPersonasTemp[i].documento);
        if(index == -1 && this.registrosPersonasTemp[i].seleccionado == true){
          let clonPersona = Object.assign({}, this.registrosPersonasTemp[i]);
          clonPersona.seleccionado = false;
          this.registrosAgendados.push(clonPersona);
        }
      }
    }

    this.sedeid = -1;
    this.cohorteid = -1;
    this.programaid = -1;
    this.seleccionarTodos.nuevasPersonas = false;
    this.AplicarFiltros(2);
    this.AplicarFiltros(3);
    this.ValidarSeguimiento();

  }

  Limpiar(){

    this.sedeid = -1;
    this.cohorteid = -1;
    this.programaid = -1;
    this.seleccionarTodos.nuevasPersonas = false;
    this.seleccionarTodos.nuevosAgendados = false;
    this.seleccionarTodos.conCambios = false ;

    this.apertura_fecha = null;
    this.cierre_fecha = null;
    this.responsableSelecionado = {'id': null, 'nombres': ''};
    this.registrosAgendados = [];
    this.resgistro_fecha = null;

    this.registrosPersonas.forEach(element => element.seleccionado = false );

    this.AplicarFiltros(3);
    this.ValidarSeguimiento();
  }

  CrearAgenda(){
   let nuevaAgenda: any = {'id': null , 'agendas_id': null, 'apertura_fecha': String(this.apertura_fecha) , 'cierre_fecha': String(this.cierre_fecha), 'nivel': 0, registro_fecha: this.utilidadFechas.transform(new Date(), 'yyyy-MM-dd') }; 
   this.controladorAgendas.Agregar(nuevaAgenda);
   this.controladorAgendas.Guardar().subscribe( 
    (respuestaAgendas:RespuestaInterface) => { 
      if( respuestaAgendas.codigo == 200 ){
    
        for (let i = 0; i < this.registrosAgendados.length ; i++) {
           let nuevoSeguimiento : SeguimientosInterface = { id: null, actualizacion_fecha: null, observacion: null, tiposobservaciones_id : null , personas_id: this.registrosAgendados[i].id};
           this.controladorSeguimientos.Agregar(nuevoSeguimiento);
        }
        this.controladorSeguimientos.Guardar().subscribe(
          (respuestaSeguimientos : RespuestaInterface) => {
            if ( respuestaSeguimientos.codigo == 200) {
      
              for (let i = 0; i < respuestaSeguimientos.mensaje.dbRefs.length; i++) {
                let nuevoAgendamiento : AgendamientosInterface = {'id': null, 'agendas_id': respuestaAgendas.mensaje.dbRefs[0].id ,'seguimientos_id' : respuestaSeguimientos.mensaje.dbRefs[i].id }
                this.controladorAgendamientos.Agregar(nuevoAgendamiento);
              }
              this.controladorAgendamientos.Guardar().subscribe(
                (respuestaAgendamientos : RespuestaInterface) => {
                  if (respuestaAgendamientos.codigo == 200) {
              
                    let asignacionResponsable : AsignacionesInterface = {'id': null, 'agendas_id': respuestaAgendas.mensaje.dbRefs[0].id, 'registro_fecha': this.resgistro_fecha, 'usuarios_id': this.responsableSelecionado.id ,'tipo': "R" };
                    this.controladorAsignaciones.Agregar(asignacionResponsable);
                    let asignacionCoordinador : AsignacionesInterface = {'id': null, 'agendas_id': respuestaAgendas.mensaje.dbRefs[0].id, 'registro_fecha': this.resgistro_fecha, 'usuarios_id' : this.creador , 'tipo': "C" };
                    this.controladorAsignaciones.Agregar(asignacionCoordinador);

                    this.controladorAsignaciones.Guardar().subscribe(
                      (respuestaAsignaciones : RespuestaInterface) => {
                        if (respuestaAsignaciones.codigo == 200) {
                    
                          alert("Agenda guardada");
                          this.Limpiar();
                        } else {
                          alert("Error al guardar Asignaciones");
                        }
                      }
                    );
                  } else {
                    alert("Error al guardar Agendamientos");
                  }
                }
              );
            } else {
                alert("Error al guardar Seguimientos");
            }
          }
        );

      }    
      else{
        alert("Error al guardar Agendas");
      }                              
    }
  );

  }

  CargarAgenda(){
    
    let caracteristicasAsignaciones = new EstructuraConsultas("F", null,"agendas_id","=",  String(this.controladorAgendas.actual.id) );
    this.controladorAsignaciones.CargarDesdeDB(true,"A",caracteristicasAsignaciones).subscribe(
      (respuestaAsignaciones: RespuestaInterface) =>{
        switch (respuestaAsignaciones.codigo){
          case 200:
      

            let caracteristicasSeguimientos = new EstructuraConsultas();
            caracteristicasSeguimientos.AgregarEnlace( "agendamientos" , "seguimientos" , "agendamientos" );
            caracteristicasSeguimientos.AgregarFiltro( "","agendamientos" , "agendas_id" , "=", String(this.controladorAgendas.actual.id)); 
        
            this.controladorSeguimientos.CargarDesdeDB(true, "A" , caracteristicasSeguimientos).subscribe(
              (respuestaSeguimientos: RespuestaInterface) =>{
                switch(respuestaSeguimientos.codigo){
                  case 200:
              
                    this.controladorSeguimientos.EstaListo("cargue",true).subscribe((valor:boolean) => {
                      if (this.contador == 0) {
                        this.controladorSeguimientos.todos.forEach(seguimiento => {
                          this.registrosPersonas.find(persona => persona.id == seguimiento.personas_id).seleccionado = true;
                           let clonPersona = Object.assign({}, this.registrosPersonas.find(persona => persona.id == seguimiento.personas_id));
                           clonPersona.seleccionado = false;
                           this.registrosAgendados.push(clonPersona);
                           this.contador ++;
                        }); 
                      }
                      this.AplicarFiltros(3);
                      this.ValidarSeguimiento();
                    });

                    let caracteristicasAgendamientos = new EstructuraConsultas();
                    caracteristicasAgendamientos.AgregarEnlace( "seguimientos" , "seguimientos" , "agendamientos" );
                    caracteristicasAgendamientos.AgregarFiltro( "","agendamientos" , "agendas_id" , "=", String(this.controladorAgendas.actual.id) ); 
                
                    this.controladorAgendamientos.CargarDesdeDB(true, "A" , caracteristicasAgendamientos).subscribe(
                      (respuestaAgendamientos: RespuestaInterface) =>{
                        switch(respuestaAgendamientos.codigo){
                          case 200:
                         
  
                            break;
                          default:
                            alert("Error: "+respuestaAgendamientos.mensaje);
                            break;
                        }
                      }
                    );
                    break;
                  default:
                    alert("Error: "+respuestaSeguimientos.mensaje);
                    break;
                }
              }
            );
            break;
            default:
              alert("Error: "+respuestaAsignaciones.mensaje);
            break;
          }
        }
      );  
  }

  ModificarAgenda(){
    this.agendaLista = false;
    // Modificacion de la Agenda
    let agendaCambiada:AgendasInterface= {id: this.controladorAgendas.actual.id, agendas_id: null, apertura_fecha : String(this.apertura_fecha), cierre_fecha : String(this.cierre_fecha), nivel : 0 , registro_fecha: this.utilidadFechas.transform(new Date(), 'yyyy-MM-dd')};
    this.controladorAgendas.Modificar(agendaCambiada);
    // Modificacion de asignacion de responsable  
    this.controladorAsignaciones.Encontrar("tipo", "R");
    let responsableCambiado: AsignacionesInterface = {id: this.controladorAsignaciones.actual.id, agendas_id: this.controladorAgendas.actual.id, usuarios_id : this.responsableSelecionado.id , tipo : "R" , registro_fecha : this.utilidadFechas.transform(new Date(), 'yyyy-MM-dd')};
    this.controladorAsignaciones.Modificar(responsableCambiado);
    // Insercion nuevos seguimientos en el controlador 
    this.registrosAgendados.forEach(element => {
      if (!this.controladorSeguimientos.Encontrar("personas_id", element.id )) {
   
        let nuevoSeguimiento : SeguimientosInterface = { id: null, actualizacion_fecha: null, observacion: null, tiposobservaciones_id : null , personas_id: element.id};
        this.controladorSeguimientos.Agregar(nuevoSeguimiento);
      }
    });

    // Modificacion Agenda BD
    this.controladorAgendas.Guardar().subscribe(
      (respuestaAgendas : RespuestaInterface) => {
        if (respuestaAgendas.codigo == 200) {
          // Modificacion Asignacion responsable BD
          this.controladorAsignaciones.Guardar().subscribe(
            (respuestaAsignaciones : RespuestaInterface) => {
              if (respuestaAsignaciones.codigo == 200) {
                // Creación seguimientos
                this.controladorSeguimientos.Guardar().subscribe(
                  (respuestaSeguimientos : RespuestaInterface) => {
                    if (respuestaSeguimientos.codigo == 200) {
                      // Creación de agendamientos 
                      respuestaSeguimientos.mensaje.dbRefs.forEach(element => {
                        let nuevoAgendamiento : AgendamientosInterface = {'id': null, 'agendas_id': this.controladorAgendas.actual.id ,'seguimientos_id' : element.id }
                        this.controladorAgendamientos.Agregar(nuevoAgendamiento);
                      });
                      this.controladorAgendamientos.Guardar().subscribe(
                        (respuestaAgendamientos : RespuestaInterface) => {
                          if (respuestaAgendamientos.codigo == 200) {
           
                            // Eliminacion de seguimientos y agendamientos en el controlador 
                            this.controladorSeguimientos.Primero();
                            while (!this.controladorSeguimientos.esFin) {
                              let encontrado = this.registrosAgendados.find(agendado => agendado.id == this.controladorSeguimientos.actual.personas_id);   
                              if(isUndefined(encontrado)){
                          
                                this.controladorAgendamientos.Encontrar("seguimientos_id", this.controladorSeguimientos.actual.id);
                                this.controladorAgendamientos.Eliminar();
                                this.controladorSeguimientos.Eliminar(false);
                              }
                              this.controladorSeguimientos.Siguiente();
                            }  
                            
                            // Eliminacion de Agendamientos
                            this.controladorAgendamientos.Guardar().subscribe(
                              (respuestaAgendamientosE : RespuestaInterface) => {
                                if (respuestaAgendamientosE.codigo == 200) {
                 

                                  // Eliminacion de seguimientos
                                  this.controladorSeguimientos.Guardar().subscribe(
                                    (respuestaSeguimientosE : RespuestaInterface) => {
                                      if (respuestaSeguimientosE.codigo == 200) {
                       
                                                          
                                      
                                        alert("Cambios de la agenda" + " " + this.controladorAgendas.actual.id + " " + "realizados");
                                        this.servicioAmbiente.agendaModo.modo = 1;
      
                                        
                                      } else {
                                        alert("Error al Eliminar seguimientos");
                                      }
                                    }
                                  );



                                } else {
                                  alert("Error al Eliminar Agendamientos");
                                }
                              }
                            );
                            
                          
                          } else {
                            alert("Error al guardar Agendamientos");
                          }
                        }
                      );

                    } else {
                      alert("Error al guardar Agendamientos" +respuestaSeguimientos.mensaje);
                    }
                  }
                );
      
              } else {
                alert("Error al guardar Agendamientos" +respuestaAsignaciones.mensaje);
              }
            }
          );

        } else {
          alert("Error al guardar Agendamientos" +respuestaAgendas.mensaje);
        }
      }
    );

  }


  ValidarSeguimiento(){

    this.notificacionActiva = false; 
    
    if( this.registrosAgendados.length == 0 ){
      this.notificacionActiva = true;
      this.notificacionMensaje = "Debe asignar seguimientos";
    }   
    
    if( this.responsableSelecionado.id == null ){
      this.notificacionActiva = true;
      this.notificacionMensaje = "Debe seleccionar un responsable";
    } 

    if( this.rol == null || this.rol == ''){
      if (this.responsableSelecionado.id == null) {
        this.notificacionActiva = true;
        this.notificacionMensaje = "Debe seleccionar un rol";
      }
    }

    if( this.cierre_fecha == null ){
      this.notificacionActiva = true;
      this.notificacionMensaje = "Debe seleccionar una fecha de cierre";
    }

    if( this.apertura_fecha == null ){
      this.notificacionActiva = true;
      this.notificacionMensaje = "Debe seleccionar una fecha de apertura";
    }


  

  }

  EstoyListoCrear(){
    let validador:boolean = false;

    if (this.servicioAmbiente.agendaModo.datos == null ) {
      validador = (
        this.controladorPersonas.EstaListo("cargue") &&
        this.agendaLista
      );
    } else {
      validador = (
        this.controladorPersonas.EstaListo("cargue") &&
        this.controladorSeguimientos.EstaListo("cargue") &&
        this.agendaLista
      );
    }


    return validador;
  }

}

