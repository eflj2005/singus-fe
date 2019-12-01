import { Component, OnInit } from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service'

@Component({
  selector: 'app-maestras-principal',
  templateUrl: './maestras-principal.component.html',
  styleUrls: ['./maestras-principal.component.css']
})
export class MaestrasPrincipalComponent implements OnInit {

  constructor(private datosAmbiente: AmbienteService) { }

  ngOnInit() {
  }

}
