import { Component, OnInit } from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service'

@Component({
  selector: 'app-personas-actualizacion-principal',
  templateUrl: './personas-actualizacion-principal.component.html',
  styleUrls: ['./personas-actualizacion-principal.component.css']
})
export class PersonasActualizacionPrincipalComponent implements OnInit {


  constructor(private servicioAmbiente: AmbienteService) { 

  }


  ngOnInit() {
  }

}
