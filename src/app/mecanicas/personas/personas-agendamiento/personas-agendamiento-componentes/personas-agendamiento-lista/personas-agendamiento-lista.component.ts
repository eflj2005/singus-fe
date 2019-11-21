import { Component, OnInit } from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service';

@Component({
  selector: 'app-personas-agendamiento-lista',
  templateUrl: './personas-agendamiento-lista.component.html',
  styleUrls: ['./personas-agendamiento-lista.component.css']
})
export class PersonasAgendamientoListaComponent implements OnInit {

  searchObjectAgendas: any ={
    IdAgenda:"",
    Nombre:"",
    Programa:"",
    FechaCreacion:"",
    FechaFinal:"",
    Responsable:"",

  };

  Agendas: Array<Object> = [{
    IdAgenda:"1",
    Nombre:"Agenda Contaduria Publica",
    Programa:"Contaduria",
    FechaCreacion:"12-12-2019",
    FechaFinal:"15-12-2019",
    Responsable:"Juan Carlos Bustos Tovio",
    Cantidad: "18",
    Estado: "46 %"
  },
  {
    IdAgenda:"2",
    Nombre:"Agenda Contaduria Publica",
    Programa:"Contaduria",
    FechaCreacion:"12-12-2019",
    FechaFinal:"15-12-2019",
    Responsable:"Juan Diego Moreno Marroquin",
    Cantidad: "30",
    Estado: "82 %"
  }
];

  constructor(private AmbienteService : AmbienteService) { }

  ngOnInit() {
  }
  verPersona(datos){
    
    this.AmbienteService.agendaModo.modo = datos.modo
  }
NuevaAgenda(datos){
  this.AmbienteService.agendaModo.modo = datos.modo
}
}
