import { Component, OnInit, Input} from '@angular/core';
import { AgendamientosInterface } from '@interfaces/agendamientos.interface';
import { AmbienteService } from '@servicios/ambiente.service';
import { HttpClient } from '@angular/common/http';
import { AutenticacionService } from '@servicios/autenticacion.service';
import { AgendasController } from '@controladores/agendas.controller';

interface DatosIntercambioInterface{
  [index: string]: any;
}

@Component({
  selector: 'app-personas-subagendamiento-componentes-lista',
  templateUrl: './personas-subagendamiento-componentes-lista.component.html',
  styleUrls: ['./personas-subagendamiento-componentes-lista.component.css']
})
export class PersonasSubagendamientoComponentesListaComponent implements OnInit {

  @Input() controladorAgendas:AgendasController;
  @Input() agendamientos:AgendamientosInterface[];
  @Input() datosAgenda:DatosIntercambioInterface;
  
  usuario_id:number;

  constructor(
    private servicioAmbiente : AmbienteService,
    private llamadoHttp : HttpClient,    
    private autenticador: AutenticacionService,
  ) { 
    this.usuario_id = this.autenticador.UsuarioActualValor.id;

  }

  ngOnInit() {

  }

  EliminarAgenda( agenda_id: number ){
    if(this.agendamientos.length != 0 ){
      alert("La agenda a descartar debe estar vacia");
    }
    else{
      this.controladorAgendas.Encontrar("id",agenda_id );
      console.log(this.controladorAgendas.actual);
    }

  }

}