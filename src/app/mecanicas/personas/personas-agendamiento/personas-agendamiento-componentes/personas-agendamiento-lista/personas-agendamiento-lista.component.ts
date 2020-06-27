import { Component, OnInit , PipeTransform} from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AgendasInterface } from '@interfaces/agendas.interface';
import { AgendasController } from '@controladores/agendas.controller';
import { HttpClient } from '@angular/common/http';
import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { EstructuraConsultas } from '@generales/estructura-consultas';

interface ListaAgendas extends AgendasInterface{
  nombreCompletoUsuario? : string,
  tipo?:string,
  nombreResponsable?: string,
  nombreCoordinador?: string
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
    caracteristicas.AgregarColumna( "agendas", "apertura_fecha" , null );
    caracteristicas.AgregarColumna( "agendas", "cierre_fecha" , null);
    caracteristicas.AgregarColumna( "asignaciones", "tipo" , null );
    caracteristicas.AgregarColumna( null," CONCAT(usuarios.nombres , ' ' , usuarios.apellidos) ", "nombreCompletoUsuario" );
    caracteristicas.AgregarEnlace( "asignaciones" , "agendas" , "asignaciones" );
    caracteristicas.AgregarEnlace( "usuarios" , "usuarios" , "asignaciones" );  
    caracteristicas.AgregarFiltro( "","agendas" , "nivel" , "=", "0" ); 

    this.controladorAgendas = new AgendasController(this.llamadoHttp,this.servicioAmbiente);
    this.controladorAgendas.CargarDesdeDB(true, "A" , caracteristicas).subscribe(

      (respuesta: RespuestaInterface) =>{
        switch(respuesta.codigo){
          case 200:
            console.log(this.controladorAgendas.todos);
            this.Organizador(this.controladorAgendas.todos)
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
          || agenda.cierre_fecha.toLowerCase().includes(term)
          || agenda.apertura_fecha.toLowerCase().includes(term)
          || agenda.nombreCoordinador.toLowerCase().includes(term)
          || agenda.nombreResponsable.toLowerCase().includes(term) ;

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
  

  Organizador( datos : ListaAgendas[] ){
    console.log('aqui');
    let encontrado: number;
    for (let i = 0; i < datos.length; i++) {
      encontrado = this.registrosAgendas.findIndex(agenda => agenda.id == datos[i].id );
      if (!(encontrado == -1)){
        if( datos[i].tipo == 'C' ){
          this.registrosAgendas[encontrado].nombreCoordinador = datos[i].nombreCompletoUsuario;
        }else{
          this.registrosAgendas[encontrado].nombreResponsable = datos[i].nombreCompletoUsuario;
        }
      }else{
        if( datos[i].tipo == 'C' ){
          this.registrosAgendas.push({'id': datos[i].id, 'apertura_fecha': datos[i].apertura_fecha, 'cierre_fecha':datos[i].cierre_fecha, 'nombreCoordinador': datos[i].nombreCompletoUsuario,'nivel': datos[i].nivel});
        }else{
          this.registrosAgendas.push({'id': datos[i].id, 'apertura_fecha': datos[i].apertura_fecha, 'cierre_fecha':datos[i].cierre_fecha, 'nombreResponsable': datos[i].nombreCompletoUsuario,'nivel': datos[i].nivel});
        }
      }
    }
  }
}
