import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UsuarioInterface } from '@interfaces/usuario.interface';
import { RespuestaInterface } from '@interfaces/respuesta.interface';

import { AmbienteService } from '@servicios/ambiente.service';

import { GenericoModel } from './generico.model';



export class EventosController extends GenericoModel {

    registros: UsuarioInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService 
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "usuarios";

    this.DetectarCampos().subscribe();

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
