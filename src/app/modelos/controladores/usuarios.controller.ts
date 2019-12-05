import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UsuarioInterface } from '@modelos/interfaces/usuario.interface';
import { GenericoModel } from '@modelos/generico.model';
import { AmbienteService } from '@servicios/ambiente.service';
import { RespuestaInterface } from '../interfaces/respuesta.interface';

import { AreasController } from './areas.controller';

export class UsuariosController extends GenericoModel {


  registros: UsuarioInterface[]= [];

  constructor( 
    private instanciaHttpClient :HttpClient,
    private InstanciaAmbienteService :AmbienteService 
  ) {
    super(instanciaHttpClient,InstanciaAmbienteService);

    this.nombreTabla = "usuarios";
    this.fechasDefinidas = ["creacion_fecha"];

    this.DetectarCampos().subscribe();

    this.AgregarForanea( new AreasController(instanciaHttpClient,InstanciaAmbienteService)  );
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
