import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AmbienteService } from '@app/servicios/ambiente.service'

@Component({
  selector: 'app-inicio-loguear',
  templateUrl: './inicio-loguear.component.html',
  styleUrls: ['./inicio-loguear.component.css']
})
export class InicioLoguearComponent implements OnInit {
  documento:string= null;
  clave:string= null;
  suscrito:any=null;
    
  modo:number=null;   //Modo de inicio =>  1 = Login normal, 2 = Nuevo Administrador

  procesando:boolean=null;

  constructor( private rutas: Router, private rutaActiva: ActivatedRoute, private datosAmbiente: AmbienteService ){
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
    this.datosAmbiente.inicioModo=3;
    this.datosAmbiente.inicioPaso=1;
  }

}


 