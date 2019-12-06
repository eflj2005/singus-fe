import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AmbienteService } from '@servicios/ambiente.service'
import { AutenticacionService } from '@servicios/autenticacion.service';
import { RespuestaInterface } from '@interfaces/respuesta.interface';

@Component({
  selector: 'app-inicio-loguear',
  templateUrl: './inicio-loguear.component.html',
  styleUrls: ['./inicio-loguear.component.css']
})
export class InicioLoguearComponent implements OnInit {
  
  

  documento:string;
  clave:string;
  
  documentoModelo:string;

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

    this.documentoModelo="^[0-9]*$";

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
    this.procesando=true;

    if( this.documento != "" && this.clave != ""  ){
      const respuesta = this.autenticador.IniciarSesion(Number(this.documento),this.clave).subscribe(
        (notificacion:RespuestaInterface) => {
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
      this.notificacionMensaje ="Documento o Clave no pueden estar vacios";
      this.procesando = false;
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


 