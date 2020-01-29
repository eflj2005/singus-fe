import { Component, OnInit } from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service'
import { HttpClient } from '@angular/common/http';



import { AreasController } from '@controladores/areas.controller';


import { UsuariosController } from '@controladores/usuarios.controller';
import { MunicipiosController } from '@controladores/municipios.controller';


@Component({
  selector: 'app-maestras-principal',
  templateUrl: './maestras-principal.component.html',
  styleUrls: ['./maestras-principal.component.css']
})
export class MaestrasPrincipalComponent implements OnInit {

  controladorAreas: AreasController;
  controladorMunicipios: MunicipiosController;
  
  controladorUsuarios:UsuariosController;

  constructor(
    private llamadoHttp: HttpClient,
    private servicioAmbiente: AmbienteService,
  ) { 
    this.controladorAreas = new AreasController(llamadoHttp,servicioAmbiente);
    this.controladorMunicipios = new MunicipiosController(llamadoHttp, servicioAmbiente);

    this.controladorUsuarios = new UsuariosController(llamadoHttp,servicioAmbiente);    

  }

  ngOnInit() {
  }

}
