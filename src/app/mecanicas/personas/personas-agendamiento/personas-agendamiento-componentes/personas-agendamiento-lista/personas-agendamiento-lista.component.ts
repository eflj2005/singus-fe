import { Component, OnInit , PipeTransform} from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service';
import { FormControl } from '@angular/forms';
import { NgbHighlight } from "@ng-bootstrap/ng-bootstrap";
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

interface Agenda {
  IdAgenda:number;
  Nombre:string; 
  Programa:string;
  FechaCreacion:string;
  FechaFinal:string;
  Responsable:string;
  Cantidad: number;
  Estado: string;
}

@Component({
  selector: 'app-personas-agendamiento-lista',
  templateUrl: './personas-agendamiento-lista.component.html',
  styleUrls: ['./personas-agendamiento-lista.component.css'],
  providers: [DecimalPipe]
})
export class PersonasAgendamientoListaComponent implements OnInit {


  AGENDAS: Agenda[] = [
  {
    IdAgenda:1,
    Nombre:"Agenda Contaduria Publica",
    Programa:"Contaduria",
    FechaCreacion:"12-12-2019",
    FechaFinal:"15-12-2019",
    Responsable:"Edwin F. Londoño J.",
    Cantidad: 6,
    Estado: "50 %"
  },
  {
    IdAgenda:2,
    Nombre:"Agenda Contaduria Publica",
    Programa:"Contaduria",
    FechaCreacion:"12-12-2019",
    FechaFinal:"15-12-2019",
    Responsable:"Manuel L. Castaño P.",
    Cantidad: 4,
    Estado: "90 %"
  },
  {
    IdAgenda:1,
    Nombre:"Agenda Licenciatura",
    Programa:"Licenciatura",
    FechaCreacion:"12-12-2019",
    FechaFinal:"15-12-2019",
    Responsable:"Edwin F. Londoño J.",
    Cantidad: 20,
    Estado: "20 %"
  },
  {
    IdAgenda:2,
    Nombre:"Agenda Contabilidad",
    Programa:"Contabilidad",
    FechaCreacion:"12-12-2019",
    FechaFinal:"15-12-2019",
    Responsable:"Manuel L. Castaño P.",
    Cantidad: 30,
    Estado: "42 %"
  }
];

  agendas$: Observable<Agenda[]>;
  filter = new FormControl('');

  constructor(private AmbienteService : AmbienteService , private pipe: DecimalPipe) { 

    this.agendas$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.buscar(text, pipe))
    )
  }

  buscar(text: string , pipe: PipeTransform): Agenda[] {
    return this.AGENDAS.filter(agenda => {
      const term = text.toLowerCase();
      return pipe.transform(agenda.IdAgenda).includes(term)
          || agenda.Nombre.toLowerCase().includes(term)
          || agenda.Programa.toLowerCase().includes(term)
          || agenda.FechaCreacion.toLowerCase().includes(term)
          || agenda.FechaFinal.toLowerCase().includes(term)
          || agenda.Responsable.toLowerCase().includes(term)
          || pipe.transform(agenda.Cantidad).includes(term)
          || agenda.Estado.toLowerCase().includes(term);
  
    });
  }


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
