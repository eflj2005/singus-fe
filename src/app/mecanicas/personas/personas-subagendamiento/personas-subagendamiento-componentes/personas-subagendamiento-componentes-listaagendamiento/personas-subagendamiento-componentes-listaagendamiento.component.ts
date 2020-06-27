import { Component, OnInit, Input} from '@angular/core';
import { AgendamientosInterface } from '@interfaces/agendamientos.interface';
import { AmbienteService } from '@servicios/ambiente.service';
import { HttpClient } from '@angular/common/http';
import { AutenticacionService } from '@servicios/autenticacion.service';

interface DatosIntercambioInterface{
  [index: string]: any;
}

@Component({
  selector: 'app-personas-subagendamiento-componentes-listaagendamiento',
  templateUrl: './personas-subagendamiento-componentes-listaagendamiento.component.html',
  styleUrls: ['./personas-subagendamiento-componentes-listaagendamiento.component.css']
})
export class PersonasSubagendamientoComponentesListaagendamientoComponent implements OnInit {

  @Input() agendamientos:AgendamientosInterface[];
  @Input() datosAgenda:DatosIntercambioInterface;
  
  usuarioId:number;

  constructor(
    private servicioAmbiente : AmbienteService,
    private llamadoHttp : HttpClient,    
    private autenticador: AutenticacionService,
  ) { 
    this.usuarioId = this.autenticador.UsuarioActualValor.id;

  }

  ngOnInit() {

  }

}
