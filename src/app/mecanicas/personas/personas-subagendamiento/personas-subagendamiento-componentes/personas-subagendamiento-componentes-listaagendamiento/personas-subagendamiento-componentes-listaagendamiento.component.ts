import { Component, OnInit, Input} from '@angular/core';
import { AgendamientosInterface } from '@interfaces/agendamientos.interface';

@Component({
  selector: 'app-personas-subagendamiento-componentes-listaagendamiento',
  templateUrl: './personas-subagendamiento-componentes-listaagendamiento.component.html',
  styleUrls: ['./personas-subagendamiento-componentes-listaagendamiento.component.css']
})
export class PersonasSubagendamientoComponentesListaagendamientoComponent implements OnInit {

  @Input() agendamientos:AgendamientosInterface[];
  
  constructor() { }

  ngOnInit() {

  }

}
