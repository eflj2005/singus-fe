import { Component, OnInit } from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service'

@Component({
  selector: 'app-personas-subagendamiento-principal',
  templateUrl: './personas-subagendamiento-principal.component.html',
  styleUrls: ['./personas-subagendamiento-principal.component.css']
})
export class PersonasSubagendamientoPrincipalComponent implements OnInit {

  constructor(private datosAmbiente: AmbienteService) { }

  ngOnInit() {
  }

}
