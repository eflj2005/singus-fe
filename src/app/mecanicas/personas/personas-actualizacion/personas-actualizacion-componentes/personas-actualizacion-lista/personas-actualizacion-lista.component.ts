import { Component, OnInit, PipeTransform } from '@angular/core';
import { NgbHighlight } from "@ng-bootstrap/ng-bootstrap";
import { FormControl } from '@angular/forms';
import {AmbienteService} from '@servicios/ambiente.service';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { PersonasInterface } from '@interfaces/personas.interface';
import { PersonasController } from '@controladores/personas.controller';
import { HttpClient } from '@angular/common/http';
import { RespuestaInterface } from '@interfaces/respuesta.interface';

import { EstructuraConsultas } from '@generales/estructura-consultas';

interface ListaPersonasInterface extends PersonasInterface {
  nombreCompleto:string;
  cohorte:string;
  sede:string;
  programa:string;
  celular:string;
  correoInstitucional:string;
  correoPersonal:string;
}

@Component({
  selector: 'personas-actualizacion-lista',
  templateUrl: './personas-actualizacion-lista.component.html',
  styleUrls: ['./personas-actualizacion-lista.component.css'],
  providers: [DecimalPipe]
})

export class PersonasActualizacionListaComponent implements OnInit {
  
  registros: ListaPersonasInterface[];
  
//   PERSONAS: ListaPersonasInterface[] = [
//     {
//     id:1,
//     nacimiento_fecha: "19830101",
//     iduniminuto:123412,
//     nombres:"Juan Carlos",
//     apellidos: "Bustos Tovio",
//     genero: "M",
//     tiposdocoumentos_id: 1,
//     documento:1007405687,
//     municipios_id: 73001,
//     actualizacion_fecha: "20190101",

//     nombreCompleto: "Juan Carlos Bustos Tovio",
//     cohorte:"123456",
//     sede:"Medellin",
//     programa:"Ing. Sistemas",
//     celular:"3223542148",
//     correoInstitucional:"ASDKASJKDHA@Uniminuto.edu.co",
//     correoPersonal:"ASDKASJKDHA@Uniminuto.edu.co"
//   },
//   {
//     id:2,
//     nacimiento_fecha: "19830101",
//     iduniminuto:623,
//     nombres:"Ppeptiyo",
//     apellidos:"flors xdsa",
//     genero: "M",
//     tiposdocoumentos_id: 1,
//     documento:42321,
//     municipios_id: 73001,
//     actualizacion_fecha: "20190101",

//     nombreCompleto: "Ppeptiyo flors xdsa",
//     cohorte:"1221456",
//     sede:"Bogta",
//     programa:"Ing. Sistemas",
//     celular:"76543451",
//     correoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
//     correoPersonal:"ddaxcwedd@Uniminuto.edu.co"
//   }
// ];

  personas$: Observable<ListaPersonasInterface[]>;

  filter2 = new FormControl('');
  
  controladorPersonas: PersonasController;

  constructor(
    private servicioAmbiente : AmbienteService,
    private llamadoHttp : HttpClient,
    private pipe: DecimalPipe
  ) {

    this.controladorPersonas = new PersonasController(llamadoHttp,servicioAmbiente);


    // let caracteristicas = {
    //   columnas: [
    //     { tabla: "" , columna: "", alias: "" },
    //     { tabla: "" , columna: "", alias: "" }
    //   ],
    //   enlaces: [
    //     { tablaE: "" , tablaPk: "", tablaFk: "" },
    //     { tablaE: "" , tablaPk: "", tablaFk: "" }
    //   ],
    //   filtros: [
    //     { tabla: "" , campo: "", condicion: "", valor: "" },
    //     { tabla: "" , campo: "", condicion: "", valor: "" },        
    //   ],
    //   ordenamientos: [
    //     { columna: "" , orden: "" },
    //     { columna: "" , orden: "" },   
    //   ]
    // }

    // let caracteristicas = {
    //   columnas: null,
    //   enlaces: null,
    //   filtros: null,
    //   ordenamientos: null
    // };

    // let caracteristicas = {
    //   columnas: null,
    //   enlaces: null,
    //   filtros: [
    //     { tabla: null , campo: "id", condicion: "=", valor: "2" }
    //   ],
    //   ordenamientos: null
    // };

    // let caracteristicas = {
    //   columnas: null,
    //   enlaces: null,
    //   filtros: null,
    //   ordenamientos: [
    //     { columna: "id" , orden: "DESC" },
    //   ]
    // };

    let caracteristicas = {
      columnas: [
        { 
          tabla: null ,
          columna: "CONCAT( personas.nombres , ' ' , personas.apellidos )",
          alias: "nombreCompleto" 
        },
        { tabla: "cohortes" ,   columna: "descripcion" ,  alias: "cohorte"  },
        { tabla: "sedes" ,      columna: "descripcion" ,  alias: "sede"     }, 
        { tabla: "programas" ,  columna: "descripcion" ,  alias: "programa" }, 
        { 
          tabla: null ,
          columna: "( SELECT numero FROM telefonos WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM telefonos WHERE personas_id = personas.id AND tipo = 'C' ) AND tipo = 'C' LIMIT 1 )" ,
          alias: "celular" 
        },
        { 
          tabla: null ,
          columna: "( SELECT correo FROM correos WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM correos WHERE personas_id = personas.id AND tipo = 'I' ) AND tipo = 'I' LIMIT 1 )" ,
          alias: "correoInstitucional" 
        },{ 
          tabla: null ,
          columna: "( SELECT correo FROM correos WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM correos WHERE personas_id = personas.id AND tipo = 'P' ) AND tipo = 'P' LIMIT 1 )" ,
          alias: "correoPersonal" 
        }
      ],
      enlaces: [
        { tablaE: "estudios" ,  tablaPk: "personas",  tablaFk: "estudios" },
        { tablaE: "cohortes" ,  tablaPk: "cohortes",  tablaFk: "estudios" },
        { tablaE: "sedes" ,     tablaPk: "sedes",     tablaFk: "estudios" },
        { tablaE: "programas" , tablaPk: "programas", tablaFk: "estudios" },                
      ],
      filtros: [
        { tabla: "sedes" , campo: "instituciones_id", condicion: "=", valor: "1" }
      ],
      ordenamientos: [
        { columna: "cohorte" , orden: "DESC" },
        { columna: "sede" , orden: "ASC" },
        { columna: "apellidos" , orden: "ASC" },
      ]
    };

    console.log("Original");
    console.log(caracteristicas);

    let caracteristicas2 = new EstructuraConsultas();
    caracteristicas2.AgregarColumna( null ,         "CONCAT( personas.nombres , ' ' , personas.apellidos )" , "nombreCompleto" );
    caracteristicas2.AgregarColumna( "cohortes" ,   "descripcion" ,                                           "cohorte" );
    caracteristicas2.AgregarColumna( "sedes" ,      "descripcion" ,                                           "sede" );
    caracteristicas2.AgregarColumna( "programas" ,  "descripcion" ,                                           "programa ");
    caracteristicas2.AgregarColumna( null ,         "( SELECT numero FROM telefonos WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM telefonos WHERE personas_id = personas.id AND tipo = 'C' ) AND tipo = 'C' LIMIT 1 )" , "celular" );
    caracteristicas2.AgregarColumna( null ,         "( SELECT correo FROM correos WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM correos WHERE personas_id = personas.id AND tipo = 'I' ) AND tipo = 'I' LIMIT 1 )" ,     "correoInstitucional" );
    caracteristicas2.AgregarColumna( null ,         "( SELECT correo FROM correos WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM correos WHERE personas_id = personas.id AND tipo = 'P' ) AND tipo = 'P' LIMIT 1 )" ,     "correoPersonal" );
    
    caracteristicas.AgregarEnlace( "estudios" ,  "personas" ,  "estudios" );
    caracteristicas.AgregarEnlace( "cohortes" ,  "cohortes" ,  "estudios" );
    caracteristicas.AgregarEnlace( "sedes" ,     "sedes" ,     "estudios" );
    caracteristicas.AgregarEnlace( "programas" , "programas" , "estudios" );  

    caracteristicas.AgregarFiltro( "personas" , "id" , "=", "1" );
    caracteristicas.AgregarFiltro( "sedes" , "instituciones_id" , "=", "1" );
    
    caracteristicas2.AgregarOrdenamiento( "cohorte" , "DESC" );
    caracteristicas2.AgregarOrdenamiento( "sede" , "ASC" );
    caracteristicas2.AgregarOrdenamiento( "apellidos" , "ASC" );    

    console.log("nuevo");
    console.log(caracteristicas2);





    this.controladorPersonas.CargarDesdeDB(true, "A", caracteristicas2 ).subscribe(
      (respuesta: RespuestaInterface) =>{
        switch (respuesta.codigo){
          case 200:
            this.registros =this.controladorPersonas.todos;


            this.personas$ = this.filter2.valueChanges.pipe(
              startWith(''),
              map(text => this.Buscar(text, pipe))
            )

          break;
          default:
            alert("Error: "+respuesta.mensaje);
          break;
        }
      } 
    );

   }

  Buscar(text: string , pipe: PipeTransform): ListaPersonasInterface[] {
    return this.registros.filter(persona => {
      const term = text.toLowerCase();
      return pipe.transform(persona.id).includes(term)
          || persona.cohorte.toLowerCase().includes(term)
          || pipe.transform(persona.iduniminuto).includes(term)
          || persona.sede.toLowerCase().includes(term)
          || persona.nombres.toLowerCase().includes(term)
          || pipe.transform(persona.documento).includes(term)
          || persona.programa.toLowerCase().includes(term)
          || persona.celular.toLowerCase().includes(term)
          || persona.correoInstitucional.toLowerCase().includes(term)
          || persona.correoPersonal.toLowerCase().includes(term);
  
    });
  }
 
  ngOnInit() {
  }
  
  VerPersona( datos : any ){
    
    this.servicioAmbiente.controlMecanicasPersonas.modo = datos.modo;
    this.servicioAmbiente.controlMecanicasPersonas.datos = { id: datos.id };
  
  }
  
}
