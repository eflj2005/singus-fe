import { Component, OnInit } from '@angular/core';
import { NgbHighlight } from "@ng-bootstrap/ng-bootstrap";
import { FormControl } from '@angular/forms';
import {AmbienteService} from '@servicios/ambiente.service';


@Component({
  selector: 'personas-actualizacion-lista',
  templateUrl: './personas-actualizacion-lista.component.html',
  styleUrls: ['./personas-actualizacion-lista.component.css']
})
export class PersonasActualizacionListaComponent implements OnInit {
  filter = new FormControl('');
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

  constructor(private AmbienteService : AmbienteService) { }

  ngOnInit() {
  }
  verPersona(datos){
    
    this.AmbienteService.actualizacionModo.modo = datos.modo
    this.AmbienteService.actualizacionModo.boton = null
  }
}
