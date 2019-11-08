import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { UsuariosService } from '../usuarios.service'

@Component({
  selector: 'app-cambio-clave',
  templateUrl: './cambio-clave.component.html',
  styleUrls: ['./cambio-clave.component.css']
})
export class CambioClaveComponent implements OnInit {
  
  claveActual:string;
  claveNueva:string;
  claveConfirmada:string;

  claveModelo:string=null;
  claveError:string=null;
  
  procesando:boolean=null;

  constructor( private servicioUsuarios: UsuariosService, private rutas: Router ) { 
    this.claveModelo="(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,}";
    this.procesando=false;

    this.claveActual="";
    this.claveNueva="";
    this.claveConfirmada="";    
  }

  ngOnInit() {
  }


  ConfirmarCambio(){
    alert("Confirmo");
    this.procesando=true;

    /*


      PROCESAR ACTUALIZACION DE CLAVE


    */

    if(this.servicioUsuarios.modo != 1){
      
      
      this.servicioUsuarios.modo = 1; //eliminar
      this.servicioUsuarios.paso = 1; //eliminar

      this.RecargarComponente();
    }


  }

  RecargarComponente(){
    this.rutas.routeReuseStrategy.shouldReuseRoute = function(){return false;};

    let currentUrl = this.rutas.url + '?';
  
    this.rutas.navigateByUrl(currentUrl).then(() => {
      this.rutas.navigated = false;
      this.rutas.navigate([this.rutas.url]);
    });
  }
}
