import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { UsuarioInterface } from '@app/modelos/interfaces/usuario.interface';

@Component({
  selector: 'app-usuarios-componentes-procesar',
  templateUrl: './usuarios-componentes-procesar.component.html',
  styleUrls: ['./usuarios-componentes-procesar.component.css']
})
export class UsuariosComponentesProcesarComponent implements OnInit {

  queryParams: Params;
  datos:UsuarioInterface;

  numeroModelo:string;
  correoModelo:string;

  
  constructor(
    private rutaActiva: ActivatedRoute
  ) 
  {
    // URL query parameters
    this.rutaActiva.queryParams.subscribe( params => {
      this.queryParams = params;
    });

    // console.log(this.queryParams);

    this.numeroModelo="^[0-9]*$";
    this.correoModelo="^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$";

    this.datos = {} as UsuarioInterface;

    this.datos.id = 34;
    this.datos.documento = 14398302;
    this.datos.nombres = "Edwin";
    this.datos.apellidos = "Londoño";
    this.datos.telefono = 12345;
    this.datos.correo = "eflj2005@yahoo.com";
    this.datos.creacion = "2019-11-01";
    this.datos.rol = 'C';
    this.datos.areas_id = 2;
    this.datos.estado = 'B';

  }

  ngOnInit() {
  }

}
