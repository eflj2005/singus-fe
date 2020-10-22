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
import { SeguimientosController } from '@controladores/seguimientos.controller';

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

  usuario_id:number;
  usuario_rol:string;

  agendaSeleccionada:  BehaviorSubject<number>;

  
  controladorAgendas: AgendasController;
  controladorAgendasForaneas: AgendasController;
  controladorSeguimientos: SeguimientosController;

  constructor(
    private servicioAmbiente : AmbienteService,
    private llamadoHttp : HttpClient,    
    private autenticador: AutenticacionService,

  ) { 

    let caracteristicasConsultas:EstructuraConsultas;

    this.agendaSeleccionada = new BehaviorSubject(0);

    this.usuario_id = this.autenticador.UsuarioActualValor.id;
    this.usuario_rol = this.autenticador.UsuarioActualValor.rol;

    this.controladorAgendas = new AgendasController(llamadoHttp , servicioAmbiente);
    this.controladorAgendasForaneas = new AgendasController(llamadoHttp , servicioAmbiente);
    this.controladorAgendas.AgregarForanea(this.controladorAgendasForaneas);
    this.controladorSeguimientos = new SeguimientosController(llamadoHttp , servicioAmbiente);


    caracteristicasConsultas = new EstructuraConsultas();
    caracteristicasConsultas.ActivarDiferentes();
    caracteristicasConsultas.AgregarColumna( null , "(SELECT usuarios_id FROM asignaciones WHERE agendas_id = agendas.id AND tipo = 'C' )", "creador_id", true); 
    caracteristicasConsultas.AgregarColumna( null , "(SELECT usuarios_id FROM asignaciones WHERE agendas_id = agendas.id AND tipo = 'R' )", "responsable_id", true );       
    caracteristicasConsultas.AgregarColumna( null , "(SELECT COUNT(*) FROM agendamientos WHERE agendamientos.agendas_id = agendas.id)", "asignados", true ); 
    caracteristicasConsultas.AgregarColumna( null , "(SELECT CONCAT(usuarios.nombres,' ',usuarios.apellidos) FROM usuarios INNER JOIN asignaciones ON usuarios.id = asignaciones.usuarios_id WHERE asignaciones.agendas_id = agendas.id AND asignaciones.tipo = 'C')", "creador" );
    caracteristicasConsultas.AgregarColumna( null , "(SELECT CONCAT(usuarios.nombres,' ',usuarios.apellidos) FROM usuarios INNER JOIN asignaciones ON usuarios.id = asignaciones.usuarios_id WHERE asignaciones.agendas_id = agendas.id AND asignaciones.tipo = 'R')", "responsable" );
    caracteristicasConsultas.AgregarColumna( null , "(SELECT COUNT(*) FROM agendas AS AC WHERE AC.agendas_id = agendas.id )" , "distribuciones", true);
    caracteristicasConsultas.AgregarColumna( 
      null, 
      "(SELECT " +
          "( SELECT count(*) FROM seguimientos INNER JOIN agendamientos ON seguimientos.id = agendamientos.seguimientos_id  WHERE agendamientos.agendas_id = agendas.id ) "+
          " - " +
          "( SELECT count(*) FROM seguimientos INNER JOIN agendamientos ON seguimientos.id = agendamientos.seguimientos_id  WHERE agendamientos.agendas_id = agendas.id AND seguimientos.tiposobservaciones_id IS NOT NULL )" +
      ")", 
      "pendientes", 
      true
    );
    caracteristicasConsultas.AgregarEnlace( "asignaciones" ,  "agendas" ,  "asignaciones" );
    if(this.usuario_rol != 'A')   caracteristicasConsultas.AgregarFiltro( "", "asignaciones" , "usuarios_id" , "=", String(this.usuario_id) );
    caracteristicasConsultas.AgregarOrdenamiento( "agendas.id" , "ASC" );

    this.controladorAgendas.CargarDesdeDB( true, "A", caracteristicasConsultas ).subscribe( (respuestaAP:RespuestaInterface) => {           // Carge de Agendas
     
      caracteristicasConsultas = new EstructuraConsultas();
      caracteristicasConsultas.AgregarColumna( null , "(SELECT usuarios_id FROM asignaciones WHERE agendas_id = agendas.id AND tipo = 'C' )", "creador_id", true); 
      caracteristicasConsultas.AgregarColumna( null , "(SELECT usuarios_id FROM asignaciones WHERE agendas_id = agendas.id AND tipo = 'R' )", "responsable_id", true );       
      caracteristicasConsultas.AgregarColumna( null , "(SELECT COUNT(*) FROM agendamientos WHERE agendamientos.agendas_id = agendas.id)", "asignados", true ); 
      caracteristicasConsultas.AgregarColumna( null , "(SELECT CONCAT(usuarios.nombres,' ',usuarios.apellidos) FROM usuarios INNER JOIN asignaciones ON usuarios.id = asignaciones.usuarios_id WHERE asignaciones.agendas_id = agendas.id AND asignaciones.tipo = 'C')", "creador" );
      caracteristicasConsultas.AgregarColumna( null , "(SELECT CONCAT(usuarios.nombres,' ',usuarios.apellidos) FROM usuarios INNER JOIN asignaciones ON usuarios.id = asignaciones.usuarios_id WHERE asignaciones.agendas_id = agendas.id AND asignaciones.tipo = 'R')", "responsable" );      
      caracteristicasConsultas.AgregarColumna( null , "( SELECT COUNT(*) FROM agendas AS AC WHERE AC.agendas_id = agendas.id )" , "distribuciones", true) ;
      let opereadorLogico: string = "";
      this.controladorAgendas.todos.filter( (agenda: { agendas_id: any }) => agenda.agendas_id != null ).forEach( (agenda, indice) => {
        if( indice == 0)  opereadorLogico = "";
        else              opereadorLogico = "OR";
        if(this.usuario_rol != 'A')   caracteristicasConsultas.AgregarFiltro( opereadorLogico, "agendas" , "id" , "=", agenda.agendas_id );  
      });
      caracteristicasConsultas.AgregarOrdenamiento( "agendas.id" , "ASC" );
      this.controladorAgendasForaneas.CargarDesdeDB( true, "A", caracteristicasConsultas ).subscribe( (respuestaAF:RespuestaInterface) => {           // Carge de Agendas

      });   
    });

    caracteristicasConsultas = new EstructuraConsultas();
    caracteristicasConsultas.AgregarColumna( null, "CONCAT(personas.nombres, ' ', personas.apellidos)", "nombreCompleto");
    caracteristicasConsultas.AgregarColumna( "personas", "iduniminuto", "uniminutoId", true);
    caracteristicasConsultas.AgregarColumna( "personas", "registro_fecha", "fechaRegistro");
    caracteristicasConsultas.AgregarColumna( "personas", "actualizacion_fecha", "fechaActualizacion");
    caracteristicasConsultas.AgregarColumna( "agendas", "id", "agenda_id", true);
    caracteristicasConsultas.AgregarColumna( "agendas", "agendas_id", "agendaPadre_id", true);
    caracteristicasConsultas.AgregarColumna( "asignaciones", "tipo", "tipo_asignacion");
    caracteristicasConsultas.AgregarColumna( 
      null, 
      "("+
        "SELECT programas.codigo AS programa " +
        "FROM estudios INNER JOIN ofertas ON ofertas.id = estudios.ofertas_id INNER JOIN programas ON programas.id = ofertas.programas_id " +
        "WHERE estudios.personas_id = seguimientos.personas_id " +
        "AND estudios.id = ( " +
                            "SELECT id FROM estudios " +
                            "WHERE grado_fecha = ( SELECT MAX(grado_fecha) FROM estudios WHERE personas_id = seguimientos.personas_id) " +
                            "AND personas_id = seguimientos.personas_id LIMIT 1 " +
                          ")" +
      ")",
      "programa"
    );
    caracteristicasConsultas.AgregarColumna(
      null,
      "(SELECT MAX(cohortes.descripcion) FROM estudios INNER JOIN cohortes ON cohortes.id = estudios.cohortes_id WHERE estudios.personas_id = seguimientos.personas_id LIMIT 1)",
      "cohorte"
    );
    caracteristicasConsultas.AgregarColumna(
      null,
      "("+
        "SELECT sedes.descripcion AS sede " +
        "FROM estudios INNER JOIN sedes ON estudios.sedes_id = sedes.id " +
        "WHERE estudios.personas_id = seguimientos.personas_id " +
        "AND estudios.id = ( " +
                            "SELECT id FROM estudios " +
                            "WHERE grado_fecha = ( SELECT MAX(grado_fecha) FROM estudios WHERE personas_id = seguimientos.personas_id) " +
                            "AND personas_id = seguimientos.personas_id LIMIT 1 " +
                          ")" +
      ")",
      "sede"
    );
    caracteristicasConsultas.AgregarEnlace( "personas", "personas", "seguimientos");
    caracteristicasConsultas.AgregarEnlace( "agendamientos", "seguimientos", "agendamientos");    
    caracteristicasConsultas.AgregarEnlace( "agendas", "agendas", "agendamientos");
    caracteristicasConsultas.AgregarEnlace( "asignaciones", "agendas", "asignaciones");
    if(this.usuario_rol != 'A')   caracteristicasConsultas.AgregarFiltro(   "",     "asignaciones" ,  "usuarios_id" , "=", String(this.usuario_id) );
    this.controladorSeguimientos.CargarDesdeDB( true, "A", caracteristicasConsultas ).subscribe( (respuestaAG:RespuestaInterface) => {           // Carge de Agenda
      this.controladorSeguimientos.CargarForanea("tiposobservaciones");
    }); 

  }

  ngOnInit() {

  }

  EstoyListo(){
    let validador:boolean = false;

    validador = (
      this.controladorAgendas.EstaListo("cargue")                             &&
      this.controladorAgendas.ObtenerForanea("agendas").EstaListo("cargue")   &&
      this.controladorSeguimientos.EstaListo("cargue")                        &&
      this.controladorSeguimientos.ObtenerForanea("tiposobservaciones").EstaListo("cargue") 
    );

    return validador;
  }

  RecargarControladores(){
    this.controladorAgendas.Recargar().subscribe( (respuestaAP:RespuestaInterface) => { 
      this.controladorAgendasForaneas.Recargar().subscribe( (respuestaAF:RespuestaInterface) => { });
    });
    this.controladorSeguimientos.Recargar().subscribe( (respuestaAG:RespuestaInterface) => { }); 
  }

}
