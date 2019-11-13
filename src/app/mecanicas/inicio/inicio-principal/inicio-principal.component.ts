import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '@servicios/usuarios.service';

@Component({
  selector: 'app-inicio-principal',
  templateUrl: './inicio-principal.component.html',
  styleUrls: ['./inicio-principal.component.css']
})
export class InicioPrincipalComponent implements OnInit {
  
 
  
  constructor( 
    private procesoLogeo: UsuariosService
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
