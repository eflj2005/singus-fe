import { Component,  OnInit, PipeTransform} from '@angular/core';
import { DecimalPipe } from '@angular/common';
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

  
  eventos$: Observable<Evento[]>;

  filter = new FormControl('');

  constructor( private pipe: DecimalPipe, private AmbienteService : AmbienteService,) {
    this.eventos$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.buscar(text, pipe))
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

  ngOnInit() {
  }

  crear(datos){

    this.AmbienteService.eventosModo.modo = datos;

  }

}
