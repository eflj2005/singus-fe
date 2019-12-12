import { Component,  OnInit, PipeTransform} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import {AmbienteService} from '@servicios/ambiente.service';

interface Evento {
  id:number;
  nombre: string;
  fechaEvento: string;
  sede: string;
  tipo: string; 
}

interface PersonaTemporar { 
  Id:number,
  Nombre:string,
  Programa:string,
  Cedula:string,
  Seleccionado: boolean
}



@Component({
  selector: 'app-eventos-componentes-lista',
  templateUrl: './eventos-componentes-lista.component.html',
  styleUrls: ['./eventos-componentes-lista.component.css'],
  providers: [DecimalPipe]
})
export class EventosComponentesListaComponent implements OnInit {

  EVENTOS: Evento[] =[
    {
      id:1,
      nombre:"reunion graduados 2019",
      fechaEvento:"5-02-2019",
      sede: "soacha",
      tipo:"reunion"
    },
    {
      id:2,
      nombre:"reunion graduados 2019",
      fechaEvento:"5-02-2019",
      sede: "soacha",
      tipo:"reunion"
    },
    {
      id:3,
      nombre:"reunion graduados 2019",
      fechaEvento:"5-02-2019",
      sede: "soacha",
      tipo:"reunion"
    },
    {
      id:4,
      nombre:"reunion graduados 2019",
      fechaEvento:"5-02-2019",
      sede: "soacha",
      tipo:"reunion"
    },
    {
      id:5,
      nombre:"reunion graduados 2019",
      fechaEvento:"5-02-2019",
      sede: "soacha",
      tipo:"reunion"
    },
    {
      id:6,
      nombre:"reunion graduados 2019",
      fechaEvento:"5-02-2019",
      sede: "soacha",
      tipo:"reunion"
    }

  ];

    PERSONAS: PersonaTemporar[] = [{
      Id:1,
      Nombre:"Cesar Duvan Martinez",
      Programa:"Ingenieria de sistemas",
      Cedula:"1007405687",
      Seleccionado: false
    },
    {
      Id:2,
      Nombre:"Diego Fernando Osorio ",
      Programa:"Ingenieria de sistemas",
      Cedula:"1011234187",
      Seleccionado: false
    },
    {
      Id:2,
      Nombre:"Diego Fernando Osorio ",
      Programa:"Ingenieria de sistemas",
      Cedula:"1011234187",
      Seleccionado: false
    }
  ];

  
  personas$: Observable<PersonaTemporar[]>;
  filterPersonas = new FormControl('');

  
  eventos$: Observable<Evento[]>;

  filter = new FormControl('');

  constructor(private modal: NgbModal ,private pipe: DecimalPipe, private AmbienteService : AmbienteService,) {
    
    this.eventos$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.buscar(text, pipe))
    )

    this.personas$ = this.filterPersonas.valueChanges.pipe(
      startWith(''),
      map(text => this.buscarPersonas(text, pipe))
    )
   }

  buscar(text: string , pipe: PipeTransform): Evento[] {
    return this.EVENTOS.filter(evento => {
      const term = text.toLowerCase();
      return pipe.transform(evento.id).includes(term)
          || evento.nombre.toLowerCase().includes(term)
          || evento.fechaEvento.toLowerCase().includes(term)
          || evento.sede.toLowerCase().includes(term)
          || evento.tipo.toLowerCase().includes(term);
    });
  }

  buscarPersonas(text: string , pipe: PipeTransform): PersonaTemporar[] {
    return this.PERSONAS.filter(persona => {
      const term = text.toLowerCase();
      return pipe.transform(persona.Id).includes(term)
          || persona.Nombre.toLowerCase().includes(term)
          || persona.Programa.toLowerCase().includes(term)
          || persona.Cedula.toLowerCase().includes(term);
  
    });
  }

  
  verModal(agregador)
  {
    const respuesta  = this.modal.open(agregador, { centered: true , backdropClass: 'light-blue-backdrop', size: 'xl' } );
  }

  ngOnInit() {
  }

  crear(datos){
    this.AmbienteService.eventosModo.modo = datos;

  }

}
