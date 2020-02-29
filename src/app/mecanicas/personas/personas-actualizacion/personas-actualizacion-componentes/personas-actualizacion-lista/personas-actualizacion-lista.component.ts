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
import { Router } from '@angular/router';

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
  
  personas$: Observable<ListaPersonasInterface[]>;

  filter2 = new FormControl('');
  
  controladorPersonas: PersonasController;

  constructor(
    private servicioAmbiente : AmbienteService,
    private llamadoHttp : HttpClient,
    private pipe: DecimalPipe,
    private enrutador: Router
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

    caracteristicas.AgregarFiltro( "personas" , "id" , "=", "3130" );
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
          || persona.nombreCompleto.toLowerCase().includes(term)
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
    this.servicioAmbiente.controlMecanicasPersonas.origen = this.enrutador.url

  }
  
}
