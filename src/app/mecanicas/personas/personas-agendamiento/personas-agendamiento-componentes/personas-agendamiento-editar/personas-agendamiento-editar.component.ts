import { Component, OnInit } from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service';
import {formatDate} from '@angular/common';

interface PersonaTemporarl { 
  Id:number,
  Nombre:string,
  Programa:string,
  Cedula:number,
  IdPerona:number,
  FechaActualizacion:string,
Seleccionado: boolean}


@Component({
  selector: 'app-personas-agendamiento-editar',
  templateUrl: './personas-agendamiento-editar.component.html',
  styleUrls: ['./personas-agendamiento-editar.component.css']
})
export class PersonasAgendamientoEditarComponent implements OnInit {

  mostarBoton: boolean ;
    seleccion: boolean  ;
    FechaInicio : any ;
  responsable = 1;
  FechaFinal : any;
  Nombre: string = "Agendamiento contaduria";
  constructor(private datosAmbiente : AmbienteService) {
    // this.dateFormatormat(this.now, "dddd, mmmm dS, yyyy");
    this.FechaInicio= formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.FechaFinal= formatDate(new Date(), 'yyyy-MM-dd', 'en');
 

    if(this.PersonasSeleccionadas.length != 0  ){
      this.mostarBoton = true;
    }
    else {
      this.mostarBoton = false;
    }
   }
  
   ngOnInit() {
      
  }
  
PersonasSeleccionadas:Array<PersonaTemporarl> = [];

  Personas: Array<PersonaTemporarl> = [{
    Id:1,
    Nombre:"Juan Camilo Caviedes Toro ",
    Programa:"Ingenieria de sistemas",
    Cedula:1007405687,
    IdPerona:12345678,
    FechaActualizacion:"12-12-2019",
    Seleccionado: false
  },
  {
    Id:2,
    Nombre:"Fernando Suarez Martinez ",
    Programa:"Ingenieria de sistemas",
    Cedula:1011234187,
    IdPerona:12345678,
    FechaActualizacion:"12-11-2019",
    Seleccionado: false
  }
];

 

  
  // Mostar(){
  //   console.log(this.Personas);
  // }
  quitarPersonas(){
    this.PersonasSeleccionadas.forEach((elemento,indice) => {
      if(elemento.Seleccionado){
        elemento.Seleccionado =false;
        this.Personas.push( Object.assign({}, elemento));
       
        this.PersonasSeleccionadas.splice(indice,1);
        
      }
    });
  }
  agregarPersonas(){
    
    this.Personas.forEach((elemento,indice) => {

     if(elemento.Seleccionado){
       elemento.Seleccionado =false;
       this.PersonasSeleccionadas.push( Object.assign({}, elemento));
      
       this.Personas.splice(indice,1);
       
     }
   });
 }
 Cancelar(){
   
  this.datosAmbiente.agendaModo.modo = 1;
  
}
}
