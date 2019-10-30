import { Component, OnInit } from '@angular/core';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-regitro-administrador',
  templateUrl: './regitro-administrador.component.html',
  styleUrls: ['./regitro-administrador.component.css']
})
export class RegitroAdministradorComponent implements OnInit {

  id:string= null;
  nombres:string= null;
  apellidos:string= null;

  procesando:boolean=null;

  constructor() {
    this.id="";
    this.nombres="";
    this.apellidos="";

    this.procesando=false;
  }

  ngOnInit() {
  }

  RegistrarAdministrador(){
    this.procesando=true;

    //this.modalService.open(content, { centered: true });
  }


}
