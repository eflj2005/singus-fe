import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';

import { UsuariosService } from "./../usuarios.service"

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  documento:string= null;
  clave:string= null;
  suscrito:any=null;
    
  modo:number=null;   //Modo de inicio =>  1 = Login normal, 2 = Nuevo Administrador

  procesando:boolean=null;

  constructor( private rutas: Router, private rutaActiva: ActivatedRoute, private servicioUsuarios: UsuariosService ){
    this.documento="";
    this.clave="";
    this.procesando=false;
  }

  ngOnInit() {
    /*
    this.suscrito = this.rutaActiva.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.modo = +params['modo'];
    }); 
    */
  }    


  ngOnDestroy() {
    //this.suscrito.unsubscribe();
  }

  ValidarLogin(){
    alert("envio formulario Login");
    this.procesando=true;
    
  }

  RecuperarClave(){
    this.servicioUsuarios.modo=3;
    this.servicioUsuarios.paso=1;
  }

}


 