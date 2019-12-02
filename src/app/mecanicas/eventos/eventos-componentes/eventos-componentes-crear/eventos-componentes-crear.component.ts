import { Component, OnInit, PipeTransform } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

interface PersonaTemporar { 
  Id:number,
  Nombre:string,
  Programa:string,
  Cedula:string,
  Seleccionado: boolean
}

@Component({
  selector: 'app-eventos-componentes-crear',
  templateUrl: './eventos-componentes-crear.component.html',
  styleUrls: ['./eventos-componentes-crear.component.css'],
  providers: [DecimalPipe]
})
export class EventosComponentesCrearComponent implements OnInit {

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

  tipoInformacion : number ;
  personas$: Observable<PersonaTemporar[]>;
  filter = new FormControl('');

  constructor(private modal: NgbModal, private pipe: DecimalPipe) {
    
    this.personas$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.buscar(text, pipe))
    )

   }

  ngOnInit() {
  }

  verModal(agregador, tipoInfo)
  {
    this.tipoInformacion = tipoInfo;
    
    const respuesta  = this.modal.open(agregador, { centered: true , backdropClass: 'light-blue-backdrop' } );

  }


  buscar(text: string , pipe: PipeTransform): PersonaTemporar[] {
    return this.PERSONAS.filter(persona => {
      const term = text.toLowerCase();
      return pipe.transform(persona.Id).includes(term)
          || persona.Nombre.toLowerCase().includes(term)
          || persona.Programa.toLowerCase().includes(term)
          || persona.Cedula.toLowerCase().includes(term);
  
    });
  }
}
