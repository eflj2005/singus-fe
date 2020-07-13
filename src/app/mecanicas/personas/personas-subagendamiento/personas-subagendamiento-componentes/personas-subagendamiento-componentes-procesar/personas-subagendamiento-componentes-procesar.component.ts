import { Component, OnInit, Input } from '@angular/core';
import { AgendasInterface } from '@interfaces/agendas.interface';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AgendasController } from '@controladores/agendas.controller';
import { SeguimientosController } from '@controladores/seguimientos.controller';
import { UsuariosController } from '@controladores/usuarios.controller';
import { AmbienteService } from '@servicios/ambiente.service';
import { HttpClient } from '@angular/common/http';
import { AutenticacionService } from '@servicios/autenticacion.service';
import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { SeguimientosInterface } from '@interfaces/seguimientos.interface';
import { AgendamientosController } from '@controladores/agendamientos.controller';
import { EstructuraConsultas } from '@generales/estructura-consultas';
import { AsignacionesController } from '@controladores/asignaciones.controller';
import { DatePipe } from '@angular/common';
import { Console } from 'console';

interface DatosIntercambioInterface{
  [index: string]: any;
}

interface AgendaCompletoInterface extends AgendasInterface{
  responsable_id: number;
}

interface DatosAgendas{
  padre: AgendasInterface,
  actual: AgendaCompletoInterface,
  agendamientos: AgendasInterface[]
}

@Component({
  selector: 'app-personas-subagendamiento-componentes-procesar',
  templateUrl: './personas-subagendamiento-componentes-procesar.component.html',
  styleUrls: ['./personas-subagendamiento-componentes-procesar.component.css']
})
export class PersonasSubagendamientoComponentesProcesarComponent implements OnInit {

  //Atribitos recibidos
  controladorAgendas: AgendasController;
  controladorSeguimientos: SeguimientosController;
  controladorAsignaciones: AsignacionesController;
  idAgendaProcesada: number;
  modoProceso: String;
  modal:NgbModalRef;

  //Otros atributos

  usuario_id:number;

  controladorUsuarios: UsuariosController;
  controladorAgendamientos: AgendamientosController; 

  titulos: { [index: string]: string; } = { principal: "", seccion: "" }
  datos: DatosAgendas ={  padre: null,  actual: null, agendamientos: null }

  listaSeguimientosDisponibles:any[];
  listaSeguimientosAsignados:any[];

  seleccionarTodos: any = {
    seguimientosDisponibles: false,
    seguimientosAsignados: false,
  }

  notificacionActiva:boolean=false;
  notificacionMensaje:string ="";

  estaProcesando:Boolean;

  constructor(
    private servicioAmbiente : AmbienteService,
    private llamadoHttp : HttpClient,
    private autenticador: AutenticacionService,
    private utilidadFechas: DatePipe
  ) {

    this.usuario_id = this.autenticador.UsuarioActualValor.id;

    this.estaProcesando= false;

    this.controladorUsuarios = new UsuariosController(llamadoHttp,servicioAmbiente);
    this.controladorAgendamientos = new AgendamientosController(llamadoHttp,servicioAmbiente);

    let caracteristicasConsultas:EstructuraConsultas;

    caracteristicasConsultas = new EstructuraConsultas();
    caracteristicasConsultas.AgregarFiltro( "", "usuarios" , "rol" , "=", 'O' );        
    caracteristicasConsultas.AgregarFiltro( "OR", "usuarios" , "id" , "=", String(this.usuario_id) );
    caracteristicasConsultas.AgregarOrdenamiento( "rol" , "ASC" );
    this.controladorUsuarios.CargarDesdeDB(true, "S", caracteristicasConsultas).subscribe( (respuestaUsuarios:RespuestaInterface) => {           // Carge de usuarios
      
      caracteristicasConsultas = new EstructuraConsultas( "F", null, "agendas_id", "=",String(this.idAgendaProcesada) );
      this.controladorAgendamientos.CargarDesdeDB( true, "S",  caracteristicasConsultas ).subscribe( (respuestaAgendamientos:RespuestaInterface) => {           // Carge de agendamientos       

        // caracteristicasConsultas = new EstructuraConsultas( "F", null, "agendas_id", "=",String(this.idAgendaProcesada) );
        // this.controladorAsignaciones.CargarDesdeDB( true, "S", caracteristicasConsultas).subscribe( (respuestaAsignaciones:RespuestaInterface) => {           // Carge de Asignaciones
        // });
      });
    });



   }

  ngOnInit() {

    switch(this.modoProceso){
      case "subagendar":
        this.titulos.principal = "Creación de Distribución";
        this.titulos.seccion = "Nueva Subagenda";

        this.controladorAgendas.Encontrar("id",this.idAgendaProcesada);
        this.datos.padre = this.controladorAgendas.actual;
        this.datos.actual = { id: null, agendas_id: this.datos.padre.id, apertura_fecha: "", cierre_fecha: "", nivel: this.datos.padre.nivel + 1 , responsable_id: null, registro_fecha: this.utilidadFechas.transform(new Date(), 'yyyy-MM-dd')  };
        this.datos.agendamientos = [];

        this.listaSeguimientosDisponibles = []
        this.listaSeguimientosAsignados = [];
        
        this.FiltrarDatos( this.controladorSeguimientos.todos , 'agenda_id' , this.datos.padre.id ).forEach( (SeguimientoDisponible: any ) => {
          let temporal: any = Object.assign({},SeguimientoDisponible);
          temporal.seleccionado = false;
          this.listaSeguimientosDisponibles.push(temporal);
        });

        this.FiltrarDatos( this.controladorSeguimientos.todos , 'agendaPadre_id' , this.datos.padre.id ).forEach( (SegimientoYaAsignado: any ) => {
          let posicion: number = 0;
          let encontrado: boolean = false;
          while(posicion < this.listaSeguimientosDisponibles.length && !encontrado){
            if(this.listaSeguimientosDisponibles[posicion].id == SegimientoYaAsignado.id){
              this.listaSeguimientosDisponibles.splice(posicion,1);
              encontrado=true;
            }
            else{
              posicion++;
            }
          }
        });


      break;
      case "modificar":
        this.titulos.principal = "Modificación de Distribución";
        this.titulos.seccion = "Modificación Agenda";

        this.controladorAgendas.Encontrar("id",this.idAgendaProcesada);
        this.datos.actual = this.controladorAgendas.actual;
        this.controladorAgendas.Encontrar("id",this.datos.actual.agendas_id);
        this.datos.padre = this.controladorAgendas.actual;
        this.datos.agendamientos = [];

        this.listaSeguimientosDisponibles = []

        this.FiltrarDatos( this.controladorSeguimientos.todos , 'agenda_id' , this.datos.padre.id ).forEach( (SeguimientoDisponible: any ) => {
          let temporal: any = Object.assign({},SeguimientoDisponible);
          temporal.seleccionado = false;
          this.listaSeguimientosDisponibles.push(temporal);
        });

        this.FiltrarDatos( this.controladorSeguimientos.todos , 'agendaPadre_id' , this.datos.padre.id ).forEach( (SegimientoYaAsignado: any ) => {
          let posicion: number = 0;
          let encontrado: boolean = false;
          while(posicion < this.listaSeguimientosDisponibles.length && !encontrado){
            if(this.listaSeguimientosDisponibles[posicion].id == SegimientoYaAsignado.id){
              this.listaSeguimientosDisponibles.splice(posicion,1);
              encontrado=true;
            }
            else{
              posicion++;
            }
          }

          this.listaSeguimientosAsignados = [];

          this.FiltrarDatos( this.controladorSeguimientos.todos , 'agenda_id' , this.datos.actual.id ).forEach( (SeguimientoAsiganado: any ) => {
            if( SeguimientoAsiganado.tipo_asignacion == "R" ){
              let temporal: any = Object.assign({},SeguimientoAsiganado);
              temporal.seleccionado = false;
              this.listaSeguimientosAsignados.push(temporal);
            }
          });        


        });


      break;
    }

    this.ValidarFormulario();

  }
  
  SeleccionarTodos( tablaControl: string){
    let lista:any[];

    switch(tablaControl){
      case 'disponibles':   lista = this.listaSeguimientosDisponibles;  break;
      case 'asignados':     lista = this.listaSeguimientosAsignados;    break; 
    }

    if(this.seleccionarTodos[tablaControl])  lista.forEach(elemento => { elemento.seleccionado = false; });
    else                                lista.forEach(elemento => { elemento.seleccionado = true; });

    this.seleccionarTodos[tablaControl] = ! this.seleccionarTodos[tablaControl];
  }

  MoverSeguimientos( tablaOrigen: string ){
    let listaOrigen:any[];
    let listaDestino:any[];
    let posicion:number;

    switch(tablaOrigen){
      case 'disponibles':
        listaOrigen  = this.listaSeguimientosDisponibles;
        listaDestino = this.listaSeguimientosAsignados;
      break;
      case 'asignados':
        listaOrigen = this.listaSeguimientosAsignados;
        listaDestino = this.listaSeguimientosDisponibles;
      break; 
    }
    posicion = 0;
    while(posicion < listaOrigen.length){
      if(listaOrigen[posicion].seleccionado){
        let temporal = Object.assign({},listaOrigen[posicion]);
        temporal.seleccionado = false;
        listaOrigen.splice( posicion, 1 ) ;
        listaDestino.push( temporal ) ;
        posicion = 0;
      }
      else{
        posicion++;
      }
    }
    this.ValidarFormulario();
  }

  Procesar(){

    let referenciaAgenda:string="";
    let referenciasAgendamientos:string[];
    let referenciasAsignaciones:string[];

    switch(this.modoProceso){
      case 'subagendar':

        referenciaAgenda="";
        referenciasAgendamientos=[];
        referenciasAsignaciones=[];

        this.estaProcesando = true;

        referenciaAgenda = this.controladorAgendas.Agregar(this.datos.actual);

        this.controladorAgendas.Guardar().subscribe( (respuestaAgendas:RespuestaInterface) => { 
          if( respuestaAgendas.codigo == 200 ){         
            referenciasAgendamientos = [];
            this.listaSeguimientosAsignados.forEach((elemento, indice)=>{
              referenciasAgendamientos.push(
                this.controladorAgendamientos.Agregar({ id: null, agendas_id: respuestaAgendas.mensaje.dbRefs[0].id, seguimientos_id: elemento.id  })
              );
            });

            this.controladorAgendamientos.Guardar().subscribe( (respuestaAgendamientos:RespuestaInterface) => { 
              if( respuestaAgendamientos.codigo == 200 ){
                referenciasAsignaciones = [];
                referenciasAsignaciones.push( this.controladorAsignaciones.Agregar( { id: null, agendas_id: respuestaAgendas.mensaje.dbRefs[0].id, usuarios_id: this.usuario_id , tipo: "C" } ) );
                referenciasAsignaciones.push( this.controladorAsignaciones.Agregar( { id: null, agendas_id: respuestaAgendas.mensaje.dbRefs[0].id, usuarios_id: this.datos.actual.responsable_id , tipo: "R"} ) );

                this.controladorAsignaciones.Guardar().subscribe( (respuestaAsignaciones:RespuestaInterface) => { 
                  if( respuestaAsignaciones.codigo == 200 ){
                    alert("Agenda Guardada satisfactoriamente");
                    this.RecargarControladores();
                    this.Cancelar();
                  }    
                  else{
                    alert("Error al asignar agendas");
                    
                    referenciasAsignaciones.forEach(elemento => {
                      this.controladorAsignaciones.Encontrar("dbRef",elemento);
                      this.controladorAsignaciones.Eliminar();
                    });
                    referenciasAgendamientos.forEach(elemento => {  
                      this.controladorAgendamientos.Encontrar("dbRef",elemento);
                      this.controladorAgendamientos.Eliminar();
                    });
                    this.controladorAgendamientos.Guardar().subscribe( (respuestaAgendamientos:RespuestaInterface) => {});//Limpieza en BD
                    this.controladorAgendas.Encontrar("dbRef",referenciaAgenda);
                    this.controladorAgendas.Eliminar();
                    this.controladorAgendamientos.Guardar().subscribe( (respuestaAgendamientos:RespuestaInterface) => {});//Limpieza en BD

                    this.estaProcesando = false;
                  }                              
                });


              }    
              else{
                alert("Error al guardar los detalles de la agenda");
                referenciasAgendamientos.forEach(elemento => {
                  this.controladorAgendamientos.Encontrar("dbRef",elemento);
                  this.controladorAgendamientos.Eliminar();
                });
                this.controladorAgendas.Encontrar("dbRef",referenciaAgenda);//OJO ya los creo en la base de datos
                this.controladorAgendas.Eliminar();
                this.controladorAgendamientos.Guardar().subscribe( (respuestaAgendamientos:RespuestaInterface) => {}); //Limpieza en BD

                this.estaProcesando = false;
              }                              
            });

          }    
          else{
            alert("Error al guardar Agenda");
            this.controladorAgendas.Encontrar("dbRef",referenciaAgenda);
            this.controladorAgendas.Eliminar();

            this.estaProcesando = false;
          }                              
        });
        break;
        case "modificar":
          referenciasAgendamientos=[];
          referenciasAsignaciones=[];

          this.estaProcesando = true;

          this.controladorAgendas.Encontrar("id",this.datos.actual.id);
          this.controladorAgendas.Modificar(this.datos.actual);
          this.controladorAgendas.Guardar().subscribe( (respuestaAgendas:RespuestaInterface) => { 
            if( respuestaAgendas.codigo == 200 ){ 
              let posicion: number;
              let encontrado:boolean;

              //Retirar Eliminados Agendamientos
              this.controladorAgendamientos.Primero();
              while( !this.controladorAgendamientos.esFin ){
                let posicion = 0;
                let encontrado = false;
                while( posicion < this.listaSeguimientosAsignados.length && !encontrado ){
                  if( this.controladorAgendamientos.actual.seguimientos_id == this.listaSeguimientosAsignados[posicion].id ) encontrado = true;
                  else                                                                                                       posicion++;
                }
                if(!encontrado) this.controladorAgendamientos.Eliminar(false);
                this.controladorAgendamientos.Siguiente();
              }

              //Agregar Nuevos Agendamientos
              this.listaSeguimientosAsignados.forEach( (seguimiento, indice) => {
                encontrado=false;
                encontrado = this.controladorAgendamientos.Encontrar("seguimientos_id",seguimiento.id);
                if(!encontrado){
                  this.controladorAgendamientos.Agregar({ id: null, agendas_id: this.datos.actual.id, seguimientos_id: seguimiento.id  });
                }               
              });
              this.controladorAgendamientos.Guardar().subscribe( (respuestaAgendamientos:RespuestaInterface) => { 

                if( respuestaAgendamientos.codigo == 200 ){

                  this.controladorAsignaciones.Encontrar("tipo","R");
                  this.controladorAsignaciones.Modificar( { id: this.controladorAsignaciones.actual.id , agendas_id: this.controladorAsignaciones.actual.agendas_id, usuarios_id: this.datos.actual.responsable_id , tipo: "R" } );
                  this.controladorAsignaciones.Guardar().subscribe( (respuestaAsignaciones:RespuestaInterface) => { 

                    if( respuestaAsignaciones.codigo == 200 ){
                      alert("Agenda Guardada satisfactoriamente");
                      this.RecargarControladores();
                      this.Cancelar();
                    }    
                    else{
                      alert("Error al asignar agendas");
                      this.estaProcesando = false;
                    }
                  });
                }
                else{
                  alert("Error al modificar los detalles la Agenda");
                  this.estaProcesando = false;
                }
              }); 
            }
            else{
              alert("Error al modificar la Agenda");
              this.estaProcesando = false;
            }
          });          
        break;
    } 
  }


  ValidarFormulario(){

    this.notificacionActiva = false;

    if( this.datos.actual.responsable_id == null ){
      this.notificacionActiva = true;
      this.notificacionMensaje = "Debe seleccionar un responsable";
    }  
    
    if( this.datos.actual.cierre_fecha == null || this.datos.actual.cierre_fecha == "" || ( new Date(this.datos.actual.cierre_fecha) > new Date(this.datos.padre.cierre_fecha) ) ){
      this.notificacionActiva = true;
      this.notificacionMensaje = "Debe seleccionar una fecha de cierre adecuada";
    }

    if( this.datos.actual.apertura_fecha == null || this.datos.actual.apertura_fecha == "" || ( new Date(this.datos.actual.apertura_fecha) < new Date(this.datos.padre.apertura_fecha) ) ){
      this.notificacionActiva = true;
      this.notificacionMensaje = "Debe seleccionar una fecha de apertura adecuada";
    }

  }



  Cancelar(){
    this.modal.dismiss('CANCELAR');
  }

  RecargarControladores(){
    this.controladorAgendas.Recargar().subscribe( (respuestaAP:RespuestaInterface) => { 
      this.controladorAgendas.ObtenerForanea("agendas").Recargar().subscribe( (respuestaAF:RespuestaInterface) => { });
      this.controladorSeguimientos.Recargar().subscribe( (respuestaAG:RespuestaInterface) => { }); 
    });
  }


  EstoyListo(){
    let validador:boolean = false;
    validador = (this.controladorAsignaciones.EstaListo("cargue") );
    return validador;
  }

  FiltrarDatos( arreglo : any[] , campo : string , valor : any ){
    let resultados: any[] = [] ;
    resultados = arreglo.filter( (elemento: { [x: string]: any; }) => elemento[campo] == valor );
    return resultados;
  }

}
