import { Component, OnInit , PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import {AmbienteService} from '@servicios/ambiente.service';

import { PersonasInterface } from '@interfaces/personas.interface';
import { PersonasController } from '@controladores/personas.controller';
import { HttpClient } from '@angular/common/http';
import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { EstructuraConsultas } from '@generales/estructura-consultas';


interface ListaPersonas extends PersonasInterface{
  nombreCompleto: string;
  documento: number;
  idUniminuto: number; 
  nacimiento_fecha: string;
  programa : string ;
  actualizacion_fecha: string ;  

}


@Component({
  selector: 'app-reportes-alertas-principal',
  templateUrl: './reportes-alertas-principal.component.html',
  styleUrls: ['./reportes-alertas-principal.component.css'],
  providers: [DecimalPipe]
})
export class ReportesAlertasPrincipalComponent implements OnInit {

  personas$: Observable<ListaPersonas[]>;
  registros: ListaPersonas[];
  filter = new FormControl('');

  controladorPersonas: PersonasController;

  constructor(private pipe: DecimalPipe, private llamadoHttp : HttpClient,   private servicioAmbiente : AmbienteService,) { 
    
    this.controladorPersonas = new PersonasController(llamadoHttp,servicioAmbiente);
    this.registros=[];

    let caracteristicas  = new EstructuraConsultas();
    caracteristicas.AgregarColumna( null , "CONCAT( personas.nombres , ' ' , personas.apellidos )" , "nombreCompleto" );
    caracteristicas.AgregarColumna( "personas", "documento" , "documento");
    caracteristicas.AgregarColumna("personas", "iduniminuto", "idUniminuto");
    caracteristicas.AgregarColumna("personas", "nacimiento_fecha", "nacimineto_fecha");
    caracteristicas.AgregarColumna("personas", "actualizacion_fecha", "actualizacion_fecha");
    caracteristicas.AgregarColumna("programas", "descripcion", "programa");
    
    caracteristicas.AgregarEnlace( "estudios" ,  "personas" ,  "estudios" );
    caracteristicas.AgregarEnlace( "ofertas" ,  "ofertas" ,  "estudios" );
    caracteristicas.AgregarEnlace( "programas" ,  "programas" ,  "ofertas" );

    this.controladorPersonas.CargarDesdeDB(true, "A", caracteristicas ).subscribe(
      (respuesta: RespuestaInterface) =>{
        switch (respuesta.codigo){
          case 200:
           
          this.registros = this.controladorPersonas.todos;
console.log(this.registros);
          this.AplicarFiltros();

          break;
          default:
            alert("Error: "+respuesta.mensaje);
          break;
        }
      } 
    );

   

  }

  ngOnInit() {
    this.AplicarFiltros();
  
  }



  
  AplicarFiltros(){
    this.personas$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.buscar(text, this.pipe ))
    )
  }

  buscar(text: string , pipe: PipeTransform ): ListaPersonas[] {

      return this.registros.filter(persona => {
        const term = text.toLowerCase();
        return pipe.transform(persona.idUniminuto).includes(term)
            || pipe.transform(persona.documento).includes(term)
            || persona.nombreCompleto.toLowerCase().includes(term)
            || persona.programa.toLowerCase().includes(term)
            || persona.nacimiento_fecha.toLowerCase().includes(term)
            || persona.actualizacion_fecha.toLowerCase().includes(term);
      });
      
    }
}
