import { Component, OnInit } from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service';
import { Router } from '@angular/router';


@Component({
  selector: 'personas-actualizacion-informacion',
  templateUrl: './personas-actualizacion-informacion.component.html',
  styleUrls: ['./personas-actualizacion-informacion.component.css']
})
export class PersonasActualizacionInformacionComponent implements OnInit {
  opcion: any = { nombreOpcion:"Datos personales", tipo:"1" } ;
habilitado: any;
descripcionProyecto : any ="BICIBAGUÉ: Iniciativa que busca incentivar la práctica del tursimo en bicicleta, el desarrollo social y la tecnología";
descripcionPrograma : any ="BICIBAGUÉ: Iniciativa que busca incentivar la práctica del tursimo en bicicleta, el desarrollo social y la tecnología";
  constructor(private datosAmbiente : AmbienteService,private router: Router) {
    this.habilitado = "disabled";
   }

  ngOnInit() {

  }
  Cancelar(){
    this.datosAmbiente.actualizacionModo.modo = 1
  }

  cambiarOpcion(tipo){
    if (tipo == 1) {
      this.opcion.nombreOpcion = "Datos personales";
      this.opcion.tipo= tipo;
    }else if(tipo == 2){
      this.opcion.nombreOpcion = "Estudios";
      this.opcion.tipo= tipo;
    }else{
      this.opcion.nombreOpcion = "Empleo";
      this.opcion.tipo= tipo;
    }

  }
  Actualizar(){
    this.router.navigateByUrl("/agendamiento");
  }
}
