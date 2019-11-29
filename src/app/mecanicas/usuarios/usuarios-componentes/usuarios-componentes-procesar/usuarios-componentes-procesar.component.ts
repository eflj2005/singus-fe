import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { UsuarioInterface } from '@app/modelos/interfaces/usuario.interface';

@Component({
  selector: 'app-usuarios-componentes-procesar',
  templateUrl: './usuarios-componentes-procesar.component.html',
  styleUrls: ['./usuarios-componentes-procesar.component.css']
})
export class UsuariosComponentesProcesarComponent implements OnInit {

  titulo:string;
  // queryParams: Params;
  modo:number;
  datos:UsuarioInterface;

  numeroModelo:string;
  correoModelo:string;

  
  constructor(
    private rutaActiva: ActivatedRoute
  ) 
  {
    // // URL query parameters
    // this.rutaActiva.queryParams.subscribe( params => {
    //   this.queryParams = params;
    // });

    // console.log(this.queryParams);
<<<<<<< HEAD

    this.titulo ="";
=======
>>>>>>> 810e7725a18a01b58fd6a240a3129bc881eee722

    this.numeroModelo="^[0-9]*$";
    this.correoModelo="^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$";

    this.datos = {} as UsuarioInterface;

  }

  ngOnInit() {
    if(this.modo == 1){
      this.titulo = "Crear";
    }
    else{
      this.titulo = "Modificar";
    }
  }

}
