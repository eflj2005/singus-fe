import { Component, OnInit } from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service';


@Component({
  selector: 'personas-actualizacion-informacion',
  templateUrl: './personas-actualizacion-informacion.component.html',
  styleUrls: ['./personas-actualizacion-informacion.component.css']
})
export class PersonasActualizacionInformacionComponent implements OnInit {
habilitado: any;
descripcionProyecto : any ="BICIBAGUÉ: Iniciativa que busca incentivar la práctica del tursimo en bicicleta, el desarrollo social y la tecnología";
descripcionPrograma : any ="BICIBAGUÉ: Iniciativa que busca incentivar la práctica del tursimo en bicicleta, el desarrollo social y la tecnología";
  constructor(private datosAmbiente : AmbienteService) {
    this.habilitado = "disabled";
   }

  ngOnInit() {

  }
  Cancelar(){
    this.datosAmbiente.actualizacionModo.modo = 1
}
}
