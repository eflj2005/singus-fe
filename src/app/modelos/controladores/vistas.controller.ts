import { HttpClient } from '@angular/common/http';

import { GenericoModel } from '@controladores/generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { RespuestaInterface } from '@interfaces/respuesta.interface';


export class VistasController extends GenericoModel{
  tablasVistas: string[] = ["vista_estudios","vista_experiencias","vista_personas","vista_usuarios"];

  vistas: VistaInterface[] = [];

  estaListoVistas: boolean = false;

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService 
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    for (let i = 0; i < this.tablasVistas.length; i++) {   
      this.camposTabla = null;
      this.nombreTabla = this.tablasVistas[i];
      
      this.DetectarCampos().subscribe((respuesta:RespuestaInterface)=>{
        switch(respuesta.codigo){
          case 200:
            let vistaTemp:VistaInterface = {
              "seleccionada": false,
              "relacionable": true,
              "titulo":this.tablasVistas[i].split("_")[1],
              "nombreTablaVista": this.nombreTabla,
              "columnasVista": respuesta.mensaje
            }
            vistaTemp.columnasVista.forEach(campos => {
              campos.estado = true;
            });
            this.vistas.push(vistaTemp);
            break;
          default:
            alert("Error: "+respuesta.mensaje);
            break;
        }
      }
      );
    }
    this.nombreTabla = null;
    this.EstanlistasVitas(true);
  }

  EstanlistasVitas(estado:boolean = false){
    if (estado) {
      function compare(a, b){
        if (a.titulo > b.titulo) {
          return 1;
        }
        if (a.titulo < b.titulo) {
          return -1;
        }
        return 0;
      }
      this.vistas.sort(compare);

      this.estaListoVistas = true;
    }
    return this.estaListoVistas;
  }

  EncontrarVista(titulo:string){
    let vistaEncontrada  = null;
    this.vistas.forEach(vista => {
      if (vista.titulo == titulo) {
        vistaEncontrada = vista;
      }
    });

    return vistaEncontrada;
  }
}