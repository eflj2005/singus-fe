import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personas-actualizacion-principal',
  templateUrl: './personas-actualizacion-principal.component.html',
  styleUrls: ['./personas-actualizacion-principal.component.css']
})
export class PersonasActualizacionPrincipalComponent implements OnInit {
modo: any;
  constructor() { 
    this.modo =1;
  }

  ngOnInit() {
  }

}
