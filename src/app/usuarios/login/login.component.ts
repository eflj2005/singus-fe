import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /*
  Modo de inicio
    1 = Login normal
    2 = Nuevo Administrador
  */
  modo:number=null;

  constructor(
    private rutas: Router,
    private rutaActiva: ActivatedRoute
  ) {
    
    this.ValidarAdministrador();
  }

  ngOnInit() {
    this.rutas.navigate( ['inicio_sesion/'], { relativeTo: this.rutaActiva, queryParams: { modo: this.modo },  skipLocationChange: true } );
  }

  ValidarAdministrador(){
    this.modo=2;
  }

}
