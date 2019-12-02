import { Component, OnInit } from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service'

@Component({
  selector: 'app-eventos-principal',
  templateUrl: './eventos-principal.component.html',
  styleUrls: ['./eventos-principal.component.css']
})
export class EventosPrincipalComponent implements OnInit {

  constructor(private datosAmbiente: AmbienteService) { 

  }

  ngOnInit() {
  }

}
