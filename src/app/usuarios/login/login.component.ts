import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  modo:number=null;   //Modo de inicio =>  1 = Login normal, 2 = Nuevo Administrador
  
  constructor( private rutas: Router, private rutaActiva: ActivatedRoute) {
    
    this.ValidarAdministrador();
  }

  ngOnInit() {
    this.rutas.navigate( ['inicio_sesion/'], { relativeTo: this.rutaActiva, queryParams: { modo: this.modo },  skipLocationChange: true } );
  }

  ValidarAdministrador(){
    /*

      AQUI VA EL LLAMADO PARA IDENTIFICAR SI HAY ADMINISTRADOR O NO


    */

    this.modo=2;    //este valor es para pruebas

  }

}
