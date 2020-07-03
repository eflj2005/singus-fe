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
  @Input() controladorSeguimientos:SeguimientosController;
  @Input() agenda:Observable<number>;
  datosBaseAgenda:DatosIntercambioInterface = { agenda_id: null, creador_id: null, nivel: null };

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

  }

  ngOnInit() {

    this.agenda.subscribe( idAgenda => {
      if(this.controladorSeguimientos.EstaListo('cargue')){
        this.agendaEncontrada = this.controladorAgendas.Encontrar("id", idAgenda);
        if(this.agendaEncontrada){
          console.log(this.controladorAgendas.todos);
          this.datosBaseAgenda.agenda_id = this.controladorAgendas.actual.id;
          this.datosBaseAgenda.creador_id = this.controladorAgendas.actual.creador_id;
          this.datosBaseAgenda.nivel = this.controladorAgendas.actual.nivel;
          this.datosBaseAgenda.distribuciones = this.controladorAgendas.actual.distribuciones;
        }

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
    
    const modalRef = this.servicioEmergentes.open(PersonasSubagendamientoComponentesProcesarComponent, { size : 'xl'  ,  backdropClass: 'light-blue-backdrop', backdrop: "static"  } );
    modalRef.componentInstance.controladorAgendas = this.controladorAgendas;
    modalRef.componentInstance.controladorSeguimientos = this.controladorSeguimientos;
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


