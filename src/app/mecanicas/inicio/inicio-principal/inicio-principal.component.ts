
import { Component, OnInit } from '@angular/core';

import { AmbienteService } from '@servicios/ambiente.service';
import { AutenticacionService } from '@servicios/autenticacion.service';



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
