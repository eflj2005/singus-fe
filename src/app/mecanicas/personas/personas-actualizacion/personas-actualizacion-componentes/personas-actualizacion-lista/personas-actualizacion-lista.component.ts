import { Component, OnInit } from '@angular/core';

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
  }
  constructor() { }

  ngOnInit() {
  }

}
