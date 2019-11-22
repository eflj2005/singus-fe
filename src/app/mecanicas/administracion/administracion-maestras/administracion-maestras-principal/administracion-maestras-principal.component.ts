import { Component, OnInit } from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service'

@Component({
  selector: 'app-administracion-maestras-principal',
  templateUrl: './administracion-maestras-principal.component.html',
  styleUrls: ['./administracion-maestras-principal.component.css']
})
export class AdministracionMaestrasPrincipalComponent implements OnInit {

  constructor(private datosAmbiente: AmbienteService) { }

  ngOnInit() {
  }

}
