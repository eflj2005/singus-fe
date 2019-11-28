import { Component, OnInit } from '@angular/core';

import { AmbienteService } from '@app/servicios/ambiente.service'
import { UsuariosController } from '@modelos/controladores/usuarios.controller';
import { HttpClient } from '@angular/common/http';
import { RespuestaInterface } from '@app/modelos/respuesta.interface';

@Component({
  selector: 'app-inicio-validar-codigo',
  templateUrl: './inicio-validar-codigo.component.html',
  styleUrls: ['./inicio-validar-codigo.component.css']
})
export class InicioValidarCodigoComponent implements OnInit {
  
  controladorUsuarios: UsuariosController;
  
  codigo:string=null;
  codigoModelo:string=null;
  codigoError:string=null;

  procesando:boolean=null;



  constructor(
    private llamadoHttp :HttpClient,
    private servicioAmbiente: AmbienteService,
  ) {
    this.controladorUsuarios = new UsuariosController(llamadoHttp,servicioAmbiente);
    this.codigoModelo="[A-Z0-9]{3}-[A-Z0-9]{3}";
    
    this.procesando=false;
   }

  ngOnInit() {
  }

  ValidarCodigo(){

    this.procesando=true;
    const respuesta = this.controladorUsuarios.ValidarCodigo(this.servicioAmbiente.inicioIdUsrTemp,this.codigo).subscribe(
      (notificacion:RespuestaInterface) => {
        switch (notificacion.codigo){
          case 200:         //login ok
            this.servicioAmbiente.inicioPaso++;
            this.procesando = false;
      
          break;
          case 401:         //autenticación erronea / Usuario Bloqueado / Usuario Inactivo
            // this.hayNotificaion = true;
            // this.notificacionMensaje = notificacion.asunto + ": " + notificacion.mensaje;
            alert(notificacion.asunto + ": " + notificacion.mensaje);
            this.procesando = false;
          break;
        }
      }

    )
  }
}
