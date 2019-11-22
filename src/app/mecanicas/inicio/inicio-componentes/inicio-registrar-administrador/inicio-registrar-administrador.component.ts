import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Router, ActivatedRoute } from '@angular/router';

import { AmbienteService } from '@app/servicios/ambiente.service'
import { UsuarioInterface } from '@app/modelos/usuario.interface';
import { AreasController } from '@app/modelos/areas.controller';
import { AreaInterface } from '@app/modelos/area.interface';
import { filtroInterface } from '@app/modelos/generico.model';
import { UsuariosController } from '@app/modelos/usuarios.controller';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-inicio-registrar-administrador',
  templateUrl: './inicio-registrar-administrador.component.html',
  styleUrls: ['./inicio-registrar-administrador.component.css']
})
export class InicioRegistrarAdministradorComponent implements OnInit {

  datos:UsuarioInterface;
  
  numeroModelo:string;
  correoModelo:string;

  procesando:boolean;

  constructor(
    private servicioEmergentes: NgbModal,
    private rutas: Router, private rutaActiva: ActivatedRoute,
    private servicioAmbiente: AmbienteService,
    private controladorUsuarios: UsuariosController,
    private utilidadFechas: DatePipe
  ) {

    this.datos = {} as UsuarioInterface;
    this.datos.estado='A';
    this.datos.fechacreacion = this.utilidadFechas.transform(new Date(), 'yyyyMMdd');
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
                  this.servicioAmbiente.inicioPaso++;
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

    // this.procesando=false;
    // this.servicioAmbiente.inicioPaso++;
  }


  RegistrarAdministrador2(contenidoConfirmador: any, contenidoNotificador: any){
    this.procesando=true;

    this.controladorUsuarios.Agregar(this.datos);

    this.controladorUsuarios.Guardar().subscribe(
      respuesta => {
            
      }
    );

    this.procesando=false;


    // const respuestaA=this.servicioEmergentes.open(contenidoConfirmador, { centered: true });

    // respuestaA.result.then(
    //   (result) => {
    //     if(result == 'SI'){ //se recibe close

    //       /*

    //         AQUI VA EL LLAMADO A GENERACION DE CODIGO Y ENVIO DE CORREO


    //       */


    //       const respuestaB=this.servicioEmergentes.open(contenidoNotificador, { centered: true });

    //       respuestaB.result.then(
    //         (result) => { /* Se recibe close */ }, 
    //         (reason) => { // Se recibe dismiss
    //           if(reason == 'CONTINUAR'){ //se recibe close             

    //               this.procesando=false;
    //               this.servicioAmbiente.inicioPaso++;
    //             /*
    //                this.rutas.navigate( ['login/validar_codigo/'] );
    //                //this.rutas.navigate( ['inicio_sesion/'], { relativeTo: this.rutaActiva, queryParams: { modo: this.modo },  skipLocationChange: true } );     
    //                */              
    //           }
    //         }
    //       );

    //     }
    //   }, 
    //   (reason) => { // Se recibe dismiss  
        
    //     this.procesando=false;

    //   }
    // );
  }






}
