import { Component, OnInit } from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service'
import { HttpClient } from '@angular/common/http';

import { CiudadesController } from '@controladores/ciudades.controller';
import { TiposdocumentosController } from '@controladores/tiposdocumentos.controller';
import { AreasController } from '@controladores/areas.controller';


import { UsuariosController } from '@controladores/usuarios.controller';


@Component({
  selector: 'app-maestras-principal',
  templateUrl: './maestras-principal.component.html',
  styleUrls: ['./maestras-principal.component.css']
})
export class MaestrasPrincipalComponent implements OnInit {

  controladorAreas: AreasController;
  controladorCiudades: CiudadesController;
  
  controladorUsuarios:UsuariosController;

  constructor(
    private datosAmbiente: AmbienteService,
    private llamadoHttp: HttpClient,
    private servicioAmbiente: AmbienteService,
  ) { 
    this.controladorAreas = new AreasController(llamadoHttp,servicioAmbiente);
    this.controladorCiudades = new CiudadesController(llamadoHttp,servicioAmbiente);    

    this.controladorUsuarios = new UsuariosController(llamadoHttp,servicioAmbiente);    

  }

  ngOnInit() {
  }

}
