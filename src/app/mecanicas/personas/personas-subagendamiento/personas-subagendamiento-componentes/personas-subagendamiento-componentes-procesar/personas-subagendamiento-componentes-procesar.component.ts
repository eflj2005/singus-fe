import { Component, OnInit } from '@angular/core';
import { AgendasInterface } from '@interfaces/agendas.interface';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-personas-subagendamiento-componentes-procesar',
  templateUrl: './personas-subagendamiento-componentes-procesar.component.html',
  styleUrls: ['./personas-subagendamiento-componentes-procesar.component.css']
})
export class PersonasSubagendamientoComponentesProcesarComponent implements OnInit {

  titulo:string;
  datos:AgendasInterface;

  modal:NgbModalRef;

  seleccionarTodos: any = {
    nuevasPersonas: false,
    nuevosEstudios: false,
    conCambios: false
  }

  constructor() { }

  ngOnInit() {

    if( this.datos.id == null )   this.titulo = "Creación de Distribución";
    else                          this.titulo = "Modificación de Distribución";

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
