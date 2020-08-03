import { AmbienteService } from '@servicios/ambiente.service';
import { HttpClient } from '@angular/common/http';

interface objetoGenericoInterface{
  [indice:string] : any
}

export class CarguesController {

  caracteristicasDefinidas: objetoGenericoInterface[] = []; 

  private indiceCaracteristicas: number;
  private datosArchivo: any[];

  private servicioAmbiente : AmbienteService;
  private llamadoHttp : HttpClient;

  constructor( tipoCargeRecibido: number ) { 

    this.datosArchivo = [];

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


    this.indiceCaracteristicas = this.caracteristicasDefinidas.findIndex( elemento => { return  ( elemento.tipo == tipoCargeRecibido )  } )

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

}
