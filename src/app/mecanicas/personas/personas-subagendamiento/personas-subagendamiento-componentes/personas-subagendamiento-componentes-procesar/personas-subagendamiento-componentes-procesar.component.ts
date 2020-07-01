import { Component, OnInit } from '@angular/core';
import { AgendasInterface } from '@interfaces/agendas.interface';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

interface DatosIntercambioInterface{
  [index: string]: any;
}



@Component({
  selector: 'app-personas-subagendamiento-componentes-procesar',
  templateUrl: './personas-subagendamiento-componentes-procesar.component.html',
  styleUrls: ['./personas-subagendamiento-componentes-procesar.component.css']
})
export class PersonasSubagendamientoComponentesProcesarComponent implements OnInit {

  titulos: { [index: string]: string; } = {
    principal: "",
    seccion: ""
  }

  datos:DatosIntercambioInterface;

  modal:NgbModalRef;

  seleccionarTodos: any = {
    nuevasPersonas: false,
    nuevosEstudios: false,
    conCambios: false
  }

  constructor() { }

  ngOnInit() {

    if( this.datos.actual.id == null ){
      this.titulos.principal = "Creación de Distribución";
      this.titulos.seccion = "Nueva Subagenda";
    }
    else{
      this.titulos.principal = "Modificación de Distribución";
      this.titulos.seccion = "Modificación Agenda";
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
