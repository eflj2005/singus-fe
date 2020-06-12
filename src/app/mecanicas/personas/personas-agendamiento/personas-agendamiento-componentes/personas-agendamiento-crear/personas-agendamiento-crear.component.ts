import { Component, OnInit, PipeTransform} from '@angular/core';
import {formatDate} from '@angular/common';
import { FormControl } from '@angular/forms';
import {AmbienteService} from '@servicios/ambiente.service';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EstructuraConsultas } from '@generales/estructura-consultas';
import { HttpClient } from '@angular/common/http';

import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { ResponsablesInterface } from "@interfaces/responsables.interface";
import { ResponsablesController } from "@controladores/responsables.controller";
import { PersonasInterface } from "@interfaces/personas.interface";
import { PersonasController } from "@controladores/personas.controller";
import { Agendas2Interface } from "@interfaces/agendas2.interface";
import { Agendas2Controller } from "@controladores/agendas2.controller";

interface  responsables extends ResponsablesInterface {

} 

interface PersonaTemporarl { 
  Id:number,
  Nombre:string,
  Programa:string,
  Cedula:number,
  IdPerona:number,
  FechaActualizacion:string,
  Seleccionado: boolean}

  interface responsable  {
    id :number,
    nombres :  string
  }


@Component({
  selector: 'app-personas-agendamiento-crear',
  templateUrl: './personas-agendamiento-crear.component.html',
  styleUrls: ['./personas-agendamiento-crear.component.css'],
  providers: [DecimalPipe]
})
export class PersonasAgendamientoCrearComponent implements OnInit {

  controladorResponsables: ResponsablesController;
  controladorAgendas: Agendas2Controller;
  controladorPersonas: PersonasController;
  
  
  registrosResponsables: ResponsablesInterface[];
  registrosAgendas:  Agendas2Interface[];
  registrosPersonas:  PersonasInterface[];

  responsable : responsable;  
  rol : string;
  responsables$: Observable<ResponsablesInterface[]>;
  filterResponsables = new FormControl('');
  filterAgendados=  new FormControl('');

  // PersonasSeleccionadas$: Observable<PersonaTemporarl[]>;
  // personas$: Observable<PersonaTemporarl[]>;
  // filter = new FormControl('');
  // filter2 = new FormControl('');

  // mostarBoton: boolean ;
  //   seleccion: boolean  ;
  //   FechaInicio : any ;
  // responsable = 0;

  constructor(private servicioAmbiente: AmbienteService , private pipe: DecimalPipe, private modal: NgbModal, private llamadoHttp :HttpClient ) {


    this.ConsultaRresponsables();
    // this.dateFormatormat(this.now, "dddd, mmmm dS, yyyy");
    // this.FechaInicio= formatDate(new Date(), 'yyyy-MM-dd', 'en');
 
    this.AplicarFiltros();

  //   if(this.PersonasSeleccionadas.length != 0  ){
  //     this.mostarBoton = true;
  //   }
  //   else {
  //     this.mostarBoton = false;
  //   }
 }
  
   ngOnInit() {
      
  }
  
  PersonasSeleccionadas:Array<PersonaTemporarl> = [];

 
 

  
  // Mostar(){
  //   console.log(this.Personas);
  // }
  // quitarPersonas(){
  //   this.PersonasSeleccionadas.forEach((elemento,indice) => {

  //     if(elemento.Seleccionado){
  //       elemento.Seleccionado =false;
  //       this.Personas.push( Object.assign({}, elemento));
       
  //       this.PersonasSeleccionadas.splice(indice,1);
        
  //     }

  //   this.AplicarFiltros();
  //   });
  // }

  // agregarPersonas(pipe: DecimalPipe){
    
  //   this.Personas.forEach((elemento,indice) => {

  //    if(elemento.Seleccionado){
  //      elemento.Seleccionado =false;
  //      this.PersonasSeleccionadas.push( Object.assign({}, elemento));
      
  //      this.Personas.splice(indice,1);
       
  //    }

  //   this.AplicarFiltros();
  //  });

//  }

 Cancelar(){
  this.servicioAmbiente.agendaModo.modo = 1;
}

  // buscar(text: string , pipe: PipeTransform , tabla : number): PersonaTemporarl[] {
  
  // if (tabla == 1) {
  //   return this.PersonasSeleccionadas.filter(persona => {
  //     const term = text.toLowerCase();
  //     return pipe.transform(persona.IdPerona).includes(term)
  //         || pipe.transform(persona.Id).includes(term)
  //         || persona.Nombre.toLowerCase().includes(term)
  //         || persona.Programa.toLowerCase().includes(term)
  //         || pipe.transform(persona.Cedula).includes(term)
  //         || persona.FechaActualizacion.toLowerCase().includes(term);
  //   });
  // } else {
  //   return this.Personas.filter(persona => {
  //     const term = text.toLowerCase();
  //     return pipe.transform(persona.IdPerona).includes(term)
  //         || pipe.transform(persona.Id).includes(term)
  //         || persona.Nombre.toLowerCase().includes(term)
  //         || persona.Programa.toLowerCase().includes(term)
  //         || pipe.transform(persona.Cedula).includes(term)
  //         || persona.FechaActualizacion.toLowerCase().includes(term);
  //   });
    
  // }
  // }


  buscarResponsable(text: string , pipe: PipeTransform ): ResponsablesInterface[] {
      let registrosResponsablesTemp =  this.registrosResponsables.filter(responsable => responsable.rol == this.rol );
      return registrosResponsablesTemp.filter(responsable => {
        const term = text.toLowerCase();
        return pipe.transform(responsable.id).includes(term)
            || pipe.transform(responsable.documento).includes(term)
            || responsable.nombres.toLowerCase().includes(term)
            || responsable.apellidos.toLowerCase().includes(term)

      });

    }
  
  AplicarFiltros(){

    this.responsables$ =  this.filterResponsables.valueChanges.pipe(
      startWith(''),
      map(text => this.buscarResponsable(text, this.pipe))
    )

    // this.PersonasSeleccionadas$ = this.filter.valueChanges.pipe(
    //   startWith(''),
    //   map(text => this.buscar(text, this.pipe , 1))
    // )

    // this.personas$ = this.filter2.valueChanges.pipe(
    //   startWith(''),
    //   map(text => this.buscar(text, this.pipe , 2))
    // )
  }



  ActivarModal( modalRecibido : any , tipo: Number ){

    switch (tipo) {
      case 1:
        
        break;
      case 2:
      
        break;
      default:
        break;
    }


    const respuesta  = this.modal.open( modalRecibido, { size : 'lg'  ,  backdropClass: 'light-blue-backdrop', backdrop: "static"  } );
    
  }

  seleccionResponsable(id : number , nombres: string){
    this.responsable.id = id;
    this.responsable.nombres = nombres; 

    console.log(this.responsable);
  }

  ConsultaRresponsables(){

    let caracteristicas = new EstructuraConsultas();
    caracteristicas.AgregarColumna( "responsables", "id" , null );
    caracteristicas.AgregarColumna( "responsables", "documento" , null );
    caracteristicas.AgregarColumna( "responsables", "nombres" , null);
    caracteristicas.AgregarColumna( "responsables", "apellidos" , null );
    caracteristicas.AgregarColumna( "responsables", "rol" , null );

    this.controladorResponsables = new ResponsablesController(this.llamadoHttp,this.servicioAmbiente);
    this.controladorResponsables.CargarDesdeDB(true, "S" , caracteristicas).subscribe(
      (respuesta: RespuestaInterface) =>{
        switch(respuesta.codigo){
          case 200:
            this.registrosResponsables = this.controladorResponsables.todos ;
            console.log(this.registrosResponsables);
            break;
          default:
            alert("Error: "+respuesta.mensaje);
            break;
        }
      }
    );
  }

}

