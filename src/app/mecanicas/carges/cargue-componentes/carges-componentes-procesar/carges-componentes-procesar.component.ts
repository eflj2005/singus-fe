import { Component, OnInit, Input } from '@angular/core';
import { CarguesController } from '@controladores/cargues.controller';
import { AmbienteService } from '@servicios/ambiente.service';
import { HttpClient } from '@angular/common/http';
import { timer } from 'rxjs';
import { RespuestaInterface } from '@interfaces/respuesta.interface';


@Component({
  selector: 'app-carges-componentes-procesar',
  templateUrl: './carges-componentes-procesar.component.html',
  styleUrls: ['./carges-componentes-procesar.component.css']
})
export class CargesComponentesProcesarComponent implements OnInit {

  @Input() controlVisual : { [inndice:string] : any};
  @Input() controladorCargues: CarguesController;

  enProceso: boolean;

  progresoLocal: { valor: number, proceso: string } = { valor: 0, proceso: "" };

  arregloResumen: any[];

  constructor(
    private servicioAmbiente : AmbienteService,
    private llamadoHttp : HttpClient,
  ) { }

  ngOnInit() {

    this.controlVisual.desactivarPasos.siguiente = true;
    this.controlVisual.desactivarPasos.anterior = false;
    this.controlVisual.desactivarPasos.inicio = true;
    this.controlVisual.controlPasos.anterior = false;
    this.controlVisual.controlPasos.siguiente = false;

    this.enProceso = true;
    
    this.arregloResumen = [];
    
    this.ActualizarProgresoLocal("Analizando Registros:", 100, 0 );      //Inicializa barra de proceso

    const temporizador = timer(0, 100);
    const subscripciónTemporizador = temporizador.subscribe( (valor: any) => { 
      this.ActualizarProgresoLocal("Segmentando Registros:", 100, valor );      //Actualiza Proceso barra de proceso
    });

    this.controladorCargues.ProcesarDatos(2, null).subscribe(
      (respuesta: RespuestaInterface) => { 

        this.controladorCargues.EstaListo().subscribe(
          (valor:boolean)=>{
            if(valor){

              
              console.log(respuesta);

              subscripciónTemporizador.unsubscribe();
              this.enProceso = false;
          
            }
          }
        );
       
      }      
    );    



  }


  ActualizarProgresoLocal( nombreProceso: string, totalPasos: number, pasoActual: number ){
    this.progresoLocal.proceso = nombreProceso;
    if( totalPasos!= 0 )  this.progresoLocal.valor = (pasoActual * 100 ) / totalPasos;
    else                  this.progresoLocal.valor = 100;
  }

}
