import { Component, OnInit } from '@angular/core';
import { ProcesoLogeoService }     from './../proceso-logeo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
 
  
  constructor( private procesoLogeo: ProcesoLogeoService ) {
    
    this.ValidarAdministrador();
  }

  ngOnInit() {

  }

  ValidarAdministrador(){
    /*

      AQUI VA EL LLAMADO PARA IDENTIFICAR SI HAY ADMINISTRADOR O NO


    */

    //estos valores son para pruebas
    this.procesoLogeo.modo=2;
    this.procesoLogeo.paso=1;

  }

}
