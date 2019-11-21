import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-personas-agendamiento-crear',
  templateUrl: './personas-agendamiento-crear.component.html',
  styleUrls: ['./personas-agendamiento-crear.component.css']
})
export class PersonasAgendamientoCrearComponent implements OnInit {



    seleccion: any  ;
    FechaInicio 
  
  constructor() {
    // this.dateFormatormat(this.now, "dddd, mmmm dS, yyyy");
    this.FechaInicio= formatDate(new Date(), 'yyyy-MM-dd', 'en');
    console.log(this.FechaInicio)
   }
  
   searchObjectPersonas: any ={
    IdPersona:"",
    Nombre:"",
    Programa:"",
    Cedula:"",
    Id:"",
    FechaActualizacion:"",

  };

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
    console.log(this.seleccion)
  }
  ngOnInit() {

  }

}
