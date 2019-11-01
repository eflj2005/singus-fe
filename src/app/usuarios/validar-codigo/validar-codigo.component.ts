import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validar-codigo',
  templateUrl: './validar-codigo.component.html',
  styleUrls: ['./validar-codigo.component.css']
})
export class ValidarCodigoComponent implements OnInit {

  procesando:boolean=null;

  codigoModelo:string=null;

  constructor() {
    this.codigoModelo="[A-Z0-9]{3}-[A-Z0-9]{3}";
    this.procesando=false;
   }

  ngOnInit() {
  }

  ValidarCodigo(){
    this.procesando=true;
  }
}
