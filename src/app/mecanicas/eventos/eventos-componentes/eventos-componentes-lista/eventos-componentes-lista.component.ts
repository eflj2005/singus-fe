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
import { PersonasController } from '@controladores/personas.controller';
import { AsistenciasInterface } from '@interfaces/asistencias.interface';
import { EstudiosController } from '@controladores/estudios.controller';


interface Asistencia extends PersonasInterface {
  nombreCompleto: string;
  Seleccionado: Boolean;
  Asistencia: Number;
  personas_id: Number;
}

interface Modificacion extends AsistenciasInterface {
  tipo: string;
}

@Component({
  selector: 'app-eventos-componentes-lista',
  templateUrl: './eventos-componentes-lista.component.html',
  styleUrls: ['./eventos-componentes-lista.component.css'],
  providers: [DecimalPipe]
}
)
export class EventosComponentesListaComponent implements OnInit {

  registrosEventos$: Observable<EventoInterface[]>;
  controladorEventos: EventosController;
  controladorAsistencias: AsistenciaController;
  controladorPersonas:  PersonasController;
  controladorEstudios: EstudiosController;
  modificacion: Modificacion[];  

  asistencia: Asistencia[];
  // personas:Asistencia[]; //PersonasInterface[];
  personas$: Observable<Asistencia[]>;
  evento: Number;
  filter = new FormControl('');
  filterPersonas = new FormControl('');


  constructor(private modal: NgbModal ,
              private pipe: DecimalPipe, 
              private llamadoHttp :HttpClient,
              private servicioAmbiente: AmbienteService
              )           
  {
    // this.registrosEventos  = [];
    this.asistencia = [];
    // this.personas = [];
    this.modificacion = [];
    // this.consultarEventos();

    this.controladorEventos = new EventosController(this.llamadoHttp,this.servicioAmbiente);
    this.controladorEventos.CargarDesdeDB().subscribe(
      (respuesta: RespuestaInterface) =>{
        switch(respuesta.codigo){
          case 200:
            this.controladorEventos.EstaListo("cargue",true).subscribe((valor:boolean) => {
              this.AplicarFiltros();
            });

            // this.registrosEventos = this.controladorEventos.todos;
            
            break;
          default:
            alert("Error: "+respuesta.mensaje);
            break;
        }
      }
    );

    // this.AplicarFiltros();
   }

  buscar(text: string , pipe: PipeTransform):EventoInterface[] {
    return this.controladorEventos.todos.filter(evento => {
      const term = text.toLowerCase();
      return pipe.transform(evento.id).includes(term)
          || evento.nombre.toLowerCase().includes(term)
          || evento.evento_fecha.toLowerCase().includes(term)
          || evento.lugar.toLowerCase().includes(term);
    });
  }

  buscarPersonas(text: string , pipe: PipeTransform): Asistencia[] {
    return this.controladorPersonas.todos.filter(persona => {
      const term = text.toLowerCase();
      return pipe.transform(persona.id).includes(term)
          || pipe.transform(persona.iduniminuto).includes(term)
          || persona.nombres.toLowerCase().includes(term)
          || persona.apellidos.toLowerCase().includes(term);
    });
  }

  
  verModal(agregador, idEvento)
  {
    this.asistencia = [];
    // this.personas = [];
    this.modificacion = [];
    this.AplicarFiltros();
    this.evento = idEvento;
    this.consultarAsistencia(idEvento)
    this.consultarPersonas();
    const respuesta  = this.modal.open(agregador, { centered: true , backdropClass: 'light-blue-backdrop', size: 'xl' } );
  
  }

  ngOnInit() {
  }

  crear(modo: number, datosEvento: EventoInterface = null){

    this.servicioAmbiente.eventosModo.modo = modo;

    if(modo != 1){
      this.servicioAmbiente.eventosModo.datos = datosEvento.id;
    }
  }

  // Add aplicar filtros con los nuevos datos 
  AplicarFiltros(){
        
    this.registrosEventos$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.buscar(text, this.pipe)));

      this.personas$ = this.filterPersonas.valueChanges.pipe(
        startWith(''),
       map(text => this.buscarPersonas(text, this.pipe))
      );
  };

  consultarAsistencia(idEvento){

    this.controladorAsistencias = new AsistenciaController(this.llamadoHttp,this.servicioAmbiente);

    let caracteristicas = new EstructuraConsultas();

    caracteristicas.AgregarColumna( "personas", "id" , "personas_id" );
    caracteristicas.AgregarColumna( "personas", "iduniminuto" , null);
    caracteristicas.AgregarColumna( null, "CONCAT( personas.nombres , ' ' , personas.apellidos )" , "nombreCompleto" );
    caracteristicas.AgregarEnlace( "eventos" , "eventos" , "asistencias" );
    caracteristicas.AgregarEnlace( "personas" , "personas" , "asistencias" );   
    caracteristicas.AgregarFiltro( "", "asistencias" , "eventos_id" , "=", idEvento );

    this.controladorAsistencias.CargarDesdeDB(true, "A" , caracteristicas).subscribe(
      (respuesta: RespuestaInterface) =>{

        switch(respuesta.codigo){
          case 200:
            this.controladorAsistencias.EstaListo("cargue",true).subscribe((valor:boolean) => {
              this.asistencia = this.controladorAsistencias.todos;
              console.log(this.asistencia);;
            });
            break;
          default: 
          
            alert("Error: "+respuesta.mensaje);
            break;
        }
      }
      );
  }

  consultarPersonas(){
    this.controladorPersonas = new PersonasController(this.llamadoHttp,this.servicioAmbiente);
    
    let caracteristicas = new EstructuraConsultas();
    caracteristicas.AgregarColumna( null, "id" , null );
    caracteristicas.AgregarColumna( null, "iduniminuto" , null);
    caracteristicas.AgregarColumna( null, "CONCAT( personas.nombres , ' ' , personas.apellidos )" , "nombreCompleto" );
    
    this.controladorPersonas.CargarDesdeDB().subscribe(
      (respuesta: RespuestaInterface) =>{
        switch(respuesta.codigo){
          case 200:
            this.controladorPersonas.EstaListo("cargue",true).subscribe((valor:boolean) => {
              this.AplicarFiltros();
            });
            this.actualizarSeleccion();
            break;
          default:
            alert("Error: "+respuesta.mensaje);
            break;
        }
      }
    );

  }

  actualizarSeleccion(){

    let posicion = 0;

    for (let i = 0; i < this.asistencia.length ; i++) {
      this.asistencia[i].Seleccionado = true;
    }
   
    for (let i = 0; posicion < this.asistencia.length;) {
 
      if (this.controladorPersonas.todos[i].id == this.asistencia[posicion].personas_id){
        this.controladorPersonas.todos[i].Seleccionado = true;
        this.controladorPersonas.todos[i].Asistencia = this.asistencia[posicion].id;
        posicion++;
        i = 0;
      }else i++; 
    }

  }

  cambiarSeleccion(personas_id,estado, idUni, nombre, apellido, idAsistencia){

     if(estado){
       estado = false;
       for (let i = 0; i < this.asistencia.length ; i++) {
        if (this.asistencia[i].personas_id == personas_id){
          this.asistencia[i].Seleccionado = estado;
        }
      }
     }else{
       estado = true;
       this.asistencia.push(Object.assign({"personas_id":personas_id, "iduniminuto":idUni, "nombreCompleto":nombre + " " + apellido ,"Seleccionado": estado}));

     }
      console.log(this.asistencia);
      this.agregarModificacion(personas_id,estado, idAsistencia);
      console.log(this.modificacion);

  }

  agregarModificacion(personas_id,estado, idAsistencia){

    let elemento = (element) => element.personas_id == personas_id;
    let posicion = this.modificacion.findIndex(elemento);

    console.log(posicion);

      if(!(posicion == -1)){
        this.modificacion.splice(posicion,1)
      }else if(estado){
        this.modificacion.push(Object.assign({"id":null, "personas_id":personas_id, "tipo":"agregar" , "eventos_id": this.evento}));
      }else{
        this.modificacion.push(Object.assign({"id":idAsistencia, "personas_id":personas_id, "tipo":"eliminar", "eventos_id": this.evento }));
      }
  }

  limpiar(){
    this.asistencia = [];
    // this.personas = [];
    this.modificacion = [];
    this.AplicarFiltros();
    this.modal.dismissAll('NO');
  }

  actualizarAsistencia(){

    this.controladorEstudios = new EstudiosController(this.llamadoHttp,this.servicioAmbiente);

    this.controladorAsistencias.LimpiarTodo();

    let caracteristicas = new  EstructuraConsultas();

    this.controladorEventos.Encontrar("id", this.evento);

    console.log( this.controladorEventos.actual.ofertas_id );

    caracteristicas.AgregarFiltro("","estudios","ofertas_id","=", this.controladorEventos.actual.ofertas_id );
    

    for (let i = 0; i < this.modificacion.length; i++) {

      if(this.modificacion[i].tipo == "agregar" ) {
        this.controladorAsistencias.Agregar(this.modificacion[i]);
                
        this.modificacion.forEach(element => {
          
        });
      }
      else{ 
        this.modificacion[i].modo = "E";
        this.controladorAsistencias.registros.push(this.modificacion[i]);
      }
      
    }

    console.log(this.controladorAsistencias.registros);

    this.controladorAsistencias.Guardar().subscribe(
      (notificacion:RespuestaInterface) => {
        switch (notificacion.codigo){
          case 200:         //login ok         

            alert("GUARDADO");
            this.limpiar();
          break;
          case 400:         //autenticación erronea / Usuario Bloqueado / Usuario Inactivo
            alert(notificacion.asunto + ": " + notificacion.mensaje);
          break;
        }
      }
    );
    // let agregar: Modificacion[] ;
    // let eliminar: Modificacion[] ;
    // agregar = [];
    // eliminar = [];
    // for (let i = 0; i < this.modificacion.length; i++) {
    //   if ( this.modificacion[i].tipo == "agregar" ) {
    //     agregar.push(Object.assign(this.modificacion[i]))
    //   }else{
    //     eliminar.push(Object.assign(this.modificacion[i]))
    //   }
    // }

    // if (!(agregar.length == 0) && !(eliminar.length == 0)) {
    //   this.controladorAsistencias.Agregar(agregar);

    // } else {
      
    // }

    // this.controladorAsistencias.Agregar(agregar);
    // // this.controladorAsistencias.Eliminar(eliminar);
    // console.log(agregar);
    // console.log(eliminar);
  };

  EstoyListo(controlador:String){
  
    let validador:boolean = false;
    
    switch(controlador){
      case "eventos":
        validador =  this.controladorEventos.EstaListo("cargue");
        break;
      
      case "personas":
        validador =  this.controladorPersonas.EstaListo("cargue");
        break;
    }

    return validador;
  }
  
}
