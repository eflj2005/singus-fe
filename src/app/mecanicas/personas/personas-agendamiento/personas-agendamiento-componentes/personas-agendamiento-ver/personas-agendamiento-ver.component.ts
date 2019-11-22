import { Component, OnInit } from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service';
import {formatDate} from '@angular/common';
import { Router } from '@angular/router';

interface PersonaTemporarl { 
  Id:number,
  Nombre:string,
  Programa:string,
  Cedula:number,
  IdPersona:number,
  Celular: number,
  CorreoInstitucional:string,
  CorreoPersonal:string,
  FechaActualizacion:string,
Seleccionado: boolean}
@Component({
  selector: 'app-personas-agendamiento-ver',
  templateUrl: './personas-agendamiento-ver.component.html',
  styleUrls: ['./personas-agendamiento-ver.component.css']
})
export class PersonasAgendamientoVerComponent implements OnInit {

  mostarBoton: boolean ;
  seleccion: boolean  ;
  FechaInicio : any ;
responsable = 1;
FechaFinal : any;
Nombre: string = "Agenda Contaduria Publica";
constructor(private datosAmbiente : AmbienteService,private router: Router) {
  // this.dateFormatormat(this.now, "dddd, mmmm dS, yyyy");
  this.FechaInicio= formatDate(new Date(), 'yyyy-MM-dd', 'en');
  this.FechaFinal= formatDate(new Date(), 'yyyy-MM-dd', 'en');


  if(this.PersonasSeleccionadas.length != 0  ){
    this.mostarBoton = true;
  }
  else {
    this.mostarBoton = false;
  }
 }

 ngOnInit() {
    
}



PersonasSeleccionadas: Array<PersonaTemporarl> = [{
  Id:1,
  Nombre:"Juan Camilo Caviedes Toro ",
  Programa:"Contaduria",
  Cedula:1007405687,
  IdPersona:15678,
  Celular:3134992012,
  CorreoInstitucional:"Juan.Camilo@Uniminuto.edu.co",
  CorreoPersonal:"ddaxcwedd@hotmail.com",
  FechaActualizacion:"12-12-2019",
  Seleccionado: true
},
{
  Id:2,
  Nombre:"Fernando Suarez Martinez ",
  Programa:"Contaduria",
  Cedula:1011234187,
  IdPersona:12345678,
  Celular:76543451,
  CorreoInstitucional:"Fernando.Suarez@Uniminuto.edu.co",
  CorreoPersonal:"ddaxcwedd@Gmail.com",
  FechaActualizacion:"12-11-2019",
  Seleccionado: true
},
{
  Id:1,
  Nombre:"Ernesto Gonzales Cabrera ",
  Programa:"Contaduria",
  Cedula:1007405687,
  IdPersona:12345678,
  Celular:76543451,
  CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
  CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co",
  FechaActualizacion:"12-12-2019",
  Seleccionado: false
},
{
  Id:2,
  Nombre:"Angie Jimena Cabezas ",
  Programa:"Contaduria",
  Cedula:1011234187,
  IdPersona:12345678,
  Celular:76543451,
  CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
  CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co",
  FechaActualizacion:"12-11-2019",
  Seleccionado: true
},
{
  Id:1,
  Nombre:"Luis Felipe Perez ",
  Programa:"Contaduria",
  Cedula:1007405687,
  IdPersona:12345678,
  Celular:76543451,
  CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
  CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co",
  FechaActualizacion:"12-12-2019",
  Seleccionado: false
},
{
  Id:2,
  Nombre:"Luisa Mara Sanchez Ortiz ",
  Programa:"Contaduria",
  Cedula:1011234187,
  IdPersona:12345678,
  Celular:76543451,
  CorreoInstitucional:"ASDKASJihgfA@Uniminuto.edu.co",
  CorreoPersonal:"ddaxcwedd@Uniminuto.edu.co",
  FechaActualizacion:"12-11-2019",
  Seleccionado: false
}
];

verPersona(datos){
  this.datosAmbiente.actualizacionModo.modo = datos.modo;
  this.datosAmbiente.actualizacionModo.boton = 1;
  this.router.navigateByUrl("/lista");
}
Cancelar(){
 
this.datosAmbiente.agendaModo.modo = 1;

}

}
