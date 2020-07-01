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
  idAgendaProcesada: number;
  modoProceso: String;
  modal:NgbModalRef;

  //Otros atributos

  controladorUsaurios: UsuariosController;

  titulos: { [index: string]: string; } = { principal: "", seccion: "" }
  datos: DatosAgendas ={  padre: null,  actual: null, agendamientos: null }

  listaSegimientosDisponibles:any[];
  listaSegimientosAsignados:any[]];

  seleccionarTodos: any = {
    seguimientosDisponibles: false,
    seguimientosAsignados: false,
  }

  constructor(
    private servicioAmbiente : AmbienteService,
    private llamadoHttp : HttpClient,
    private autenticador: AutenticacionService  
  ) {

    this.controladorUsaurios = new UsuariosController(llamadoHttp,servicioAmbiente);

    this.controladorUsaurios.CargarDesdeDB().subscribe( (respuesta:RespuestaInterface) => {           // Carge de usuarios
    });
   }

  ngOnInit() {

    switch(this.modoProceso){
      case "subagendar":
        this.titulos.principal = "Creación de Distribución";
        this.titulos.seccion = "Nueva Subagenda";

        this.controladorAgendas.Encontrar("id",this.idAgendaProcesada);
        this.datos.padre = this.controladorAgendas.actual;
        this.datos.actual = { id: null, apertura_fecha: "", cierre_fecha: "", nivel: null, responsable_id: null };
        this.datos.agendamientos = [];

        console.log(this.controladorSeguimientos.todos);

        this.listaSegimientosDisponibles = []
        this.listaSegimientosAsignados = [];

        
        this.FiltrarDatos( this.controladorSeguimientos.todos , 'agenda_id' , this.datos.padre.id ).forEach( (listaSegimientosDisponibles: any ) => {
          this.listaSegimientosDisponibles.push(listaSegimientosDisponibles);
        });


      break;
      case "modificar":
        this.titulos.principal = "Modificación de Distribución";
        this.titulos.seccion = "Modificación Agenda";
      break;
    }

  }
  
  SeleccionarTodos(control: string){
    switch(control){
      case 'nuevasPersonas':
        // if(this.seleccionarTodos.nuevasPersonas){
        //   for (var posicion in this.arregloNuevasPersonas) {  
        //     this.arregloNuevasPersonas[posicion].seleccionado = false;
        //   }  
        //   this.seleccionarTodos.nuevasPersonas = false;
        // }
        // else{
        //   for (var posicion in this.arregloNuevasPersonas) {  
        //     this.arregloNuevasPersonas[posicion].seleccionado = true;
        //   }  
        //   this.seleccionarTodos.nuevasPersonas = true;
        // }
      break;
      case 'nuevosEstudios':
        // if(this.seleccionarTodos.nuevosEstudios){
        //   for (var posicion in this.arregloNuevosEstudios) {  
        //     this.arregloNuevosEstudios[posicion].seleccionado = false;
        //   }  
        //   this.seleccionarTodos.nuevosEstudios = false;
        // }
        // else{
        //   for (var posicion in this.arregloNuevosEstudios) {  
        //     this.arregloNuevosEstudios[posicion].seleccionado = true;
        //   }  
        //   this.seleccionarTodos.nuevosEstudios = true;
        // }
      break;      
    }
  }

  Cancelar(){
    this.modal.dismiss('CANCELAR');
  }

  FiltrarDatos( arreglo : any , campo : string , valor : any ){
    let resultados = arreglo.filter( (elemento: { [x: string]: any; }) => elemento[campo] == valor );
    return resultados;
  }

}
