import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UsuariosService }     from './../usuarios.service';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent implements OnInit {

  documento:number=null;
  documentoModelo:string=null;
  mensaje:string=null;

  procesando:boolean=null;


  constructor(
     private procesoLogeo: UsuariosService, 
     private servicioEmergentes: NgbModal,
  ) {

    this.documentoModelo="^[0-9]*$";
    
    this.procesando=false;
  

   }

  ngOnInit() {
  }

  RecuperarClave(contenidoNotificador: any){
    var correoUsuario:string = "";
    var correoAjustado:string = "";
    
    this.procesando=true;

    /*

      AQUI BUSQUEDA DE CORREO ELECTRONICO ASOCIADO

    */

    // Si no hay correo
          this.mensaje = "No se encontro un correo asociado a ese documento"; 


    // Si hay correo

          // AQUI GENERACION DE CODIGO Y ENVIO DE CORREO
          
          // AQUI CONVERCION DE CORREO
          correoAjustado = "sd***bj@asd.com";
          
          this.mensaje = "Se ha enviado un mensaje a '" + correoAjustado + "' con el codigo de confirmación.";    


    const respuesta=this.servicioEmergentes.open(contenidoNotificador, { centered: true });

    respuesta.result.then(
      (result) => { },
      (reason) => { // Se recibe dismiss  
        
        this.procesando=false;
        this.procesoLogeo.paso++;

      }
    );


  }

}
