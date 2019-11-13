import { HttpClient , HttpHeaders} from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { AmbienteService } from '@app/servicios/ambiente.service';

@Component({
  selector: 'app-inicio-principal',
  templateUrl: './inicio-principal.component.html',
  styleUrls: ['./inicio-principal.component.css']
})
export class InicioPrincipalComponent implements OnInit {
  
 
  
  constructor( 
    private datosAmbiente: AmbienteService,
 //   private http :HttpClient
  ) {
    
    this.ValidarAdministrador();
  }

  ngOnInit() {

  }

  ValidarAdministrador(){

   // let respuesta = this.http.get(this.ruta+'validar.php?accion=consultarParentescos' )

    /*

      AQUI VA EL LLAMADO PARA IDENTIFICAR SI HAY ADMINISTRADOR O NO


    */

  }

}
