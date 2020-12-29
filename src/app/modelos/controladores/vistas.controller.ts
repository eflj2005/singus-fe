import { HttpClient } from '@angular/common/http';

import { GenericoModel } from '@controladores/generico.model';
import { AmbienteService } from '@servicios/ambiente.service';

import { RespuestaInterface } from '@interfaces/respuesta.interface';


export class VistasController extends GenericoModel{
  tablasVistas: string[] = ["vista_estudios","vista_experiencias","vista_personas","vista_usuarios"];

  vistas: VistaInterface[] = [];

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
    
  }
}