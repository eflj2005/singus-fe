import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'personas-actualizacion-lista',
  templateUrl: './personas-actualizacion-lista.component.html',
  styleUrls: ['./personas-actualizacion-lista.component.css']
})
export class PersonasActualizacionListaComponent implements OnInit {
  searchObjectEmpleados: any ={
    Documento:"",
    Nombres:"",
    Apellidos:"",
    NombreCargo:"",
    Especialidad:"",
    TarjetaProfesional:"",
    Celular:"",
    CorreoElectronico:"",
    Direccion:"",
    Estado:"",
    NombreCiudad:"",
    Titular:"",
    Rol:""
  };

  personas: any = {
    IdPersona:1,
    Cohorte:123456,
    Id:123412,
    Sede:"Medellin",
    Nombre:"Juan Carlos Bustos Tovio",
    Cedula:1007405687,
    Programa:"Ing. Sistemas",
    Celular:3223542148,
    CorreoInstitucional:"ASDKASJKDHA@SSDASD.COM",
    CorreoPersonal:"ASDKASJKDHA@SSDASD.COM",
  };

  constructor(private router: Router) { }

  ngOnInit() {
  }
  verEmpleado(id){
    this.router.navigateByUrl('/editarEmpleado/'+id)
    
  }
}
