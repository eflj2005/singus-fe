import { Component, OnInit , PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

interface Persona {
  IdPersona:number;
  Id:number;
  Nombre:string;
  Cedula:string;
  Programa:string;
  FechaNacimiento: string;
  FechaUltimaActualizacion: string;
  
}



@Component({
  selector: 'app-reportes-alertas-principal',
  templateUrl: './reportes-alertas-principal.component.html',
  styleUrls: ['./reportes-alertas-principal.component.css'],
  providers: [DecimalPipe]
})
export class ReportesAlertasPrincipalComponent implements OnInit {

  personas$: Observable<Persona[]>;
  filter = new FormControl('');

  Personas: Array<Persona> = [ 
  {
    Id:1,
    Nombre:"Juan Camilo Caviedes Toro ",
    Programa:"Contaduria",
    Cedula:"1007405687",
    IdPersona:12345678,
    FechaUltimaActualizacion:"12-12-2019",
    FechaNacimiento: "14-5-2000"
  },
  {
    Id:2,
    Nombre:"Fernando Suarez Martinez ",
    Programa:"Contaduria",
    Cedula:"1007405687",
    IdPersona:12345678,
    FechaUltimaActualizacion:"12-12-2019",
    FechaNacimiento: "14-5-2000"
  },
  {
    Id:1,
    Nombre:"Ernesto Gonzales Cabrera ",
    Programa:"Contaduria",
    Cedula:"1007405687",
    IdPersona:12345678,
    FechaUltimaActualizacion:"12-12-2019",
    FechaNacimiento: "14-5-2000"
  },
  {
    Id:2,
    Nombre:"Angie Jimena Cabezas ",
    Programa:"Contaduria",
    Cedula:"1007405687",
    IdPersona:12345678,
    FechaUltimaActualizacion:"12-12-2019",
    FechaNacimiento: "14-5-2000"
  },
  {
    Id:1,
    Nombre:"Luis Felipe Perez ",
    Programa:"Contaduria",
    Cedula:"1007405687",
    IdPersona:12345678,
    FechaUltimaActualizacion:"12-12-2019",
    FechaNacimiento: "14-5-2000"
  },
  {
    Id:2,
    Nombre:"Luisa Mara Sanchez Ortiz ",
    Programa:"Contaduria",
    Cedula:"1007405687",
    IdPersona:12345678,
    FechaUltimaActualizacion:"12-12-2019",
    FechaNacimiento: "14-5-2000"
  },
  {
    Id:1,
    Nombre:"Cesar Duvan Martinez",
    Programa:"Ingenieria de sistemas",
    Cedula:"1007405687",
    IdPersona:12345678,
    FechaUltimaActualizacion:"12-12-2019",
    FechaNacimiento: "14-5-2000"
  },
  {
    Id:2,
    Nombre:"Diego Fernando Osorio ",
    Programa:"Ingenieria de sistemas",
    Cedula:"1007405687",
    IdPersona:12345678,
    FechaUltimaActualizacion:"12-12-2019",
    FechaNacimiento: "14-5-2000"
  }
];

  constructor(private pipe: DecimalPipe) { 
    this.AplicarFiltros();
  }

  ngOnInit() {
  }



  
  AplicarFiltros(){
    this.personas$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.buscar(text, this.pipe ))
    )
  }

  buscar(text: string , pipe: PipeTransform ): Persona[] {

      return this.Personas.filter(persona => {
        const term = text.toLowerCase();
        return pipe.transform(persona.IdPersona).includes(term)
            || pipe.transform(persona.Id).includes(term)
            || persona.Nombre.toLowerCase().includes(term)
            || persona.Programa.toLowerCase().includes(term)
            || pipe.transform(persona.Cedula).includes(term)
            || persona.FechaUltimaActualizacion.toLowerCase().includes(term)
            || persona.FechaNacimiento.toLowerCase().includes(term);
      });
      
    }
}
