import { Component, OnInit } from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service'

@Component({
  selector: 'app-personas-agendamiento-principal',
  templateUrl: './personas-agendamiento-principal.component.html',
  styleUrls: ['./personas-agendamiento-principal.component.css']
})
export class PersonasAgendamientoPrincipalComponent implements OnInit {

  constructor(private datosAmbiente: AmbienteService) { }

  ngOnInit() {
  }

}
