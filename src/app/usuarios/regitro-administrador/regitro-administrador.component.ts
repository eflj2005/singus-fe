import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Router, ActivatedRoute } from '@angular/router';

import { UsuariosService }     from './../usuarios.service';

@Component({
  selector: 'app-regitro-administrador',
  templateUrl: './regitro-administrador.component.html',
  styleUrls: ['./regitro-administrador.component.css']
})
export class RegitroAdministradorComponent implements OnInit {

  documento:number= null;
  nombres:string= null;
  apellidos:string= null;
  correo:string= null;
  telefono:string= null;  


  procesando:boolean=null;

  constructor(
    private servicioEmergentes: NgbModal,
    private rutas: Router, private rutaActiva: ActivatedRoute,
    private procesoLogeo: UsuariosService
  ) {

    this.documento=null;
    this.nombres="";
    this.apellidos="";
    this.correo="";
    this.telefono=null;

    this.procesando=false;
  }

  ngOnInit() {
  }

  ActivarRegitroAdministrador(){
    this.procesoLogeo.paso++;   
  }  

  RegistrarAdministrador(contenidoConfirmador: any, contenidoNotificador: any){

    this.procesando=true;

    const respuestaA=this.servicioEmergentes.open(contenidoConfirmador, { centered: true });

    respuestaA.result.then(
      (result) => {
        if(result == 'SI'){ //se recibe close

          /*

            AQUI VA EL LLAMADO A GENERACION DE CODIGO Y ENVIO DE CORREO


          */


          const respuestaB=this.servicioEmergentes.open(contenidoNotificador, { centered: true });

          respuestaB.result.then(
            (result) => { /* Se recibe close */ }, 
            (reason) => { // Se recibe dismiss
              if(reason == 'CONTINUAR'){ //se recibe close             

                  this.procesando=false;
                  this.procesoLogeo.paso++;
                /*
                   this.rutas.navigate( ['login/validar_codigo/'] );
                   //this.rutas.navigate( ['inicio_sesion/'], { relativeTo: this.rutaActiva, queryParams: { modo: this.modo },  skipLocationChange: true } );     
                   */              
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
