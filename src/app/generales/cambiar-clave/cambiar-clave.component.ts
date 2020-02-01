import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


import { AmbienteService } from '@servicios/ambiente.service';
import { UsuariosController } from '@controladores/usuarios.controller';
import { HttpClient } from '@angular/common/http';
import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { UsuarioInterface } from '@interfaces/usuario.interface';
import { EstructuraConsultas } from '@generales/estructura-consultas';
import { AutenticacionService } from '@servicios/autenticacion.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.component.html',
  styleUrls: ['./cambiar-clave.component.css']
})
export class CambiarClaveComponent implements OnInit {
  
  controladorUsuarios : UsuariosController;

  datos : UsuarioInterface;
  
  claveActual : string;
  claveNueva : string;
  claveConfirmada : string;

  claveModelo : string = null;
  claveError : string = null;
  
  procesando : boolean = null;

  constructor( 
    private servicioEmergentes : NgbModal,
    private llamadoHttp : HttpClient,
    private servicioAmbiente : AmbienteService,    
    private rutas : Router, 
    private autenticador : AutenticacionService,    
  ) { 
 
    let conSeguridad : boolean;
    let idUsuario : number;

    if(this.servicioAmbiente.inicioModo == 2 || this.servicioAmbiente.inicioModo == 3 ){
      conSeguridad = false;
      idUsuario = servicioAmbiente.inicioIdUsrTemp;
    }
    else{
      conSeguridad = true;
      idUsuario = autenticador.UsuarioActualValor.id;
    }

    this.controladorUsuarios = new UsuariosController(llamadoHttp,servicioAmbiente,conSeguridad);

    this.claveModelo="(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,}";
    this.procesando=false;

    this.claveActual="";
    this.claveNueva="";
    this.claveConfirmada="";

    let caracteristicas = new EstructuraConsultas("F", null , "id" , "=" , String(idUsuario) );

    this.controladorUsuarios.CargarDesdeDB( false, "S", caracteristicas ).subscribe(
      (respuesta:RespuestaInterface) => {    
        this.datos= this.controladorUsuarios.actual;
      }
    );
  }

  ngOnInit() {
  }


  ConfirmarCambio(){
    this.procesando=true;

    if(this.servicioAmbiente.inicioModo == 1){

      console.log(this.autenticador.UsuarioActualValor);

      const respuesta = this.autenticador.IniciarSesion( this.autenticador.UsuarioActualValor.documento , this.claveActual, false).subscribe(
        (notificacion:RespuestaInterface) => {

          console.log(notificacion);

          switch (notificacion.codigo){
            case 200:         //login ok
            
              this.datos.clave = this.claveNueva;
              this.controladorUsuarios.Modificar(this.datos);

              this.controladorUsuarios.Guardar(false).subscribe(
                (respuesta:RespuestaInterface) => {    
                  switch (respuesta.codigo){
                    case 200:         //Guardado ok        
                      this.procesando=false;

                      this.claveActual="";
                      this.claveNueva="";
                      this.claveConfirmada="";

                      alert("Clave Modficada Satisfactoriamente");                      

                    break;
                  }
                }
              )            

            break;
            case 401:         //autenticación erronea / Usuario Bloqueado / Usuario Inactivo
              alert("Clave actual no concuerda con la almacenada");
            break;
          }

          this.procesando = false;
        }

      )

    }
    else{

      this.datos.clave = this.claveNueva;
      this.controladorUsuarios.Modificar(this.datos);

      this.controladorUsuarios.Guardar(false).subscribe(
        (respuesta:RespuestaInterface) => {    
          switch (respuesta.codigo){
            case 200:         //Guardado ok        
                this.procesando=false;
                alert("Clave Modficada Satisfactoriamente");                         
                this.servicioAmbiente.inicioModo = 1;
                this.servicioAmbiente.inicioPaso = 1;
            break;
          }
        }
      )

    }

  }

}
