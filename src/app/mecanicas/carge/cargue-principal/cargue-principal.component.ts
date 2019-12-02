import { Component, OnInit } from '@angular/core';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cargue-principal',
  templateUrl: './cargue-principal.component.html',
  styleUrls: ['./cargue-principal.component.css']
})
export class CarguePrincipalComponent implements OnInit {

  tipoCargue: any =  { tipo:"1",nombre :"Pre  graduados"}
  estado: any =  { paso:"", porcentaje :""};  

  constructor( config: NgbProgressbarConfig) { 

    config.max = 100;
    config.striped = true;
    config.animated = true;
    config.type = 'info';
    config.height = '20px';

  }

  ngOnInit() {
    this.estado.paso = "1" ;
    this.estado.porcentaje = "25" ;

  }

  cambioPaso(paso){
    switch (paso) {
      case 2:
          this.estado.paso= "2"
          this.estado.porcentaje = "50" ;
        break;
      case 3:
          this.estado.paso= "3"
          this.estado.porcentaje = "75" ;
        break;
      case 4:
          this.estado.paso= "4"
          this.estado.porcentaje = "100" ;
        break;
    
      default:
          this.estado.paso= "2"
          this.estado.porcentaje = "40" ;
        break;
    }
  
  }

}
