import { Component, OnInit } from '@angular/core';

import { ProcesoLogeoService }     from './../proceso-logeo.service';

@Component({
  selector: 'app-validar-codigo',
  templateUrl: './validar-codigo.component.html',
  styleUrls: ['./validar-codigo.component.css']
})
export class ValidarCodigoComponent implements OnInit {

  codigo:number=null;
  codigoModelo:string=null;
  codigoError:string=null;

  procesando:boolean=null;



  constructor(private procesoLogeo: ProcesoLogeoService) {
    this.codigoModelo="[A-Z0-9]{3}-[A-Z0-9]{3}";
    
    this.procesando=false;
   }

  ngOnInit() {
  }

  ValidarCodigo(){
    this.procesando=true;

    /*


    AQUI SE PROCESA EL CODIGO


    */

    //en caso de error
    //this.codigoError = "El codigo digitado no coincide con el enviado"
    
    //en caso de OK
    this.procesoLogeo.paso++;
    this.procesando=false;

  }
}
