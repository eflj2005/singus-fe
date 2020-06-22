import { Component, OnInit } from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service'
import { AgendasInterface } from '@interfaces/agendas.interface';

interface AgendasCompletoInterface extends AgendasInterface  {
  creador: string;
  asignados: number;
}


@Component({
  selector: 'app-personas-subagendamiento-principal',
  templateUrl: './personas-subagendamiento-principal.component.html',
  styleUrls: ['./personas-subagendamiento-principal.component.css']
})
export class PersonasSubagendamientoPrincipalComponent implements OnInit {

  listaAgendas: AgendasCompletoInterface[] = [];

  constructor(private datosAmbiente: AmbienteService) { 
    // this.listaAgendas.push( { id: 1, agendas_id: null, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 0, asignados: 10, creador: "Pepito Flores" } );      //10
    //   this.listaAgendas.push( { id: 2, agendas_id: 1, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 1, asignados: 5, creador: "Perencejto Rivas" } );    //5
    //     this.listaAgendas.push( { id: 4, agendas_id: 2, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 2, creador: "Sultanita Rojas" } );     //2
    //     this.listaAgendas.push( { id: 5, agendas_id: 2, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 2, creador: "Sultanita Rojas" } );     //2
    //     this.listaAgendas.push( { id: 6, agendas_id: 2, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 1, creador: "Sultanita Rojas" } );     //1
    //   this.listaAgendas.push( { id: 3, agendas_id: 1, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 1, asignados: 5, creador: "Perencejto Rivas" } );    //5
    //     this.listaAgendas.push( { id: 7, agendas_id: 3, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 3, creador: "Fabio Torres" } );        //3
    //     this.listaAgendas.push( { id: 8, agendas_id: 3, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 2, creador: "Fabio Torres" } );        //2

      this.listaAgendas.push( { id: 1, agendas_id: null, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 0, asignados: 10, creador: "Pepito Flores Primero" } );
      this.listaAgendas.push( { id: 2, agendas_id: 1, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 1, asignados: 5, creador: "Perencejto Rivas Segundo" } );
      this.listaAgendas.push( { id: 3, agendas_id: 1, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 1, asignados: 5, creador: "Perencejto Rivas Segundo" } );
      this.listaAgendas.push( { id: 4, agendas_id: 2, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 2, creador: "Sultanita Rojas Tercera" } );
      this.listaAgendas.push( { id: 5, agendas_id: 2, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 2, creador: "Sultanita Roja Tercera" } );
      this.listaAgendas.push( { id: 6, agendas_id: 2, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 1, creador: "Sultanita Rojas Tercera" } );
      this.listaAgendas.push( { id: 7, agendas_id: 3, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 3, creador: "Fabio Torres Cuarto" } );
      this.listaAgendas.push( { id: 8, agendas_id: 3, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 2, creador: "Fabio Torres Cuarto" } );

  }

  agendaSeleccionada:number;

  ngOnInit() {
    this.agendaSeleccionada = 2;
    console.log(this.agendaSeleccionada);
  }

}
