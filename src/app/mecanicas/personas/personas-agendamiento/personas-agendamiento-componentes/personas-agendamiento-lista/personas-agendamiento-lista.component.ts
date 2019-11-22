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
    Responsable:"Edwin F. Londoño J.",
    Cantidad: "6",
    Estado: "50 %"
  },
  {
    IdAgenda:"2",
    Nombre:"Agenda Contaduria Publica",
    Programa:"Contaduria",
    FechaCreacion:"12-12-2019",
    FechaFinal:"15-12-2019",
    Responsable:"Manuel L. Castaño P.",
    Cantidad: "4",
    Estado: "90 %"
  },
  {
    IdAgenda:"1",
    Nombre:"Agenda Licenciatura",
    Programa:"Licenciatura",
    FechaCreacion:"12-12-2019",
    FechaFinal:"15-12-2019",
    Responsable:"Edwin F. Londoño J.",
    Cantidad: "20",
    Estado: "20 %"
  },
  {
    IdAgenda:"2",
    Nombre:"Agenda Contabilidad",
    Programa:"Contabilidad",
    FechaCreacion:"12-12-2019",
    FechaFinal:"15-12-2019",
    Responsable:"Manuel L. Castaño P.",
    Cantidad: "30",
    Estado: "42 %"
  }
];

  constructor(private AmbienteService : AmbienteService) { }

  ngOnInit() {
  }
  verPersona(datos){
    
    this.AmbienteService.agendaModo.modo = datos.modo
  }
  EditarAgenda(datos){
    this.AmbienteService.agendaModo.modo = datos.modo
  }
NuevaAgenda(datos){
  this.AmbienteService.agendaModo.modo = datos.modo
}
}
