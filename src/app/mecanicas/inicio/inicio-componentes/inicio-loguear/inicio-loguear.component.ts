import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AmbienteService } from '@app/servicios/ambiente.service'
import { AutenticacionService } from '@app/servicios/autenticacion.service';
import { RespuestaInterface } from '@app/modelos/respuesta.interface';

@Component({
  selector: 'app-inicio-loguear',
  templateUrl: './inicio-loguear.component.html',
  styleUrls: ['./inicio-loguear.component.css']
})
export class InicioLoguearComponent implements OnInit {
  
  

  documento:string;
  clave:string;
  
  modo:number;   //Modo de inicio =>  1 = Login normal, 2 = Nuevo Administrador
  procesando:boolean;
  hayNotificaion:boolean;
  notificacionMensaje:string;
  




  constructor( 
    // private rutas: Router, 
    // private rutaActiva: ActivatedRoute, 
    private datosAmbiente: AmbienteService,
    private autenticador: AutenticacionService,
    private rutas: Router
  ){
    this.documento="";
    this.clave="";
    this.procesando=false;
  
    this.hayNotificaion = false;
    this.notificacionMensaje ="";

  }

  ngOnInit() {
    /*
    this.suscrito = this.rutaActiva.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.modo = +params['modo'];
    }); 
    */
   //console.log(  this.autenticador.usuarioActual, "INICIO" );
  }    


  ngOnDestroy() {
    //this.suscrito.unsubscribe();
  }


  ValidarLogin(){
  
    if( this.documento != "" && this.clave != ""  ){
      this.procesando=true;

      const respuesta = this.autenticador.IniciarSesion(Number(this.documento),this.clave).subscribe(
        (notificacion:RespuestaInterface) => {
          console.log(notificacion, "RESPUESTA");
          switch (notificacion.codigo){
            case 200:         //login ok
            
              //this.rutas.navigate(["/dashboard"], { relativeTo: this.rutaActiva, skipLocationChange: true } );
              this.rutas.navigate(["/dashboard"]);
            break;
            case 401:         //autenticación erronea / Usuario Bloqueado / Usuario Inactivo
              this.hayNotificaion = true;
              this.notificacionMensaje = notificacion.asunto + ": " + notificacion.mensaje;
            break;
          }
        // console.log(  this.autenticador.usuarioActual, "LOGEADO" );
          this.procesando = false;
        }

      )
    }
    else{
      this.hayNotificaion = true;
      this.notificacionMensaje ="documento o clave no pueden estar vacios";
    }  
    
  }

  RecuperarClave(){
    this.datosAmbiente.inicioModo=3;
    this.datosAmbiente.inicioPaso=1;
  }

  
  LimpiarToken(){
    this.autenticador.CerrarSesion();
  }

  CerrarNotificacio(){
    this.hayNotificaion = false;
  }

}


 