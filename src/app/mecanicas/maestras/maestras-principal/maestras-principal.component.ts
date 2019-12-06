import { Component, OnInit } from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service'
import { AreasController } from '@app/modelos/controladores/areas.controller';
import { HttpClient } from '@angular/common/http';
import { CiudadesController } from '@app/modelos/controladores/ciudades.controller2';
import { UsuariosController } from '@app/modelos/controladores/usuarios.controller';

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
