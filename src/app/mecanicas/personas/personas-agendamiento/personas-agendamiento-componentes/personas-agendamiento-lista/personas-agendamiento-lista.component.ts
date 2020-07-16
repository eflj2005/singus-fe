import { Component, OnInit , PipeTransform} from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AgendasInterface } from '@interfaces/agendas.interface';
import { AgendasController } from '@controladores/agendas.controller';
import { HttpClient } from '@angular/common/http';
import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { EstructuraConsultas } from '@generales/estructura-consultas';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';
import { AgendamientosInterface} from '@interfaces/agendamientos.interface';
import { AgendamientosController } from '@controladores/agendamientos.controller';

interface ListaAgendas extends AgendasInterface{
  nombreCompletoUsuario? : string,
  tipo?:string,
  nombreResponsable?: string,
  nombreCoordinador?: string
}

interface EstadisticaAgenda extends AgendamientosInterface{
  actualizacion_fecha: string;
}


@Component({
  selector: 'app-personas-agendamiento-lista',
  templateUrl: './personas-agendamiento-lista.component.html',
  styleUrls: ['./personas-agendamiento-lista.component.css'],
  providers: [DecimalPipe]
})
export class PersonasAgendamientoListaComponent implements OnInit {

  controladorAgendas: AgendasController;
  controladorAgendamientos : AgendamientosController;

  estadisticas : EstadisticaAgenda[];
  registrosAgendas: ListaAgendas[];
  registrosAgendas$: Observable<ListaAgendas[]>;
  // filter = new FormControl('');
  filter = "";
  agendaEncontrada:ListaAgendas;
  estadisticasAgendaE = {"total": 0, "realizados": 0, "faltantes": 0, "estado":''}
  notificacionActiva:boolean=false;
  notificacionMensaje:string ="";



  constructor(private modal: NgbModal,private pipe: DecimalPipe, private llamadoHttp :HttpClient, private servicioAmbiente: AmbienteService) { 
    this.controladorAgendamientos = new AgendamientosController(this.llamadoHttp,this.servicioAmbiente);

    let caracteristicas = new EstructuraConsultas();
    caracteristicas.AgregarColumna( "agendas", "id" , null );
    caracteristicas.AgregarColumna( "agendas", "apertura_fecha" , null );
    caracteristicas.AgregarColumna( "agendas", "cierre_fecha" , null);
    caracteristicas.AgregarColumna( null , "(SELECT CONCAT(usuarios.nombres,' ',usuarios.apellidos) FROM usuarios INNER JOIN asignaciones ON usuarios.id = asignaciones.usuarios_id WHERE asignaciones.agendas_id = agendas.id AND asignaciones.tipo = 'C')", "creador" );
    caracteristicas.AgregarColumna( null , "(SELECT CONCAT(usuarios.nombres,' ',usuarios.apellidos) FROM usuarios INNER JOIN asignaciones ON usuarios.id = asignaciones.usuarios_id WHERE asignaciones.agendas_id = agendas.id AND asignaciones.tipo = 'R')", "responsable" );
    caracteristicas.AgregarFiltro( "","agendas" , "nivel" , "=", "0" ); 

    this.controladorAgendas = new AgendasController(this.llamadoHttp,this.servicioAmbiente);
    this.controladorAgendas.CargarDesdeDB(true, "A" , caracteristicas).subscribe(

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



  // AplicarFiltros(){
  //   this.registrosAgendas$ = this.filter.valueChanges.pipe(
  //     startWith(''),
  //     map(text => this.buscarAgendas(text, this.pipe))
  //   );
  // }

  // buscarAgendas(text: string , pipe: PipeTransform): ListaAgendas[] {
  //   return this.controladorAgendas.todos.filter(agenda => {
  //     const term = text.toLowerCase();
  //     return pipe.transform(agenda.id).includes(term)
  //         || agenda.cierre_fecha.toLowerCase().includes(term)
  //         || agenda.apertura_fecha.toLowerCase().includes(term)
  //         || agenda.creador.toLowerCase().includes(term)
  //         || agenda.responsable.toLowerCase().includes(term) ;

  //   });
  // }

  buscarAgendas(): ListaAgendas[] {
    let temporal: ListaAgendas[];

    temporal = this.controladorAgendas.todos.filter(agenda => {  
      return String(agenda.id).includes(this.filter) 
      || agenda.cierre_fecha.toLowerCase().includes(this.filter)
      || agenda.apertura_fecha.toLowerCase().includes(this.filter)
      || agenda.creador.toLowerCase().includes(this.filter)
      || agenda.responsable.toLowerCase().includes(this.filter) ;        
    });

    return temporal;
  }

  ObtenerRegistros():ListaAgendas[]{
    this.registrosAgendas = [];
    this.registrosAgendas = this.buscarAgendas();
    return this.registrosAgendas
  }

  ngOnInit() {
  }
  
  EditarAgenda(modo:number, id:number){
    this.servicioAmbiente.agendaModo.modo = modo;
    this.servicioAmbiente.agendaModo.datos = id;
  }
  
  NuevaAgenda(datos){
    this.servicioAmbiente.agendaModo.modo = datos.modo
    this.servicioAmbiente.agendaModo.datos = null;
    
  }


  

  // Organizador(  ):Observable<ListaAgendas[]>{

  //   console.log('aqui');
  //   console.log(datos.length, "tamaño");
  //   let encontrado: number;
  //   for (let i = 0; i < datos.length; i++) {
  //     encontrado = this.registrosAgendas.findIndex(agenda => agenda.id == datos[i].id );
  //     if (!(encontrado == -1)){
  //       if( datos[i].tipo == 'C' ){
  //         this.registrosAgendas[encontrado].nombreCoordinador = datos[i].nombreCompletoUsuario;
  //       }else{
  //         this.registrosAgendas[encontrado].nombreResponsable = datos[i].nombreCompletoUsuario;
  //       }
  //     }else{
  //       if( datos[i].tipo == 'C' ){
  //         this.registrosAgendas.push({'id': datos[i].id, 'apertura_fecha': datos[i].apertura_fecha, 'cierre_fecha':datos[i].cierre_fecha, 'nombreCoordinador': datos[i].nombreCompletoUsuario,'nivel': datos[i].nivel, 'registro_fecha': datos[i].registro_fecha, 'agendas_id': datos[i].agendas_id } );
  //       }else{
  //         this.registrosAgendas.push({'id': datos[i].id, 'apertura_fecha': datos[i].apertura_fecha, 'cierre_fecha':datos[i].cierre_fecha, 'nombreResponsable': datos[i].nombreCompletoUsuario,'nivel': datos[i].nivel, 'registro_fecha': datos[i].registro_fecha, 'agendas_id': datos[i].agendas_id } );
  //       }
  //     }
  //   }


  //   return this.registrosAgendas$
  // }

  AbrirModal(tipo:number, agenda: number, modal: any){
    let respuesta : any;
    switch (tipo) {
      case 1:
        this.agendaEncontrada = this.registrosAgendas.find(element => element.id == agenda) ;
        this.ConsultarEstadisticas();
        respuesta = this.modal.open( modal, { size : 'lg'  ,  backdropClass: 'light-blue-backdrop' } );
        break;
      case 2:
        this.agendaEncontrada = Object.assign({}, this.registrosAgendas.find(element => element.id == agenda) ) ;
        this.ValidarFecha();
        respuesta = this.modal.open( modal, { size : 'lg'  ,  backdropClass: 'light-blue-backdrop' } );

        break;
      default:
        break;
    }
  }

  AplazarAgenda(){

    this.controladorAgendas.Modificar(this.agendaEncontrada);
    this.controladorAgendas.Guardar().subscribe(
      (notificacion:RespuestaInterface) => {
        switch (notificacion.codigo){
          case 200:         //login ok    

          alert("GUARDADO");
          this.registrosAgendas.find(element => element.id == this.agendaEncontrada.id).cierre_fecha = this.agendaEncontrada.cierre_fecha;
         

          break;
           case 400:         //autenticación erronea / Usuario Bloqueado / Usuario Inactivo
          alert(notificacion.asunto + ": " + notificacion.mensaje);
           break;
         }
       }
     );
  }

  ValidarFecha(){

    let fechaCierreOriginal = this.registrosAgendas.find(element => element.id == this.agendaEncontrada.id).cierre_fecha;
    this.notificacionActiva = false; 
    
    if(fechaCierreOriginal >= this.agendaEncontrada.cierre_fecha ){
      this.notificacionActiva = true;
      this.notificacionMensaje = "La nueva fecha de cierre debe ser mayor a la fecha anterior";
    }   

  }

  ConsultarEstadisticas(){
    
    let caracteristicas = new EstructuraConsultas();
    caracteristicas.AgregarColumna( "seguimientos", "actualizacion_fecha" , null );
    caracteristicas.AgregarEnlace( "seguimientos" , "seguimientos" , "agendamientos" );
    caracteristicas.AgregarFiltro( "","agendamientos" , "agendas_id" , "=", String(this.agendaEncontrada.id) ); 

    this.controladorAgendamientos.CargarDesdeDB(true, "A" , caracteristicas).subscribe(

      (respuesta: RespuestaInterface) =>{
        switch(respuesta.codigo){
          case 200:
            this.estadisticas = this.controladorAgendamientos.todos;
            this.estadisticasAgendaE.total = this.estadisticas.length;
            for (let i = 0; i < this.estadisticasAgendaE.total; i++) {
              if(this.estadisticas[i].actualizacion_fecha != null){
                this.estadisticasAgendaE.realizados++;
              }
            }
            this.estadisticasAgendaE.faltantes = this.estadisticasAgendaE.total - this.estadisticasAgendaE.realizados;
            this.estadisticasAgendaE.estado = (this.estadisticasAgendaE.realizados*100)/this.estadisticasAgendaE.total + '%';
            console.log(this.estadisticas);
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
      this.controladorAgendas.EstaListo("cargue")
    );

    return validador;
  }


}
