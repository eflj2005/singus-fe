import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-personas-agendamiento-crear',
  templateUrl: './personas-agendamiento-crear.component.html',
  styleUrls: ['./personas-agendamiento-crear.component.css']
})
export class PersonasAgendamientoCrearComponent implements OnInit {


  mostarBoton: boolean ;
    seleccion: boolean  ;
    FechaInicio 
  
  constructor() {
    // this.dateFormatormat(this.now, "dddd, mmmm dS, yyyy");
    this.FechaInicio= formatDate(new Date(), 'yyyy-MM-dd', 'en');
    console.log(this.PersonasSeleccionadas)

    if(this.PersonasSeleccionadas.length != 0  ){
      this.mostarBoton = true;
    }
    else {
      this.mostarBoton = false;
    }
   }
  
   ngOnInit() {
      this.Seleccion();
  }
   searchObjectPersonas: any ={
    IdPersona:"",
    Nombre:"",
    Programa:"",
    Cedula:"",
    Id:"",
    FechaActualizacion:"",

  };
  searchObjectPersonasSeleccionadas: any ={
    IdPersona:"",
    Nombre:"",
    Programa:"",
    Cedula:"",
    Id:"",
    FechaActualizacion:"",

  };
PersonasSeleccionadas:Array<Object> = [];

  Personas: Array<Object> = [{
    IdPersona:"1",
    Nombre:"Juan Carlos Bustos Tovio ",
    Programa:"Ingenieria de sistemas",
    Cedula:"1007405687",
    Id:"12345678",
    FechaActualizacion:"12-12-2019",
  },
  {
    IdPersona:"1",
    Nombre:"Juan Diego Moreno Marroquin ",
    Programa:"Ingenieria de sistemas",
    Cedula:"1007405687",
    Id:"12345678",
    FechaActualizacion:"12-12-2019",
  }
];
Seleccion(){
  let i
  for(i = 0; i < this.Personas.length; i++){
    this.Personas[i]["Seleccionado"] = false ;
  }
 
}
  
  // Mostar(){
  //   console.log(this.Personas);
  // }
  quitarPersonas(){

  }
  agregarPersonas(){
    
    let i
    for(i = 0; i < this.Personas.length; i++){
      if (this.Personas[i]["Seleccionado"] == true ) {
        
        this.PersonasSeleccionadas[i] = this.Personas[i];
        this.mostarBoton = true;

      }
    }
 
  }
 
}

