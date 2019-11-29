import { HttpClient } from '@angular/common/http';

import { GenericoModel } from '@modelos/generico.model';
import { UsuarioInterface } from '@modelos/interfaces/usuario.interface';
import { AmbienteService } from '@servicios/ambiente.service';
import { RespuestaInterface } from '../interfaces/respuesta.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class UsuariosController extends GenericoModel {


  registros: UsuarioInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService 
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "usuarios";
  }

  //METODO SOBRECARGADO PARA PREPARA FECHAS
  protected ProcesarFechas(objeto:UsuarioInterface, sentido:string){        
    // console.log(objeto);  
    // console.log(sentido);  
    let regExp = /\-/gi;
    if(sentido=="SET"){
      objeto.creacion = objeto.creacion.replace(regExp, "");
    }
    if(sentido=="GET"){
      let day;
      let month;
      let year;
      objeto.creacion = (objeto.creacion).substr(0,4) + "-" + (objeto.creacion).substr(5,2) + "-" + (objeto.creacion).substr(8,2);
    }
    return objeto;

  }

  public GenerarCodigo(idUsuario:number): Observable<RespuestaInterface>{

    let parametros = {
      accion  : "generar_codigo",
      tabla   : this.nombreTabla,
      datos   : { idBuscado: idUsuario }
    };

    return this.llamadoHttp.post<RespuestaInterface>( this.servicioAmbiente.GetUrlRecursos() + "pasarela.php", parametros).pipe(
      map(
        (respuesta: any) => {
          return respuesta;
        }
      )
    );
  }

  public ValidarCodigo(idUsuario:number, codigoEntregado:string): Observable<RespuestaInterface>{

    let parametros = {
      accion  : "validar_codigo",
      tabla   : this.nombreTabla,
      datos   : { 
        idBuscado: idUsuario, 
        codigoRecibido: codigoEntregado
      }
    };

    return this.llamadoHttp.post<RespuestaInterface>( this.servicioAmbiente.GetUrlRecursos() + "pasarela.php", parametros).pipe(
      map(
        (respuesta: any) => {
          return respuesta;
        }
      )
    );
  }

}
