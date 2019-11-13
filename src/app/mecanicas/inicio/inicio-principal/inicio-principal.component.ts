import { Component, OnInit } from '@angular/core';
import { AmbienteService } from '@app/servicios/ambiente.service';

@Component({
  selector: 'app-inicio-principal',
  templateUrl: './inicio-principal.component.html',
  styleUrls: ['./inicio-principal.component.css']
})
export class InicioPrincipalComponent implements OnInit {
  
 
  
  constructor( 
    private datosAmbiente: AmbienteService
  ) {
    
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
