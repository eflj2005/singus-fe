import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:string= null;
  clave:string= null;

      /*
      Modo de inicio
        1 = Login normal
        2 = Nuevo Administrador
        */
  modo:number=null;

  procesando:boolean=null;

  constructor() {
    this.usuario="";
    this.clave="";
    this.procesando=false;

    this.ValidarAdministrador();
  }

  ngOnInit() {
  }

  ValidarAdministrador(){
    this.modo = 1;
  }

  ValidarLogin(){
    alert("envio formulario Login");
    this.procesando=true;
    
  }

  ActivarRegitroAdministrador(){
    alert("Activar Nuevo Administrador");
    
  }  
}
