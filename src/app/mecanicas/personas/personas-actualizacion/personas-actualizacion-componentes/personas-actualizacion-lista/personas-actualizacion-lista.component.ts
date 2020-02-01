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

  
    let caracteristicas = new EstructuraConsultas();

    caracteristicas.AgregarColumna( null ,         "CONCAT( personas.nombres , ' ' , personas.apellidos )" , "nombreCompleto" );
    caracteristicas.AgregarColumna( "cohortes" ,   "descripcion" ,                                           "cohorte" );
    caracteristicas.AgregarColumna( "sedes" ,      "descripcion" ,                                           "sede" );
    caracteristicas.AgregarColumna( "programas" ,  "descripcion" ,                                           "programa ");
    caracteristicas.AgregarColumna( null ,         "( SELECT numero FROM telefonos WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM telefonos WHERE personas_id = personas.id AND tipo = 'C' ) AND tipo = 'C' LIMIT 1 )" , "celular" );
    caracteristicas.AgregarColumna( null ,         "( SELECT correo FROM correos WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM correos WHERE personas_id = personas.id AND tipo = 'I' ) AND tipo = 'I' LIMIT 1 )" ,     "correoInstitucional" );
    caracteristicas.AgregarColumna( null ,         "( SELECT correo FROM correos WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM correos WHERE personas_id = personas.id AND tipo = 'P' ) AND tipo = 'P' LIMIT 1 )" ,     "correoPersonal" );
    
    caracteristicas.AgregarEnlace( "estudios" ,  "personas" ,  "estudios" );
    caracteristicas.AgregarEnlace( "cohortes" ,  "cohortes" ,  "estudios" );
    caracteristicas.AgregarEnlace( "sedes" ,     "sedes" ,     "estudios" );
    caracteristicas.AgregarEnlace( "programas" , "programas" , "estudios" );  
    
    caracteristicas.AgregarFiltro( "sedes" , "instituciones_id" , "=", "1" );
    
    caracteristicas.AgregarOrdenamiento( "cohorte" , "DESC" );
    caracteristicas.AgregarOrdenamiento( "sede" , "ASC" );
    caracteristicas.AgregarOrdenamiento( "apellidos" , "ASC" );    


    this.controladorPersonas.CargarDesdeDB(true, "A", caracteristicas ).subscribe(
      (respuesta: RespuestaInterface) =>{
        switch (respuesta.codigo){
          case 200:
            this.registros =this.controladorPersonas.todos;


            this.personas$ = this.filter2.valueChanges.pipe(
              startWith(''),
              map(text => this.buscar(text, pipe))
            )

          break;
          default:
            alert("Error: "+respuesta.mensaje);
          break;
        }
      } 
    );

   }

  buscar(text: string , pipe: PipeTransform): ListaPersonasInterface[] {
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
  
  verPersona(datos){
    
    this.servicioAmbiente.actualizacionModo.modo = datos.modo
    this.servicioAmbiente.actualizacionModo.boton = null
  
  }
  
}
