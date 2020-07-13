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
import { PersonasActualizacionInformacionComponent } from '@mecanicas/personas/personas-actualizacion/personas-actualizacion-componentes/personas-actualizacion-informacion/personas-actualizacion-informacion.component';
import { SeguimientosInterface } from '@interfaces/seguimientos.interface';
import { DatePipe } from '@angular/common';
import { AsignacionesController } from '@controladores/asignaciones.controller';


interface DatosIntercambioInterface{
  [index: string]: any;
}

interface registroSeguimientoInterface{
  id: number;
  actualizacion_fecha: string;
  tiposobservaciones_id: number;
  observacion: string;
  nombre: string;
}

@Component({
  selector: 'app-personas-subagendamiento-componentes-lista',
  templateUrl: './personas-subagendamiento-componentes-lista.component.html',
  styleUrls: ['./personas-subagendamiento-componentes-lista.component.css']
})
export class PersonasSubagendamientoComponentesListaComponent implements OnInit {

  @Input() controladorAgendas:AgendasController;
  @Input() controladorSeguimientos:SeguimientosController;
  @Input() agenda:Observable<number>;
  datosBaseAgenda:DatosIntercambioInterface = { agenda_id: null, creador_id: null, nivel: null };

  agendaEncontrada:boolean;
  
  usuario_id:number;

  controladorAgendamientos: AgendamientosController;
  controladorAsignaciones: AsignacionesController;
  

  seguimientoRegistro: registroSeguimientoInterface;

  notificacionActiva:boolean=false;
  notificacionMensaje:string ="";

  constructor(
    private servicioAmbiente : AmbienteService,
    private llamadoHttp : HttpClient,    
    private autenticador: AutenticacionService,
    private servicioEmergentes: NgbModal,
    private utilidadFechas: DatePipe
  ) { 

    this.controladorAsignaciones= new AsignacionesController(llamadoHttp,servicioAmbiente);

    this.usuario_id = this.autenticador.UsuarioActualValor.id;
    this.agendaEncontrada=false;
  
    this.seguimientoRegistro = {
      id: null,
      actualizacion_fecha: null,
      tiposobservaciones_id: null,
      observacion: null,
      nombre: null
    }

  }

  ngOnInit() {

    this.agenda.subscribe( idAgenda => {
      if(this.controladorSeguimientos.EstaListo('cargue')){
        this.agendaEncontrada = this.controladorAgendas.Encontrar("id", idAgenda);
        if(this.agendaEncontrada){
          this.datosBaseAgenda.agenda_id = this.controladorAgendas.actual.id;
          this.datosBaseAgenda.creador_id = this.controladorAgendas.actual.creador_id;
          this.datosBaseAgenda.nivel = this.controladorAgendas.actual.nivel;
          this.datosBaseAgenda.distribuciones = this.controladorAgendas.actual.distribuciones;

          let caracteristicasConsultas:EstructuraConsultas;
          caracteristicasConsultas = new EstructuraConsultas( "F", null, "agendas_id", "=",String(this.controladorAgendas.actual.id) );
          this.controladorAsignaciones.CargarDesdeDB( true, "S", caracteristicasConsultas).subscribe( (respuestaAsignaciones:RespuestaInterface) => {           // Carge de Asignaciones
          });

        }

      }
    });
    
  }

  EliminarAgenda( ){
    let seguimientos: SeguimientosInterface[];

    if(confirm("Esta seguro ued esea descartar la agenda seleccionada?")){
      seguimientos = this.controladorSeguimientos.todos.filter( elemento => elemento.agenda_id == this.datosBaseAgenda.agenda_id && elemento.tipo_asignacion == "C" );
 
      if(seguimientos.length != 0 ){
        alert("La agenda a descartar debe estar vacia");
      }
      else{
        if(this.controladorAgendas.actual.id != this.datosBaseAgenda.agenda_id )  this.controladorAgendas.Encontrar("id",this.datosBaseAgenda.agenda_id);
        
        this.controladorAgendas.Eliminar();
        this.controladorAsignaciones.Primero();
        while(!this.controladorAsignaciones.esFin){
          this.controladorAsignaciones.Eliminar(false);
          this.controladorAsignaciones.Siguiente();
        }
  
        this.controladorAsignaciones.Guardar().subscribe((respuestaAsignaciones: RespuestaInterface) => {
          if( respuestaAsignaciones.codigo == 200 ){
  
            this.controladorSeguimientos.Guardar().subscribe((respuestaAgendas: RespuestaInterface) => {
              if( respuestaAgendas.codigo == 200 ){
                
                alert("Eliminicación de agenda satisfactorio");
                
                this.RecargarControladores();
              }    
              else{
                alert("Error al descartar agenda");
              }         
            });
  
          }    
          else{
            alert("Error al desasignar de agenda");
          }         
        });
      }
    }

  }

  ProcesarAgenda( modoRecibido: string ){
    
    const modalRef = this.servicioEmergentes.open(PersonasSubagendamientoComponentesProcesarComponent, { size : 'xl'  ,  backdropClass: 'light-blue-backdrop', backdrop: "static"  } );
    modalRef.componentInstance.controladorAgendas = this.controladorAgendas;
    modalRef.componentInstance.controladorSeguimientos = this.controladorSeguimientos;
    modalRef.componentInstance.controladorAsignaciones = this.controladorAsignaciones;
    modalRef.componentInstance.idAgendaProcesada = this.datosBaseAgenda.agenda_id;
    modalRef.componentInstance.modoProceso = modoRecibido;
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

  CargarPersona( idPersona: number ){
    this.servicioAmbiente.controlMecanicasPersonas.datos = { id: idPersona };
    this.servicioAmbiente.controlMecanicasPersonas.modo = 3;
    const modalRef = this.servicioEmergentes.open(PersonasActualizacionInformacionComponent, { size : 'xl'  ,  backdropClass: 'light-blue-backdrop', backdrop: "static"  } );    
    modalRef.componentInstance.modalRecibido = modalRef;
  }

  ActivaSeguimiento( idSeguimiento: number, modalRecibido: any ){
    this.controladorSeguimientos.Encontrar("id",idSeguimiento );
    
    this.seguimientoRegistro = { 
      id: this.controladorSeguimientos.actual.id,  
      actualizacion_fecha: this.controladorSeguimientos.actual.actualizacion_fecha,
      tiposobservaciones_id: this.controladorSeguimientos.actual.tiposobservaciones_id,
      observacion: this.controladorSeguimientos.actual.observacion,
      nombre: this.controladorSeguimientos.actual.nombreCompleto,
    }

    let parametrosModal = { centered : true,  backdropClass: 'light-blue-backdrop'  };
    this.servicioEmergentes.open( modalRecibido, parametrosModal );

    this.ValidarSeguimiento();
  }

  ValidarSeguimiento(){

    this.notificacionActiva = false;

    if( this.seguimientoRegistro.observacion == null || this.seguimientoRegistro.observacion == "" ){
      this.notificacionActiva = true;
      this.notificacionMensaje = "Debe registrar una observación";
    }   

    if( this.seguimientoRegistro.tiposobservaciones_id == null ){
      this.notificacionActiva = true;
      this.notificacionMensaje = "Debe seleccionar una tipo de observación";
    }    

  }

  ActualizarSeguimiento( modalref: any ){
    let temporal: SeguimientosInterface;
    this.controladorSeguimientos.Encontrar("id",this.seguimientoRegistro.id );
    temporal = Object.assign({},this.controladorSeguimientos.actual);
    temporal.tiposobservaciones_id = this.seguimientoRegistro.tiposobservaciones_id;
    temporal.observacion = this.seguimientoRegistro.observacion;
    temporal.actualizacion_fecha = this.utilidadFechas.transform(new Date(), 'yyyy-MM-dd');
    this.controladorSeguimientos.Modificar(temporal);
    
    this.controladorSeguimientos.Guardar().subscribe((respuesta: RespuestaInterface) => {
      if( respuesta.codigo == 200 ){
        alert("Guardado de seguimieto satisfactorio");
        modalref.dismiss('NO');
      }    
      else{
        alert("Error al guardar seguimieto");
      }         
    });

  }


  // AplicarFiltros(){
  //   this.registros$ = this.filter.valueChanges.pipe(
  //     startWith(''),
  //     map(text => this.Buscar(text, this.pipe))
  //   );
  // }


  RecargarControladores(){
    this.controladorAgendas.Recargar().subscribe( (respuestaAP:RespuestaInterface) => { 
      this.controladorAgendas.ObtenerForanea("agendas").Recargar().subscribe( (respuestaAF:RespuestaInterface) => { });
      this.controladorSeguimientos.Recargar().subscribe( (respuestaAG:RespuestaInterface) => { }); 
    });
  }

  
  ObtenerSeguimientos(): any[] {
    let listaRespuesta: any[];
    listaRespuesta = this.FiltrarDatos( this.controladorSeguimientos.todos,  'agenda_id' , this.datosBaseAgenda.agenda_id );

    if( this.datosBaseAgenda.creador_id == this.usuario_id ){
      listaRespuesta = this.FiltrarDatos( listaRespuesta,  'tipo_asignacion' , 'C' );
    }
    return listaRespuesta;
  }





  FiltrarDatos( arreglo : any[] , campo : string , valor : any ): any[] {
    let resultados = arreglo.filter( (elemento: { [x: string]: any; }) => elemento[campo] == valor );
    return resultados;
  }

}


