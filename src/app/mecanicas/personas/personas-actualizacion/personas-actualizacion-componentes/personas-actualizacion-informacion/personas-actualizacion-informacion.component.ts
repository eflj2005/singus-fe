import { Component, OnInit, Renderer2 , ElementRef, ViewChild} from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Trabajo {
  name: string;
  flag: string;
  area: number;
  population: number;
}



@Component({
  selector: 'personas-actualizacion-informacion',
  templateUrl: './personas-actualizacion-informacion.component.html',
  styleUrls: ['./personas-actualizacion-informacion.component.css']
})
export class PersonasActualizacionInformacionComponent implements OnInit {

  tipoInformacion : number ;
  opcion: any = { nombreOpcion:"Datos personales", tipo:"1" } ;
habilitado: any;
descripcionProyecto : any ="BICIBAGUÉ: Iniciativa que busca incentivar la práctica del tursimo en bicicleta, el desarrollo social y la tecnología";
descripcionPrograma : any ="BICIBAGUÉ: Iniciativa que busca incentivar la práctica del tursimo en bicicleta, el desarrollo social y la tecnología";
  constructor(private datosAmbiente : AmbienteService,private router: Router, private modal: NgbModal, private render: Renderer2,private el: ElementRef ) {
    this.habilitado = "disabled";
   }

  ngOnInit() {

  }
  Cancelar(){
    this.datosAmbiente.actualizacionModo.modo = 1
  }

  cambiarOpcion(tipo){

    switch (tipo) {
      case 1:
          this.opcion.nombreOpcion = "Datos personales";
          this.opcion.tipo= tipo;
        break;
      case 2:
          this.opcion.nombreOpcion = "Estudios";
          this.opcion.tipo= tipo;
        break;
      case 3:
          this.opcion.nombreOpcion = "Empleo";
          this.opcion.tipo= tipo;
        break;
      case 4:
          this.opcion.nombreOpcion = "Reconocimientos";
          this.opcion.tipo= tipo;
        break;
      case 5:
          this.opcion.nombreOpcion = "Datos historicos";
          this.opcion.tipo= tipo;
        break;      
    
      default:
        break;
    }

  }
  Actualizar(){
    this.router.navigateByUrl("/agendamiento");
  }

  agregarInfo(agregador, tipoInfo)
  {
  
    this.tipoInformacion = tipoInfo;

    if(tipoInfo <= 4){
      const respuesta  = this.modal.open(agregador, { centered: true , backdropClass: 'light-blue-backdrop' } );
    }else{
      const respuesta  = this.modal.open(agregador, {  size: 'lg' ,  backdropClass: 'light-blue-backdrop'  } );
    }
    
  }

}
