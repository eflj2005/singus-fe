import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { VistasController } from '@controladores/vistas.controller';
import { AmbienteService } from '@servicios/ambiente.service';


@Component({
  selector: 'app-seleccion-vistas',
  templateUrl: './reportes-seleccion-vistas.component.html',
  styleUrls: ['./reportes-seleccion-vistas.component.css']
})


export class ReportesSeleccionVistasComponent implements OnInit {

  registros:any[];

  vistasSeleccionadas:VistaInterface[]=[];

  controladorVistas:VistasController;

  constructor(private llamadoHttp :HttpClient, private servicioAmbiente :AmbienteService){

    this.controladorVistas = new VistasController(llamadoHttp,servicioAmbiente);
  };

  ngOnInit() {
    
  }

  cambiarSeleccionColumna(titulovista:string, campo:string){
    console.log(titulovista + "-" + campo)
    this.controladorVistas.vistas.forEach(vista => {
      if (vista.titulo == titulovista) {
        vista.columnasVista.forEach(campos => {
          if(campos.nombre == campo){
            console.log(campos.estado);
            (campos.estado)?campos.estado=false : campos.estado=true;
            console.log(campos.estado);
          }
        });
      }
    });
  }

}
