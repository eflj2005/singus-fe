import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cambio-clave',
  templateUrl: './cambio-clave.component.html',
  styleUrls: ['./cambio-clave.component.css']
})
export class CambioClaveComponent implements OnInit {
  
  claveActual:string= null;
  claveNueva:string= null;
  claveConfirmada:string= null;

  claveModelo:string=null;
  claveError:string=null;
  
  procesando:boolean=null;

  constructor() { 
    this.claveModelo="(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,}";
    this.procesando=false;
  }

  ngOnInit() {
  }

}
//[A-Z0-9]{3}-[A-Z0-9]{3}
//(?=^.{8,}$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?!.*\s).*$
