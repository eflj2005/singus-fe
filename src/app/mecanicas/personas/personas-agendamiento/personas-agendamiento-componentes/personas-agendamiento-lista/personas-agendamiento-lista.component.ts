import { Component, OnInit , PipeTransform} from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Agendas2Interface } from '@interfaces/agendas2.interface';
import { AgendasController } from '@controladores/agendas2.controller';
import { HttpClient } from '@angular/common/http';
import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { EstructuraConsultas } from '@generales/estructura-consultas';

interface ListaAgendas extends Agendas2Interface{
  nombreCoordinador: string;
  nombreResponsable: string;
}


@Component({
  selector: 'app-personas-agendamiento-lista',
  templateUrl: './personas-agendamiento-lista.component.html',
  styleUrls: ['./personas-agendamiento-lista.component.css'],
  providers: [DecimalPipe]
})
export class PersonasAgendamientoListaComponent implements OnInit {

  controladorAgendas: AgendasController;
  registrosAgendas: ListaAgendas[];
  registrosAgendas$: Observable<ListaAgendas[]>;
  filter = new FormControl('');



  constructor(private pipe: DecimalPipe, private llamadoHttp :HttpClient, private servicioAmbiente: AmbienteService) { 

    this.registrosAgendas = [];
    this.ConsultarAgendas();
    this.AplicarFiltros();

  }

  ConsultarAgendas(){

    let caracteristicas = new EstructuraConsultas();
    caracteristicas.AgregarColumna( "agendas", "id" , null );
    caracteristicas.AgregarColumna( "agendas", "coordinadores_id" , null );
    caracteristicas.AgregarColumna( "agendas", "responsables_id" , null);
    caracteristicas.AgregarColumna( "agendas", "inicial_fecha" , null );
    caracteristicas.AgregarColumna( "agendas", "final_fecha" , null);
    caracteristicas.AgregarColumna( null, "CONCAT( coordinadores.nombres , ' ' , coordinadores.apellidos )" , "nombreCoordinador" );
    caracteristicas.AgregarColumna( null, "CONCAT( responsables.nombres , ' ' , responsables.apellidos )" , "nombreResponsable" );
    caracteristicas.AgregarEnlace( "coordinadores" , "coordinadores" , "agendas" );
    caracteristicas.AgregarEnlace( "responsables" , "responsables" , "agendas" );   
  

    this.controladorAgendas = new AgendasController(this.llamadoHttp,this.servicioAmbiente);
    this.controladorAgendas.CargarDesdeDB(true, "A" , caracteristicas).subscribe(
      (respuesta: RespuestaInterface) =>{
        switch(respuesta.codigo){
          case 200:
            this.registrosAgendas = this.controladorAgendas.todos;
            console.log(this.registrosAgendas);
            this.AplicarFiltros();
            break;
          default:
            alert("Error: "+respuesta.mensaje);
            break;
        }
      }
    );

  }

  buscarAgendas(text: string , pipe: PipeTransform): ListaAgendas[] {
    return this.registrosAgendas.filter(agenda => {
      const term = text.toLowerCase();
      return pipe.transform(agenda.id).includes(term)
          || agenda.final_fecha.toLowerCase().includes(term)
          || agenda.inicial_fecha.toLowerCase().includes(term)
          || agenda.nombreCoordinador.toLowerCase().includes(term)
          || agenda.nombreResponsable.toLowerCase().includes(term);

    });
  }


  ngOnInit() {
  }
  
  verPersona(datos){
    this.servicioAmbiente.agendaModo.modo = datos.modo
  }

  EditarAgenda(datos){
    this.servicioAmbiente.agendaModo.modo = datos.modo
  }
  
  NuevaAgenda(datos){
    this.servicioAmbiente.agendaModo.modo = datos.modo
  }

  AplicarFiltros(){
    this.registrosAgendas$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.buscarAgendas(text, this.pipe))
    )
  }
}
