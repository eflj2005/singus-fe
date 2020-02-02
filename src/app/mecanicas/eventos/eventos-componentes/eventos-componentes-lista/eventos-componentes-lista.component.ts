import { Component,  OnInit, PipeTransform} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import {AmbienteService} from '@servicios/ambiente.service';
import { EventoInterface } from '@interfaces/eventos.interface';
import { EventosController } from '@controladores/eventos.controller';
import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { EstructuraConsultas } from '@generales/estructura-consultas';
import { PersonasInterface } from '@interfaces/personas.interface';
import { AsistenciaController } from '@controladores/asistencia.controller';

interface Asistencia extends PersonasInterface {
  nombreCompleto:string;
}



interface PersonaTemporar { 
  Id:number,
  Nombre:string,
  Programa:string,
  Cedula:string,
  Seleccionado: boolean
}



@Component({
  selector: 'app-eventos-componentes-lista',
  templateUrl: './eventos-componentes-lista.component.html',
  styleUrls: ['./eventos-componentes-lista.component.css'],
  providers: [DecimalPipe]
})
export class EventosComponentesListaComponent implements OnInit {

  registrosEventos: EventoInterface[];
  registrosEventos$: Observable<EventoInterface[]>;
  controladorEventos: EventosController;
  controladorAsistencias: AsistenciaController;

  asistencia: Asistencia[];
  personas: Asistencia[];
  personas$: Observable<Asistencia[]>;
  
  filter = new FormControl('');
  filterPersonas = new FormControl('');



    PERSONAS: PersonaTemporar[] = [{
      Id:1,
      Nombre:"Cesar Duvan Martinez",
      Programa:"Ingenieria de sistemas",
      Cedula:"1007405687",
      Seleccionado: false
    },
    {
      Id:2,
      Nombre:"Diego Fernando Osorio ",
      Programa:"Ingenieria de sistemas",
      Cedula:"1011234187",
      Seleccionado: false
    },
    {
      Id:2,
      Nombre:"Diego Fernando Osorio ",
      Programa:"Ingenieria de sistemas",
      Cedula:"1011234187",
      Seleccionado: false
    }
  ];

  
  
 



  // Constructor parameters: add llamdo http and change the Ambiente service
  // constructor body: vacio de datos en la variable registro  e intancia del controladorUsuarios 
  constructor(private modal: NgbModal ,
              private pipe: DecimalPipe, 
              private llamadoHttp :HttpClient,
              private servicioAmbiente: AmbienteService
              )           
  {


    this.registrosEventos= [];
    this.controladorEventos = new EventosController(llamadoHttp,servicioAmbiente);

    this.controladorEventos.CargarDesdeDB(true,"S").subscribe(
      (respuesta: RespuestaInterface) =>{
        switch(respuesta.codigo){
          case 200:
            this.registrosEventos = this.controladorEventos.todos;
            
            this.registrosEventos$ = this.filter.valueChanges.pipe(
              startWith(''),
              map(text => this.buscar(text, pipe))
            )
            break;
          default:
            alert("Error: "+respuesta.mensaje);
            break;
        }
      }
    );

    this.AplicarFiltros();


    // this.personas$ = this.filterPersonas.valueChanges.pipe(
    //   startWith(''),
    //   map(text => this.buscarPersonas(text, pipe))
    // )
    this.asistencia = [];

    // CONSULTA  
    // SELECT  personas.id as 'id',
		//         personas.iduniminuto as 'iduniminuto',
    //         CONCAT(personas.nombres, ' ' , personas.apellidos) as 'nombreCompleto'
    //   FROM asistencias
   	//       INNER JOIN eventos
    // 	      ON asistencias.eventos_id = eventos.id
    //       INNER JOIN personas
    // 	      ON asistencias.personas_id = personas.id
    //   WHERE asistencias.eventos_id = 1 ;

    this.controladorAsistencias = new AsistenciaController(llamadoHttp,servicioAmbiente);
    let caracteristicas = new EstructuraConsultas();
    caracteristicas.AgregarColumna( "personas", "id" , "id" );
    caracteristicas.AgregarColumna( "personas", "iduniminuto" , "iduniminuto" );
    caracteristicas.AgregarColumna( null, "CONCAT( personas.nombres , ' ' , personas.apellidos )" , "nombreCompleto" );
    caracteristicas.AgregarEnlace( "asistencias" , "asistencias" , "eventos" );
    caracteristicas.AgregarEnlace( "asistencias" , "asistencias" , "personas" );   
    caracteristicas.AgregarFiltro( "asistencias" , "eventos_id" , "=", "1" );

    this.controladorAsistencias.CargarDesdeDB(true, "A" , caracteristicas).subscribe(
      (respuesta: RespuestaInterface) =>{

        switch(respuesta.codigo){
          case 200:
            this.asistencia = this.controladorAsistencias.todos;
            break;
          default:
            alert("Error: "+respuesta.mensaje);
            break;
        }
      }
      
    );

   }

  buscar(text: string , pipe: PipeTransform):EventoInterface[] {
    return this.registrosEventos.filter(evento => {
      const term = text.toLowerCase();
      return pipe.transform(evento.id).includes(term)
          || evento.nombre.toLowerCase().includes(term)
          || evento.evento_fecha.toLowerCase().includes(term)
          || evento.lugar.toLowerCase().includes(term);
    });
  }

  buscarPersonas(text: string , pipe: PipeTransform): PersonaTemporar[] {
    return this.PERSONAS.filter(persona => {
      const term = text.toLowerCase();
      return pipe.transform(persona.Id).includes(term)
          || persona.Nombre.toLowerCase().includes(term)
          || persona.Programa.toLowerCase().includes(term)
          || persona.Cedula.toLowerCase().includes(term);
  
    });
  }

  
  verModal(agregador, idEvento)
  {

    console.log(this.asistencia);

    const respuesta  = this.modal.open(agregador, { centered: true , backdropClass: 'light-blue-backdrop', size: 'xl' } );
  }

  ngOnInit() {
  }

  crear(datos){
    // change this.Ambiente service, now It's this.servicioAmbiente
    this.servicioAmbiente.eventosModo.modo = datos;

  }

  // Add aplicar filtros con los nuevos datos 
  AplicarFiltros(){
        
    this.registrosEventos$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.buscar(text, this.pipe)));

    // this.personas$ = this.filterPersonas.valueChanges.pipe(
    //   startWith(''),
    //   map(text => this.buscarPersonas(text, this.pipe))
    // )
  };

}
