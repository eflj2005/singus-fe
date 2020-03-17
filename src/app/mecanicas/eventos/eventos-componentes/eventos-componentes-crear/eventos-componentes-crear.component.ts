import { Component, OnInit } from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service';
import { EventoInterface } from '@interfaces/eventos.interface';
import { EventosController } from "@controladores/eventos.controller";
import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eventos-componentes-crear',
  templateUrl: './eventos-componentes-crear.component.html',
  styleUrls: ['./eventos-componentes-crear.component.css']
})

export class EventosComponentesCrearComponent implements OnInit {

  titulo:string;
  controladorEventos: EventosController;
  datos: EventoInterface;
  today: Date ;  
  img: any;

  constructor(private servicioAmbiente : AmbienteService, private llamadoHttp : HttpClient) {
    if(this.servicioAmbiente.eventosModo.modo == 1) this.titulo="Crear Evento";
    else this.titulo="Modificar Evento";
    //
    this.today = new Date();

    this.controladorEventos= new EventosController(this.llamadoHttp,this.servicioAmbiente);
   }

  ngOnInit() {
    this.datos = this.servicioAmbiente.eventosModo.datos;
    console.log(this.servicioAmbiente.eventosModo.datos);
  }

  Atras(){
    this.servicioAmbiente.eventosModo.modo = 0 ;
    this.servicioAmbiente.eventosModo.datos = null;
  }

  Procesar(){


    console.log(this.img);
    console.log(this.datos);
    console.log(this.controladorEventos.registros);
    if(this.servicioAmbiente.eventosModo.modo == 1){
      this.datos.creacion_fecha =  this.today.getFullYear() + "-" + (this.today.getMonth()  + 1) + "-" + this.today.getDate();
      console.log(this.datos);
      this.controladorEventos.Agregar(this.datos);
    } 
    else this.controladorEventos.Modificar(this.datos) ;


    this.controladorEventos.Guardar().subscribe(
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
