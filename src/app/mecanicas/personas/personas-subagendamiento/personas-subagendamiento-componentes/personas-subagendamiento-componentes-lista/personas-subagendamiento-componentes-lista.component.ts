import { Component, OnInit, Input} from '@angular/core';
import { AgendamientosInterface } from '@interfaces/agendamientos.interface';
import { AgendasInterface } from '@interfaces/agendas.interface';
import { AmbienteService } from '@servicios/ambiente.service';
import { HttpClient } from '@angular/common/http';
import { AutenticacionService } from '@servicios/autenticacion.service';
import { AgendasController } from '@controladores/agendas.controller';
import { EstructuraConsultas } from '@generales/estructura-consultas';
import { AgendamientosController } from '@controladores/agendamientos.controller';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PersonasSubagendamientoComponentesProcesarComponent } from '../personas-subagendamiento-componentes-procesar/personas-subagendamiento-componentes-procesar.component';
import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { BrowserStack } from 'protractor/built/driverProviders';
import { SeguimientosController } from '@controladores/seguimientos.controller';

interface DatosIntercambioInterface{
  [index: string]: any;
}

@Component({
  selector: 'app-personas-subagendamiento-componentes-lista',
  templateUrl: './personas-subagendamiento-componentes-lista.component.html',
  styleUrls: ['./personas-subagendamiento-componentes-lista.component.css']
})
export class PersonasSubagendamientoComponentesListaComponent implements OnInit {

  @Input() controladorAgendas:AgendasController;
  @Input() agenda:Observable<number>;
  agenda_id:number;

  agendaEncontrada:boolean;
  
  usuario_id:number;

  controladorAgendamientos: AgendamientosController;
  controladorSeguiminetos: SeguimientosController;

  constructor(
    private servicioAmbiente : AmbienteService,
    private llamadoHttp : HttpClient,    
    private autenticador: AutenticacionService,
    private servicioEmergentes: NgbModal,    
  ) { 

    let caracteristicasConsultas:EstructuraConsultas;

    this.usuario_id = this.autenticador.UsuarioActualValor.id;
    this.agendaEncontrada=false;

    this.controladorSeguiminetos = new SeguimientosController(llamadoHttp , servicioAmbiente);

    caracteristicasConsultas = new EstructuraConsultas();
    caracteristicasConsultas.AgregarColumna( null, "CONCAT(personas.nombres, ' ', personas.apellidos)", "nombreCompleto");
    caracteristicasConsultas.AgregarColumna( "personas", "iduniminuto", "uniminutoId", true);
    caracteristicasConsultas.AgregarColumna( "personas", "registro_fecha", "fechaRegistro");
    caracteristicasConsultas.AgregarColumna( "personas", "actualizacion_fecha", "fechaActualizacion");
    caracteristicasConsultas.AgregarColumna( "agendamientos", "agendas_id", "agenda_id", true);
    caracteristicasConsultas.AgregarEnlace( "personas", "personas", "seguimientos");
    caracteristicasConsultas.AgregarEnlace( "agendamientos", "seguimientos", "agendamientos");    
    caracteristicasConsultas.AgregarEnlace( "agendas", "agendas", "agendamientos");
    caracteristicasConsultas.AgregarEnlace( "asignaciones", "agendas", "asignaciones");
    caracteristicasConsultas.AgregarFiltro(   "",     "asignaciones" ,  "usuarios_id" , "=", String(this.usuario_id) );
    caracteristicasConsultas.AgregarFiltro(   "AND",  "asignaciones" ,  "tipo" , "=", "R" );
    this.controladorSeguiminetos.CargarDesdeDB( true, "A", caracteristicasConsultas ).subscribe( (respuestaAG:RespuestaInterface) => {           // Carge de Agenda

    }); 


  }

  ngOnInit() {

    this.agenda.subscribe( idAgenda => {
      if(this.controladorAgendamientos.EstaListo('cargue')){
        this.agenda_id = idAgenda;
        this.agendaEncontrada = this.controladorAgendas.Encontrar("id",idAgenda);
      }
    });
    
  }

  EliminarAgenda( agenda_id: number ){
    // if(this.agendamientos.length != 0 ){
    //   alert("La agenda a descartar debe estar vacia");
    // }
    // else{
    //   this.controladorAgendas.Encontrar("id",agenda_id );
    //   console.log(this.controladorAgendas.actual);
    // }

  }

  ProcesarAgenda( modoRecibido: string, idRecibido : number ){
    

    var registroPadre: AgendasInterface;
    var registroActual: AgendasInterface;

    var informacion: DatosIntercambioInterface = { 
      padre: registroPadre,
      actual: registroActual
    }

    switch(modoRecibido){
      case "subagendar":
        informacion.padre = Object.assign({},this.controladorAgendas.actual);
        informacion.actual = {  id: null, apertura_fecha: "", cierre_fecha: "",  nivel: null  }
      break;
      case "modificar":

      break;
    }

    
    const modalRef = this.servicioEmergentes.open(PersonasSubagendamientoComponentesProcesarComponent, { size : 'xl'  ,  backdropClass: 'light-blue-backdrop', backdrop: "static"  } );
    modalRef.componentInstance.datos = informacion;
    modalRef.componentInstance.modal = modalRef;


    modalRef.result.then(
      (result) => {                  
        if(result == 'GUARDAR'){
//          this.AplicarFiltros();               
        }
      },
      (reason) => { } // Se recibe dismiss  
    );

  }

  // AplicarFiltros(){
  //   this.registros$ = this.filter.valueChanges.pipe(
  //     startWith(''),
  //     map(text => this.Buscar(text, this.pipe))
  //   );
  // }


  FiltrarDatos( arreglo : any , campo : string , valor : any ){
    let resultados = arreglo.filter( (elemento: { [x: string]: any; }) => elemento[campo] == valor );
    return resultados;
  }

}


