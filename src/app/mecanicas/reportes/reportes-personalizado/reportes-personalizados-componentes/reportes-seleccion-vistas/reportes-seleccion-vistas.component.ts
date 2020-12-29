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

  vistasSeleccionadas:VistaInterface[] = [];

  controladorVistas:VistasController;

  constructor(private llamadoHttp :HttpClient, private servicioAmbiente :AmbienteService){

    this.controladorVistas = new VistasController(llamadoHttp,servicioAmbiente);
  };

  ngOnInit() {
    
  }

  cambiarSeleccionColumna(tituloVista:string, campo:string){
    this.controladorVistas.vistas.forEach(vista => {
      if (vista.titulo == tituloVista) {
        vista.columnasVista.forEach(campos => {
          if(campos.nombre == campo){
            (campos.estado)?campos.estado = false : campos.estado = true;
          }
        });
      }
    });
  }

  cambiarEstadoVista(tituloVista:string){
    this.controladorVistas.vistas.forEach(vista => {
      if (vista.titulo == tituloVista) {
        if(vista.seleccionada){
          vista.seleccionada = false;
          for (let i = 0; i < this.vistasSeleccionadas.length; i++) {
           if (this.vistasSeleccionadas[i].titulo == tituloVista) {
             this.vistasSeleccionadas.splice(i,1);
           }
          }
        }
        else{
          vista.seleccionada = true;
          this.vistasSeleccionadas.push(this.controladorVistas.EncontrarVista(tituloVista));
        }
      }
    });

  }


  EstoyListo(){
    let validador:boolean = false;
    validador =  this.controladorVistas.EstanlistasVitas();
    return validador;
  }

}
