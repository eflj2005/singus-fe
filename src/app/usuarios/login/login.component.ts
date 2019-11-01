import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  modo:number=null;   //Modo de inicio =>  1 = Login normal, 2 = Nuevo Administrador
  
  constructor( ) {
    
    this.ValidarAdministrador();
  }

  ngOnInit() {
  }

  ValidarAdministrador(){
    /*

      AQUI VA EL LLAMADO PARA IDENTIFICAR SI HAY ADMINISTRADOR O NO


    */

    this.modo=2;    //este valor es para pruebas

  }

}
