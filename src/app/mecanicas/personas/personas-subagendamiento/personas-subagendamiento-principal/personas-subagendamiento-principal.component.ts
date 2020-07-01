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
import { BehaviorSubject } from 'rxjs';

interface AgendasCompletoInterface extends AgendasInterface  {
  creador: string;
  creador_id: number;
  asignados: number;
  distribuciones: number,
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

  usuario_Id:number;

  agendaSeleccionada:  BehaviorSubject<number>;

  controladorAsignaciones: AsignacionesController;
  controladorAgendas: AgendasController;
  controladorAgendasForaneas: AgendasController;

  constructor(
    private servicioAmbiente : AmbienteService,
    private llamadoHttp : HttpClient,    
    private autenticador: AutenticacionService,

  ) { 

    let caracteristicasConsultas:EstructuraConsultas;

    this.agendaSeleccionada = new BehaviorSubject(0);

    this.usuario_Id = this.autenticador.UsuarioActualValor.id;

    this.controladorAgendas = new AgendasController(llamadoHttp , servicioAmbiente);
    this.controladorAgendasForaneas = new AgendasController(llamadoHttp , servicioAmbiente);

    caracteristicasConsultas = new EstructuraConsultas();
    caracteristicasConsultas.ActivarDiferentes();
    caracteristicasConsultas.AgregarColumna( null , "(SELECT usuarios_id FROM asignaciones WHERE agendas_id = agendas.id AND tipo = 'C' )", "creador_id", true); 
    caracteristicasConsultas.AgregarColumna( null , "(SELECT usuarios_id FROM asignaciones WHERE agendas_id = agendas.id AND tipo = 'R' )", "responsable_id", true );       
    caracteristicasConsultas.AgregarColumna( null , "(SELECT COUNT(*) FROM agendamientos WHERE agendamientos.agendas_id = agendas.id)", "asignados", true ); 
    caracteristicasConsultas.AgregarColumna( null , "(SELECT CONCAT(usuarios.nombres,' ',usuarios.apellidos) FROM usuarios INNER JOIN asignaciones ON usuarios.id = asignaciones.usuarios_id WHERE asignaciones.agendas_id = agendas.id AND asignaciones.tipo = 'C')", "creador" );
    caracteristicasConsultas.AgregarColumna( null , "( SELECT COUNT(*) FROM agendas AS AC WHERE AC.agendas_id = agendas.id )" , "distribuciones", true) ;
    caracteristicasConsultas.AgregarEnlace( "asignaciones" ,  "agendas" ,  "asignaciones" );
    caracteristicasConsultas.AgregarFiltro( "", "asignaciones" , "usuarios_id" , "=", String(this.usuario_Id) );
    caracteristicasConsultas.AgregarOrdenamiento( "agendas.id" , "ASC" );
    this.controladorAgendas.CargarDesdeDB( true, "A", caracteristicasConsultas ).subscribe( (respuestaAP:RespuestaInterface) => {           // Carge de Agendas

      caracteristicasConsultas = new EstructuraConsultas();
      caracteristicasConsultas.AgregarColumna( null , "(SELECT usuarios_id FROM asignaciones WHERE agendas_id = agendas.id AND tipo = 'C' )", "creador_id", true); 
      caracteristicasConsultas.AgregarColumna( null , "(SELECT usuarios_id FROM asignaciones WHERE agendas_id = agendas.id AND tipo = 'R' )", "responsable_id", true );       
      caracteristicasConsultas.AgregarColumna( null , "(SELECT COUNT(*) FROM agendamientos WHERE agendamientos.agendas_id = agendas.id)", "asignados", true ); 
      caracteristicasConsultas.AgregarColumna( null , "(SELECT CONCAT(usuarios.nombres,' ',usuarios.apellidos) FROM usuarios INNER JOIN asignaciones ON usuarios.id = asignaciones.usuarios_id WHERE asignaciones.agendas_id = agendas.id AND asignaciones.tipo = 'C')", "creador" );
      caracteristicasConsultas.AgregarColumna( null , "( SELECT COUNT(*) FROM agendas AS AC WHERE AC.agendas_id = agendas.id )" , "distribuciones", true) ;
      let opereadorLogico: string = "";
      this.controladorAgendas.todos.filter( (agenda: { agendas_id: any }) => agenda.agendas_id != null ).forEach( (agenda, indice) => {
        if( indice == 0)  opereadorLogico = "";
        else              opereadorLogico = "OR";
        caracteristicasConsultas.AgregarFiltro( opereadorLogico, "agendas" , "id" , "=", agenda.agendas_id );  
      });
      caracteristicasConsultas.AgregarOrdenamiento( "agendas.id" , "ASC" );
      this.controladorAgendasForaneas.CargarDesdeDB( true, "A", caracteristicasConsultas ).subscribe( (respuestaAF:RespuestaInterface) => {           // Carge de Agendas
        this.controladorAgendas.AgregarForanea(this.controladorAgendasForaneas);
      });   

    });

  }



  ngOnInit() {

  }



}
