import { Component, OnInit } from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service';
import { EventoInterface } from '@interfaces/eventos.interface';
import { EventosController } from "@controladores/eventos.controller";
import { RespuestaInterface } from '@interfaces/respuesta.interface';

@Component({
  selector: 'app-eventos-componentes-crear',
  templateUrl: './eventos-componentes-crear.component.html',
  styleUrls: ['./eventos-componentes-crear.component.css']
})

export class EventosComponentesCrearComponent implements OnInit {

  controladorEvento: EventosController;
  datos: EventoInterface;

  constructor(private servicioAmbiente : AmbienteService) {
    
   }

  ngOnInit() {
    this.datos = this.servicioAmbiente.eventosModo.datos;
  }

  atras(){
    this.servicioAmbiente.eventosModo.modo = 0 ;
    this.servicioAmbiente.eventosModo.datos = null;
  }

  procesar(){

    console.log(this.datos);
    if(this.servicioAmbiente.eventosModo.modo == 1) this.controladorEvento.Agregar(this.datos);
    else this.controladorEvento.Modificar(this.datos) ;


    this.controladorEvento.Guardar().subscribe(
      (notificacion:RespuestaInterface) => {
        switch (notificacion.codigo){
          case 200:         //login ok         

            alert("GUARDADO");
 
          break;
          case 400:         //autenticación erronea / Usuario Bloqueado / Usuario Inactivo
            alert(notificacion.asunto + ": " + notificacion.mensaje);
          break;
        }
      }
    );  
  }

}
