import { AmbienteService } from '@servicios/ambiente.service';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { map } from 'rxjs/operators';

interface objetoGenericoInterface{
  [indice:string] : any
}

export class CarguesController {

  caracteristicasDefinidas: objetoGenericoInterface[] = []; 

  private indiceCaracteristicas: number;
  private datosArchivo: any[];

  private procesoTerminado: BehaviorSubject<boolean>;
  
  constructor(
    private servicioAmbiente : AmbienteService,
    private llamadoHttp : HttpClient, 
    tipoCargeRecibido: number
  ) { 

    this.datosArchivo = [];
    this.procesoTerminado = new BehaviorSubject(false);

    this.caracteristicasDefinidas.push({
      tipo: 1,
      estructura: [ "RECTORIA", "NOMBRE_RECTORIA", "SEDE", "DESCRIPCION_SEDE", "SPRIDEN_ID", "TIPO_DOCUMENTO", "DOCUMENTO", "APELLIDOS", "P_NOMBRE", "S_NOMBRE", "SECUENCIA", "FACULTAD", "PROGRAMA", "NOMBRE_PROGRAMA", "PROGRAMAS_ACREDITADOS", "CARRERA", "CIUDAD_EXP_DOC", "GENERO", "STATUS_RESUL", "FEC_CAMBIO_STATUS", "EDAD", "NIVEL", "JORNADA_DESC", "TEL_RE", "TEL_TR", "TEL_CEL", "MAIL_ESTU", "CREDITOS_TOTAL_INSCRITOS", "CREDITOS_TOTAL_APROBADOS", "PROMEDIO", "STATUS_GRADO", "PER_GRADO", "ANIO_GRADO", "FECHA_GRADO", "ACTA_GRADO", "LIBRO", "FOLIO", "N_DIPLOMA", "SHRDGIH_HONR_CODE" ],
      tituloProceso : "Graduados - Argos", 
      totalPasos: 3,
    });
    this.caracteristicasDefinidas.push({
      tipo: 2,
      estructura: [ "RECTORIA", "NOMBRE_RECTORIA", "SEDE", "DESCRIPCION_SEDE", "SPRIDEN_ID", "TIPO_DOCUMENTO", "DOCUMENTO", "APELLIDOS", "P_NOMBRE", "S_NOMBRE", "SECUENCIA", "FACULTAD", "PROGRAMA", "NOMBRE_PROGRAMA", "PROGRAMAS_ACREDITADOS", "CARRERA", "CIUDAD_EXP_DOC", "GENERO", "STATUS_RESUL", "FEC_CAMBIO_STATUS", "EDAD", "NIVEL", "JORNADA_DESC", "TEL_RE", "TEL_TR", "TEL_CEL", "MAIL_ESTU", "CREDITOS_TOTAL_INSCRITOS", "CREDITOS_TOTAL_APROBADOS", "PROMEDIO", "STATUS_GRADO", "PER_GRADO", "ANIO_GRADO", "FECHA_GRADO", "ACTA_GRADO", "LIBRO", "FOLIO", "N_DIPLOMA", "SHRDGIH_HONR_CODE" ],
      tituloProceso : "Graduados - SAP", 
      totalPasos: 1,
    });    

    this.indiceCaracteristicas = this.caracteristicasDefinidas.findIndex( elemento => { return  ( elemento.tipo == tipoCargeRecibido )  } );
  }

  public get caracteristicas():objetoGenericoInterface{
     return this.caracteristicasDefinidas[this.indiceCaracteristicas];
  }

  public get datos():any[]{
    return this.datosArchivo;
  }

  public set datos( registros: any[] ){
    this.datosArchivo = registros;
  }

  public EstaListo():Observable<boolean>{
    return this.procesoTerminado;
  }

  public AnalizarDatos( nodoRecibido: number, parametrosRecibidos: any ):Observable<any>{

    var llamado: any;

    let parametrosLlamado = {
      accion : "",
      conSeguridad: true,
      modoCargue: nodoRecibido,
      datos : this.datosArchivo 
    };
    
    switch(this.caracteristicas.tipo){
      case 1:
        parametrosLlamado.accion = "registros_cargue_tipo1"
        this.procesoTerminado.next( false );
    
        llamado = this.llamadoHttp.post<any>( this.servicioAmbiente.GetUrlRecursos() + "pasarela.php", parametrosLlamado).pipe(
          map(
            (respuesta: RespuestaInterface) => {

              if( respuesta.codigo == 200 ) {
                
                parametrosRecibidos.arregloNuevasPersonas = [];
                parametrosRecibidos.arregloNuevosEstudios = [];
                parametrosRecibidos.arregloCambios = [];

                respuesta.mensaje.nuevasPersonas.forEach((registro: any, indice: any) => {          
                  let posActual = 0;
                  let encontrado = false;
                  while(posActual < this.datosArchivo.length && !encontrado ){
                    if( registro == this.datosArchivo[posActual].ref )    encontrado = true;
                    else                                                  posActual++;
                  }
                  if(encontrado) parametrosRecibidos.arregloNuevasPersonas.push( this.datosArchivo[posActual] );
                });

                respuesta.mensaje.nuevosEstudios.forEach((registro: any, indice: any) => {    
                  let posActual = 0;
                  let encontrado = false;
                  while(posActual < this.datosArchivo.length && !encontrado ){
                    if( registro == this.datosArchivo[posActual].ref )  encontrado = true;
                    else                                                posActual++;
                  }
                  if(encontrado) parametrosRecibidos.arregloNuevosEstudios.push(  this.datosArchivo[posActual]  );
                });

                respuesta.mensaje.personasCambios.forEach((registro: any, indice: any) => {    
                  let posActual = 0;
                  let encontrado = false;
                  while(posActual < this.datosArchivo.length && !encontrado ){
                    if( registro.referencia == this.datosArchivo[posActual].ref )  encontrado = true;
                    else                                                          posActual++;
                  }         
                  let temporal  =Object.assign({},this.datosArchivo[posActual]);
                  temporal.cambios = registro.cambios;
                  if(encontrado) parametrosRecibidos.arregloCambios.push( temporal );
                });               
                this.procesoTerminado.next( true );

              }
              else{
                console.log("Error En Analisis");
                console.log(respuesta,"error");
              }

              return respuesta;              
            }
          )          
        );
      break;
    }
    
    return llamado;
  }

}
