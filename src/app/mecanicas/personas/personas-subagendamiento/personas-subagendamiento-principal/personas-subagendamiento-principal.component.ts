import { Component, OnInit } from '@angular/core';
import { AmbienteService } from '@servicios/ambiente.service'
import { AgendasInterface } from '@interfaces/agendas.interface';
import { AutenticacionService } from '@servicios/autenticacion.service';
import { AsignacionesController } from '@controladores/asignaciones.controller';
import { HttpClient } from '@angular/common/http';
import { EstructuraConsultas } from '@generales/estructura-consultas';
import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { AgendasController } from '@controladores/agendas.controller';
import { AgendamientosInterface } from '@interfaces/agendamientos.interface';
import { AgendamientosController } from '@controladores/agendamientos.controller';

interface DatosIntercambioInterface{
  [index: string]: any;
}

interface AgendasCompletoInterface extends AgendasInterface  {
  creador: string;
  creador_id: number;
  asignados: number;
  uniminutoId: number;
  fechaRegistro: string;
  fechaActualizacion: string;
}

interface AgendamientosCompleto extends AgendamientosInterface{
  nombreCompleto: string;
  seguimientosId: number;
}

@Component({
  selector: 'app-personas-subagendamiento-principal',
  templateUrl: './personas-subagendamiento-principal.component.html',
  styleUrls: ['./personas-subagendamiento-principal.component.css']
})
export class PersonasSubagendamientoPrincipalComponent implements OnInit {

  listaAgendas: AgendasCompletoInterface[] = [];
  usuarioId:number;

  datosAgendaSeleccionada:  DatosIntercambioInterface;

  controladorAsignaciones: AsignacionesController;
  controladorAgendas: AgendasController;
  controladorAgendasForaneo: AgendasController;
  controladorAgendamientos: AgendamientosController;

  datosAgendamientos: AgendasCompletoInterface[] = [];

  constructor(
    private servicioAmbiente : AmbienteService,
    private llamadoHttp : HttpClient,    
    private autenticador: AutenticacionService,

  ) { 

    let caracteristicasConsultas:EstructuraConsultas;

    this.datosAgendaSeleccionada =  { id: 0, nivel: null, creadorId: 0 };
    
    // this.listaAgendas.push( { id: 1, agendas_id: null, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 0, asignados: 10, creador: "Pepito Flores" } );      //10
    //   this.listaAgendas.push( { id: 2, agendas_id: 1, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 1, asignados: 5, creador: "Perencejto Rivas" } );    //5
    //     this.listaAgendas.push( { id: 4, agendas_id: 2, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 2, creador: "Sultanita Rojas" } );     //2
    //     this.listaAgendas.push( { id: 5, agendas_id: 2, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 2, creador: "Sultanita Rojas" } );     //2
    //     this.listaAgendas.push( { id: 6, agendas_id: 2, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 1, creador: "Sultanita Rojas" } );     //1
    //   this.listaAgendas.push( { id: 3, agendas_id: 1, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 1, asignados: 5, creador: "Perencejto Rivas" } );    //5
    //     this.listaAgendas.push( { id: 7, agendas_id: 3, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 3, creador: "Fabio Torres" } );        //3
    //     this.listaAgendas.push( { id: 8, agendas_id: 3, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 2, creador: "Fabio Torres" } );        //2


      this.usuarioId = this.autenticador.UsuarioActualValor.id;

      this.controladorAsignaciones = new AsignacionesController(llamadoHttp , servicioAmbiente);
      this.controladorAgendas = new AgendasController(llamadoHttp , servicioAmbiente);
      this.controladorAgendasForaneo = new AgendasController(llamadoHttp , servicioAmbiente);
      this.controladorAgendamientos = new AgendamientosController(llamadoHttp , servicioAmbiente);


      // caracteristicasConsultas = new EstructuraConsultas();
      // caracteristicasConsultas.AgregarFiltro( "", "asignaciones" , "usuarios_id" , "=", String(this.usuarioId) );
      // this.controladorAsignaciones.CargarDesdeDB( true, "S", caracteristicasConsultas ).subscribe( (respuestaAS:RespuestaInterface) => {           // Carge de Asignaciones
      //   console.log(this.controladorAsignaciones.todos,"AsignacionesContro");
      // });

      caracteristicasConsultas = new EstructuraConsultas();
      caracteristicasConsultas.ActivarDiferentes();
      caracteristicasConsultas.AgregarColumna( null , "(SELECT usuarios_id FROM asignaciones WHERE agendas_id = agendas.id AND tipo = 'C' )", "creador_id" ); 
      caracteristicasConsultas.AgregarColumna( null , "(SELECT usuarios_id FROM asignaciones WHERE agendas_id = agendas.id AND tipo = 'R' )", "responsable_id" );       
      caracteristicasConsultas.AgregarColumna( null , "(SELECT COUNT(*) FROM agendamientos WHERE agendamientos.agendas_id = agendas.id)", "asignados" ); 
      caracteristicasConsultas.AgregarColumna( null , "(SELECT CONCAT(usuarios.nombres,' ',usuarios.apellidos) FROM usuarios INNER JOIN asignaciones ON usuarios.id = asignaciones.usuarios_id WHERE asignaciones.agendas_id = agendas.id AND asignaciones.tipo = 'C')", "creador" );
      caracteristicasConsultas.AgregarEnlace( "asignaciones" ,  "agendas" ,  "asignaciones" );
      caracteristicasConsultas.AgregarFiltro( "", "asignaciones" , "usuarios_id" , "=", String(this.usuarioId) );
      caracteristicasConsultas.AgregarOrdenamiento( "agendas.id" , "ASC" );
      this.controladorAgendas.CargarDesdeDB( true, "A", caracteristicasConsultas ).subscribe( (respuestaAG:RespuestaInterface) => {           // Carge de Agendas
console.log(this.controladorAgendas.todos);
        // //OJO ajustar para permitir condicion con subconsulta y DISTINC
        // this.controladorAgendasForaneo.CargarDesdeDB( true, "S" ).subscribe( (respuestaAGF:RespuestaInterface) => {           // Carge de Asignaciones
        //   // console.log(this.controladorAgendasForaneo.todos, "A foraneaContro");
        //   this.controladorAgendas.AgregarForanea(this.controladorAgendasForaneo);

        // });

      });

      caracteristicasConsultas = new EstructuraConsultas();
      caracteristicasConsultas.AgregarColumna(null,"CONCAT(personas.nombres, ' ', personas.apellidos)","nombreCompleto");
      caracteristicasConsultas.AgregarColumna("personas","iduniminuto","uniminutoId");
      caracteristicasConsultas.AgregarColumna("personas","registro_fecha","fechaRegistro");
      caracteristicasConsultas.AgregarColumna("personas","actualizacion_fecha","fechaActualizacion")

      caracteristicasConsultas.AgregarEnlace("seguimientos","seguimientos","agendamientos");
      caracteristicasConsultas.AgregarEnlace("personas","personas","seguimientos");

      caracteristicasConsultas.AgregarEnlace("agendas","agendas","agendamientos");
      caracteristicasConsultas.AgregarEnlace("asignaciones","agendas","asignaciones");

      caracteristicasConsultas.AgregarFiltro( "", "asignaciones" , "usuarios_id" , "=", String(this.usuarioId) );
      caracteristicasConsultas.AgregarFiltro( "AND", "asignaciones" , "tipo" , "=", "R" );
      this.controladorAgendamientos.CargarDesdeDB( true, "A", caracteristicasConsultas ).subscribe( (respuestaAG:RespuestaInterface) => {           // Carge de Agenda

      }); 


  }



  ngOnInit() {

  }




  
  FiltrarDatos( arreglo : any , campo : string , valor : any ){
    let resultados = arreglo.filter( (elemento: { [x: string]: any; }) => elemento[campo] == valor );
    return resultados;
  }

}
