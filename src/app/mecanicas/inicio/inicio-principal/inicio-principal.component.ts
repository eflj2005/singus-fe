
import { Component, OnInit } from '@angular/core';

import { AmbienteService } from '@app/servicios/ambiente.service';
import { AutenticacionService } from '@app/servicios/autenticacion.service';



@Component({
  selector: 'app-inicio-principal',
  templateUrl: './inicio-principal.component.html',
  styleUrls: ['./inicio-principal.component.css']
})
export class InicioPrincipalComponent implements OnInit {

  
  constructor( 
    private auntenticador: AutenticacionService,
    private datosAmbiente: AmbienteService
  ) { }

  ngOnInit() {
    this.auntenticador.ValidarAdministrador();
  }

}
