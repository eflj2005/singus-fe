import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-maestras-detalle',
  templateUrl: './maestras-detalle.component.html',
  styleUrls: ['./maestras-detalle.component.css']
})
export class MaestrasDetalleComponent implements OnInit {

  @Input() nombreTabla:string;
  constructor() { }

  ngOnInit() {
  }

 


}
