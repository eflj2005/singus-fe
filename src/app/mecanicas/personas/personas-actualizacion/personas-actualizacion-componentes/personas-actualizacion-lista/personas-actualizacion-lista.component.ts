import { Component, OnInit, PipeTransform } from '@angular/core';
import { NgbHighlight } from "@ng-bootstrap/ng-bootstrap";
import { FormControl } from '@angular/forms';
import {AmbienteService} from '@servicios/ambiente.service';


import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';


interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

function search(text: string, pipe: PipeTransform): Country[] {
  return COUNTRIES.filter(country => {
    const term = text.toLowerCase();
    return country.name.toLowerCase().includes(term)
        || pipe.transform(country.area).includes(term)
        || pipe.transform(country.population).includes(term);
  });
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];


@Component({
  selector: 'personas-actualizacion-lista',
  templateUrl: './personas-actualizacion-lista.component.html',
  styleUrls: ['./personas-actualizacion-lista.component.css'],
  providers: [DecimalPipe]
})
export class PersonasActualizacionListaComponent implements OnInit {
  
  
  searchObjectPersonas: any ={
    IdPersona:"",
    Cohorte:"",
    Id:"",
    Sede:"",
    Nombre:"",
    Cedula:"",
    Programa:"",
    Celular:"",
    CorreoInstitucional:"",
    CorreoPersonal:""
  };

  personas: Array<Object> = [{
    IdPersona:"1",
    Cohorte:"123456",
    Id:"123412",
    Sede:"Medellin",
    Nombre:"Juan Carlos Bustos Tovio",
    Cedula:"1007405687",
    Programa:"Ing. Sistemas",
    Celular:"3223542148",
    CorreoInstitucional:"ASDKASJKDHA@Uniminuto.edu.co",
    CorreoPersonal:"ASDKASJKDHA@Uniminuto.edu.co"
  },
  {
    IdPersona:"2",
    Cohorte:"1221456",
    Id:"5623",
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:"2",
    Cohorte:"1221456",
    Id:"5623",
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:"2",
    Cohorte:"1221456",
    Id:"5623",
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:"2",
    Cohorte:"1221456",
    Id:"5623",
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:"2",
    Cohorte:"1221456",
    Id:"5623",
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:"2",
    Cohorte:"1221456",
    Id:"5623",
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:"2",
    Cohorte:"1221456",
    Id:"5623",
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:"2",
    Cohorte:"1221456",
    Id:"5623",
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:"2",
    Cohorte:"1221456",
    Id:"5623",
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:"2",
    Cohorte:"1221456",
    Id:"5623",
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:"2",
    Cohorte:"1221456",
    Id:"5623",
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:"2",
    Cohorte:"1221456",
    Id:"5623",
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:"2",
    Cohorte:"1221456",
    Id:"5623",
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:"2",
    Cohorte:"1221456",
    Id:"5623",
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:"2",
    Cohorte:"1221456",
    Id:"5623",
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:"2",
    Cohorte:"1221456",
    Id:"5623",
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:"2",
    Cohorte:"1221456",
    Id:"5623",
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:"2",
    Cohorte:"1221456",
    Id:"5623",
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:"2",
    Cohorte:"1221456",
    Id:"5623",
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:"2",
    Cohorte:"1221456",
    Id:"5623",
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:"2",
    Cohorte:"1221456",
    Id:"5623",
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  },
  {
    IdPersona:"2",
    Cohorte:"1221456",
    Id:"5623",
    Sede:"Bogta",
    Nombre:"Ppeptiyo flors xdsa",
    Cedula:"42321",
    Programa:"Ing. Sistemas",
    Celular:"76543451",
    CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
    CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co"
  }
];

  countries$: Observable<Country[]>;
  filter = new FormControl('');
  
  constructor(
    private AmbienteService : AmbienteService,
    pipe: DecimalPipe
  ) {
    this.countries$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(text, pipe))
    )
   }
 
  ngOnInit() {
  }
  verPersona(datos){
    
    this.AmbienteService.actualizacionModo.modo = datos.modo
    this.AmbienteService.actualizacionModo.boton = null
  }




  









  
}
