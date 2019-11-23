import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-administracion-maestras-detalle',
  templateUrl: './administracion-maestras-detalle.component.html',
  styleUrls: ['./administracion-maestras-detalle.component.css']
})
export class AdministracionMaestrasDetalleComponent implements OnInit {
  opcion: any = { nombreOpcion:"Ciudades", tipo:"1" } ;

  constructor() { }

  ngOnInit() {
  }

  cambiarOpcion(tipo){

    switch (tipo) {
      case 1:
        this.opcion.nombreOpcion = "Ciudades";
        this.opcion.tipo= tipo;
        break;
      case 2:
          this.opcion.nombreOpcion = "Titulos";
          this.opcion.tipo= tipo;
        break;
      case 3:
          this.opcion.nombreOpcion = "Programas";
          this.opcion.tipo= tipo;
        break;
      case 4:
          this.opcion.nombreOpcion = "Documentos";
          this.opcion.tipo= tipo;
        break;
      case 5:
          this.opcion.nombreOpcion = "Cedes";
          this.opcion.tipo= tipo;
        break;
      case 6:
          this.opcion.nombreOpcion = "Cohortes";
          this.opcion.tipo= tipo;
        break;
      case 7:
          this.opcion.nombreOpcion = "Areas";
          this.opcion.tipo= tipo;
        break;

      default:
          this.opcion.nombreOpcion = "Ciudades";
          this.opcion.tipo= tipo;
        break;
    }


  }

}
