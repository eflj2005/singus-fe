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
                  if(encontrado) {
                    let temporal =  Object.assign( {}, this.datosArchivo[posActual] );
                    parametrosRecibidos.arregloNuevasPersonas.push( temporal );
                  }
                });

                respuesta.mensaje.nuevosEstudios.forEach((registro: any, indice: any) => {    
                  let posActual = 0;
                  let encontrado = false;
                  while(posActual < this.datosArchivo.length && !encontrado ){
                    if( registro == this.datosArchivo[posActual].ref )  encontrado = true;
                    else                                                posActual++;
                  }
                  if(encontrado) {
                    let temporal =  Object.assign( {}, this.datosArchivo[posActual] );
                    parametrosRecibidos.arregloNuevosEstudios.push( temporal);
                  }
                });

                respuesta.mensaje.personasCambios.forEach((registro: any, indice: any) => {    
                  let posActual = 0;
                  let encontrado = false;
                  while(posActual < this.datosArchivo.length && !encontrado ){
                    if( registro.referencia == this.datosArchivo[posActual].ref )  encontrado = true;
                    else                                                          posActual++;
                  }         
                  if(encontrado) {
                    let temporal =  Object.assign( {}, this.datosArchivo[posActual] );
                    temporal.cambios = registro.cambios;
                    parametrosRecibidos.arregloCambios.push( temporal );
                  }
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

  MarcarRepetidos( arregloBase:any[], camposBuscados: string[], elminiarRepetidos:boolean = false ){

    arregloBase.forEach((registro: any, indiceR: any) => {     
      let encontrado:boolean = false;
      let posicion:number = 0;
      while(posicion < arregloBase.length && !encontrado ){
        let validaciones:number = 0;
        camposBuscados.forEach((campo: any, indiceC: any) => {
          if(registro[campo] == arregloBase[posicion][campo]) validaciones++;
        });

        if( ( validaciones == camposBuscados.length ) && ( indiceR != posicion ) )  encontrado = true;
        else                                                                        posicion++;
      }
      if(encontrado)  registro.repetido=true;

    });

    if(elminiarRepetidos) this.EliminarRepetidos(arregloBase, camposBuscados);

  }

  private EliminarRepetidos(arregloBase:any[], camposBuscados: string[]){
    let posicionBase:number;
    let posicionEliminacion:number;

    posicionBase = 0;
    while( posicionBase < arregloBase.length ){

      if( arregloBase[posicionBase].repetido ){

        posicionEliminacion = posicionBase + 1;
        while( posicionEliminacion < arregloBase.length ){       

          let validaciones:number = 0;
          camposBuscados.forEach((campo: any, indiceC: any) => {
            if(arregloBase[posicionBase][campo] == arregloBase[posicionEliminacion][campo]) validaciones++;
          });
  
          if( validaciones == camposBuscados.length ){
            arregloBase.splice(posicionEliminacion,1);
            posicionEliminacion = posicionBase + 1;
          }
          else{
            posicionEliminacion++;
          } 
   
        }

      }

      posicionBase++;
    }

  }

}
