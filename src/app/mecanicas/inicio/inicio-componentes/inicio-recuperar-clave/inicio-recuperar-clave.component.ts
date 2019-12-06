import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AmbienteService } from '@servicios/ambiente.service'
import { UsuarioInterface } from '@interfaces/usuario.interface';
import { UsuariosController } from '@controladores/usuarios.controller';
import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inicio-recuperar-clave',
  templateUrl: './inicio-recuperar-clave.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./inicio-recuperar-clave.component.css']
})
export class InicioRecuperarClaveComponent implements OnInit {

  controladorUsuarios: UsuariosController;
  
  datos:UsuarioInterface;
  
  documento:number=null;

  documentoModelo:string=null;
  mensaje:string=null;

  procesando:boolean=null;


  constructor(
     private datosAmbiente: AmbienteService,
     private llamadoHttp: HttpClient,
     private servicioEmergentes: NgbModal,
  ) {
    this.controladorUsuarios = new UsuariosController( llamadoHttp, datosAmbiente );
    this.datos = {} as UsuarioInterface;
    this.documentoModelo="^[0-9]*$";
    
    this.procesando=false;
  

   }

  ngOnInit() {
  }

  RecuperarClave(contenidoNotificador: any){
    var correoUsuario:string = "";
    var correoAjustado:string = "";
    
    this.procesando=true;

    const respuesta1 = this.controladorUsuarios.CargarDesdeDB(false, { documento: this.documento }).subscribe(
      (notificacion1:RespuestaInterface) => {
        
        switch (notificacion1.codigo){
          case 200:         //Guardado ok
            this.datos = notificacion1.mensaje[0];

            const respuesta2 = this.controladorUsuarios.GenerarCodigo(  this.datos.id   ).subscribe(     //OJO cambiar 2 por id recibido
              (notificacion2:RespuestaInterface) => {
                switch (notificacion2.codigo){
                  case 200:         //login ok         
                    
                    correoAjustado = this.datos.correo;   //"sd***bj@asd.com";
                    this.mensaje = "Se ha enviado un mensaje a '" + correoAjustado + "' con el codigo de confirmación.";    
        
                    const emergente=this.servicioEmergentes.open(contenidoNotificador, { centered: true });

                    emergente.result.then(
                      (result) => { /* Se recibe close */ }, 
                      (reason) => { // Se recibe dismiss
                        if(reason == 'CONTINUAR'){ //se recibe close             
  
                          this.procesando=false;
                          this.datosAmbiente.inicioIdUsrTemp= this.datos.id ;            //OJO cambiar 2 por id recibido
                          this.datosAmbiente.inicioPaso++;                                
                        }
                      }
                    );

                  break;
                  case 400:         //autenticación erronea / Usuario Bloqueado / Usuario Inactivo
                    alert(notificacion2.asunto + ": " + notificacion2.mensaje);
                    this.procesando=false; 
                  break;
                }
              }
            );

          break;
          case 400:         //autenticación erronea / Usuario Bloqueado / Usuario Inactivo
            this.mensaje = "No se encontro un correo asociado a ese documento"; 
            alert(notificacion1.asunto + ": " + notificacion1.mensaje);
            // this.hayNotificaion = true;
            // this.notificacionMensaje = notificacion.asunto + ": " + notificacion.mensaje;
            this.procesando=false; 
          break;
        }
      }
    );  





  }

}
