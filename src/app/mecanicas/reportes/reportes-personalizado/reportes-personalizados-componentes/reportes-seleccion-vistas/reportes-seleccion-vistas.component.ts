import { Component, OnInit } from '@angular/core';

interface Vista {
  id:number;
  titulo: string;
  columnasVista: Columnas[];
}

interface Columnas {
  nombre: string;
  estado: boolean;
}



@Component({
  selector: 'app-seleccion-vistas',
  templateUrl: './reportes-seleccion-vistas.component.html',
  styleUrls: ['./reportes-seleccion-vistas.component.css']
})

export class ReportesSeleccionVistasComponent implements OnInit {


  vistas:Vista[]=[];

  vistasSeleccionadas:Vista[]=[];

  constructor(){};

  ngOnInit() {

    let prueba: Vista[] = [];
    
    let prueba3: Vista;

    prueba3 = {
      "id":3,
      "titulo": "prueba3titulo",
      "columnasVista": [
        { "nombre": "prueba7nombre", "estado": true },
        { "nombre": "prueba8nombre", "estado": false }]
    };

    let prueba1: Vista;

    prueba1 = {
      "id":1,
      "titulo": "prueba1titulo",
      "columnasVista": [
        { "nombre": "prueba1nombre", "estado": true },
        { "nombre": "prueba2nombre", "estado": false }]
    };

    let prueba2: Vista;

    prueba2 = {
      "id":2,
      "titulo": "prueba2titulo",
      "columnasVista": [
        { "nombre": "prueba3nombre", "estado": true },
        { "nombre": "prueba4nombre", "estado": false }]
    };

    prueba.push(prueba1);
    prueba.push(prueba2);
    prueba.push(prueba3);


    this.vistas.push(prueba1);
    this.vistas.push(prueba2);
    this.vistas.push(prueba3);

    console.log(prueba);
    console.log(prueba[0].columnasVista[0].nombre);

    this.vistasSeleccionadas = prueba;
    
  }

}
