
import { Component, OnInit } from '@angular/core';

import { UsuariosController } from '@app/modelos/usuarios.controller';
import { AmbienteService } from '@app/servicios/ambiente.service';


@Component({
  selector: 'app-inicio-principal',
  templateUrl: './inicio-principal.component.html',
  styleUrls: ['./inicio-principal.component.css']
})
export class InicioPrincipalComponent implements OnInit {

  
  constructor( 
    private controladorUsuarios: UsuariosController,
    private datosAmbiente: AmbienteService
  ) { }

  ngOnInit() {
    this.controladorUsuarios.ValidarAdministrador();
  }

}
