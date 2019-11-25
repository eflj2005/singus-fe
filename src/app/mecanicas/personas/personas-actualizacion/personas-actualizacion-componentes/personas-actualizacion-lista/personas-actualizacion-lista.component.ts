import { Component, OnInit, PipeTransform } from '@angular/core';
import { NgbHighlight } from "@ng-bootstrap/ng-bootstrap";
import { FormControl } from '@angular/forms';
import {AmbienteService} from '@servicios/ambiente.service';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

interface Persona {
  IdPersona:number;
  Cohorte:string;
  Id:number;
  Sede:string;
  Nombre:string;
  Cedula:string;
  Programa:string;
  Celular:string;
  CorreoInstitucional:string;
  CorreoPersonal:string;
}

@Component({
  selector: 'personas-actualizacion-lista',
  templateUrl: './personas-actualizacion-lista.component.html',
  styleUrls: ['./personas-actualizacion-lista.component.css'],
  providers: [DecimalPipe]
})

export class PersonasActualizacionListaComponent implements OnInit {
  
  PERSONAS: Persona[] = [
    {
    IdPersona:1,
    Cohorte:"123456",
    Id:123412,
    Sede:"Medellin",
    Nombre:"Juan Carlos Bustos Tovio",
    Cedula:"1007405687",
    Programa:"Ing. Sistemas",
    Celular:"3223542148",
    CorreoInstitucional:"ASDKASJKDHA@Uniminuto.edu.co",
    CorreoPersonal:"ASDKASJKDHA@Uniminuto.edu.co"
  },
  {
    IdPersona:2,
    Cohorte:"1221456",
    Id:623,
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:2,
    Cohorte:"1221456",
    Id:623,
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:2,
    Cohorte:"1221456",
    Id:623,
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:2,
    Cohorte:"1221456",
    Id:623,
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:2,
    Cohorte:"1221456",
    Id:623,
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:2,
    Cohorte:"1221456",
    Id:623,
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:2,
    Cohorte:"1221456",
    Id:623,
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:2,
    Cohorte:"1221456",
    Id:623,
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:2,
    Cohorte:"1221456",
    Id:623,
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:2,
    Cohorte:"1221456",
    Id:623,
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:2,
    Cohorte:"1221456",
    Id:623,
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  }
];

  personas$: Observable<Persona[]>;

  filter2 = new FormControl('');
  
  constructor(
    private AmbienteService : AmbienteService,
    pipe: DecimalPipe
  ) {


    this.personas$ = this.filter2.valueChanges.pipe(
      startWith(''),
      map(text => this.buscar(text, pipe))
    )
   }

  buscar(text: string , pipe: PipeTransform): Persona[] {
    return this.PERSONAS.filter(persona => {
      const term = text.toLowerCase();
      return pipe.transform(persona.IdPersona).includes(term)
          || persona.Cohorte.toLowerCase().includes(term)
          || pipe.transform(persona.Id).includes(term)
          || persona.Sede.toLowerCase().includes(term)
          || persona.Nombre.toLowerCase().includes(term)
          || persona.Cedula.toLowerCase().includes(term)
          || persona.Programa.toLowerCase().includes(term)
          || persona.Celular.toLowerCase().includes(term)
          || persona.CorreoInstitucional.toLowerCase().includes(term)
          || persona.CorreoPersonal.toLowerCase().includes(term);
  
    });
  }
 
  ngOnInit() {
  }
  verPersona(datos){
    
    this.AmbienteService.actualizacionModo.modo = datos.modo
    this.AmbienteService.actualizacionModo.boton = null
  }




  









  
}
