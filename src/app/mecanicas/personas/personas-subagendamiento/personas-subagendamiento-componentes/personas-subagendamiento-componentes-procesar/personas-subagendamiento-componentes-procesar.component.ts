import { Component, OnInit, Input } from '@angular/core';
import { AgendasInterface } from '@interfaces/agendas.interface';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AgendasController } from '@controladores/agendas.controller';
import { SeguimientosController } from '@controladores/seguimientos.controller';

interface DatosIntercambioInterface{
  [index: string]: any;
}

interface AgendaCompletoInterface extends AgendasInterface{
  responsable_id: number;
}

interface DatosAgendas{
  padre: AgendasController,
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
  titulos: { [index: string]: string; } = { principal: "", seccion: "" }

  datos: DatosAgendas ={  padre: null,  actual: null, agendamientos: null }

  datosAgendaPadre:AgendasController;
  datosAgendaActual:AgendaCompletoInterface;
  datosAgendamientos:AgendasInterface[];

  seleccionarTodos: any = {
    nuevasPersonas: false,
    nuevosEstudios: false,
    conCambios: false
  }

  constructor() { }

  ngOnInit() {

    switch(this.modoProceso){
      case "subagendar":
        this.titulos.principal = "Creación de Distribución";
        this.titulos.seccion = "Nueva Subagenda";

        this.controladorAgendas.Encontrar("id",this.idAgendaProcesada);
        this.datos.padre = this.controladorAgendas.actual;
        this.datos.actual = { id: null, apertura_fecha: "", cierre_fecha: "", nivel: null, responsable_id: null };
        this.datos.agendamientos = [];

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

}
