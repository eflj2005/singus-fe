import { Component, OnInit } from '@angular/core';
import { UsuariosService }     from './../usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
 
  
  constructor( private procesoLogeo: UsuariosService ) {
    
    this.ValidarAdministrador();
  }

  ngOnInit() {

  }

  ValidarAdministrador(){
    /*

      AQUI VA EL LLAMADO PARA IDENTIFICAR SI HAY ADMINISTRADOR O NO


    */

  }

}
