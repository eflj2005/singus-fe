import { Component, OnInit } from '@angular/core';

import { UsuariosService } from '@servicios/usuarios.service'

@Component({
  selector: 'app-inicio-validar-codigo',
  templateUrl: './inicio-validar-codigo.component.html',
  styleUrls: ['./inicio-validar-codigo.component.css']
})
export class InicioValidarCodigoComponent implements OnInit {

  codigo:number=null;
  codigoModelo:string=null;
  codigoError:string=null;

  procesando:boolean=null;



  constructor(private procesoLogeo: UsuariosService) {
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
