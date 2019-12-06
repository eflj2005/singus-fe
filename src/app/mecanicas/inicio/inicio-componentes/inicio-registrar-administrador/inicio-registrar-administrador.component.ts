import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Router, ActivatedRoute } from '@angular/router';

import { AmbienteService } from '@servicios/ambiente.service'
import { UsuarioInterface } from '@interfaces/usuario.interface';
import { filtroInterface } from '@interfaces/filtro.interface';
import { UsuariosController } from '@controladores/usuarios.controller';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RespuestaInterface } from '@interfaces/respuesta.interface';



@Component({
  selector: 'app-inicio-registrar-administrador',
  templateUrl: './inicio-registrar-administrador.component.html',
  styleUrls: ['./inicio-registrar-administrador.component.css']
})
export class InicioRegistrarAdministradorComponent implements OnInit {
  
  controladorUsuarios: UsuariosController;

  datos:UsuarioInterface;
  
  numeroModelo:string;
  correoModelo:string;

  procesando:boolean;

  constructor(
    private servicioEmergentes: NgbModal,
    private rutas: Router, private rutaActiva: ActivatedRoute,
    private llamadoHttp :HttpClient,
    private servicioAmbiente: AmbienteService,
    private utilidadFechas: DatePipe
  ) {

    this.controladorUsuarios = new UsuariosController(llamadoHttp,servicioAmbiente);

    this.datos = {} as UsuarioInterface;
    this.datos.estado='A';
    this.datos.creacion_fecha = this.utilidadFechas.transform(new Date(), 'yyyyMMdd');
    this.datos.areas_id = 1;
    this.datos.rol = 'A';

    this.numeroModelo="^[0-9]*$";
    this.correoModelo="^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$";

    this.procesando=false;
  }

  ngOnInit() {

  }


  /*
  LlenarListaAreas(){

    this.listaAreas.push ( { id: -99, descripcion: "Cargando..." } );    

    let filtros:filtroInterface={id:2,descripcion:'a%'};

    this.areasControlador.CargarDesdeDB(filtros).subscribe(
      respuesta => {
        this.listaAreas[0] = { id:-99, descripcion: "Seleccione Area" } ;      
      }

    );
  }
*/

  ActivarRegitroAdministrador(){
    this.servicioAmbiente.inicioPaso++;   
  }


  RegistrarAdministrador(contenidoConfirmador: any, contenidoNotificador: any){
    this.procesando=true;


    const respuestaA=this.servicioEmergentes.open(contenidoConfirmador, { centered: true , backdropClass: 'light-blue-backdrop' } );

    respuestaA.result.then(
      (result) => {
        if(result == 'SI'){ //se recibe close

          this.controladorUsuarios.Agregar(this.datos);
      
          const respuesta1 = this.controladorUsuarios.Guardar(false).subscribe(
            (notificacion1:RespuestaInterface) => {
              switch (notificacion1.codigo){
                case 200:         //Guardado ok
   
                  const respuesta2 = this.controladorUsuarios.GenerarCodigo(  this.datos.id   ).subscribe(     //OJO cambiar 2 por id recibido
                    (notificacion2:RespuestaInterface) => {
                      switch (notificacion2.codigo){
                        case 200:         //login ok         

                          const respuestaB=this.servicioEmergentes.open(contenidoNotificador, { centered: true });

                          respuestaB.result.then(
                            (result) => { /* Se recibe close */ }, 
                            (reason) => { // Se recibe dismiss
                              if(reason == 'CONTINUAR'){ //se recibe close             
        
                                  this.procesando=false;
                                  this.servicioAmbiente.inicioIdUsrTemp= this.datos.id ;            //OJO cambiar 2 por id recibido
                                  this.servicioAmbiente.inicioPaso++;        
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
                  alert(notificacion1.asunto + ": " + notificacion1.mensaje);
                  // this.hayNotificaion = true;
                  // this.notificacionMensaje = notificacion.asunto + ": " + notificacion.mensaje;
                  this.procesando=false; 
                break;
              }
            }
          );          
        }
      }, 
      (reason) => { // Se recibe dismiss  
        
        this.procesando=false;

      }
    );



   

  }






}
