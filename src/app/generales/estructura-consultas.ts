/*
  ESTRUCTURA BASE  ---------------------------------------------------------------------------------------------------------

  let caracteristicas = {
      columnas: [
        { tabla: "" , columna: "", alias: "" },
        { tabla: "" , columna: "", alias: "" }
      ],
      enlaces: [
        { tablaE: "" , tablaPk: "", tablaFk: "" },
        { tablaE: "" , tablaPk: "", tablaFk: "" }
      ],
      filtros: [
        { tabla: "" , campo: "", condicion: "", valor: "" },
        { tabla: "" , campo: "", condicion: "", valor: "" },        
      ],
      ordenamientos: [
        { columna: "" , orden: "" },
        { columna: "" , orden: "" },
      ]
    }

    EJEMPLO VACIO  ---------------------------------------------------------------------------------------------------------

    let caracteristicas = {
      columnas: null,
      enlaces: null,
      filtros: null,
      ordenamientos: null
    };

    EJEMPLO CON FILTRO

    let caracteristicas = {
      columnas: null,
      enlaces: null,
      filtros: [
        { tabla: null , campo: "id", condicion: "=", valor: "2" }
      ],
      ordenamientos: null
    };

    EJEMPLO CON ORDENAMIENTO  ----------------------------------------------------------------------------------------------

    let caracteristicas = {
      columnas: null,
      enlaces: null,
      filtros: null,
      ordenamientos: [
        { columna: "id" , orden: "DESC" },
      ]
    };

    EJEMPLO AVANZADO  ------------------------------------------------------------------------------------------------------

    let caracteristicas = {
      columnas: [
        { 
          tabla: null ,
          columna: "CONCAT( personas.nombres , ' ' , personas.apellidos )",
          alias: "nombreCompleto" 
        },
        { tabla: "cohortes" ,   columna: "descripcion" ,  alias: "cohorte"  },
        { tabla: "sedes" ,      columna: "descripcion" ,  alias: "sede"     }, 
        { tabla: "programas" ,  columna: "descripcion" ,  alias: "programa" }, 
        { 
          tabla: null ,
          columna: "( SELECT numero FROM telefonos WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM telefonos WHERE personas_id = personas.id AND tipo = 'C' ) AND tipo = 'C' LIMIT 1 )" ,
          alias: "celular" 
        },
        { 
          tabla: null ,
          columna: "( SELECT correo FROM correos WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM correos WHERE personas_id = personas.id AND tipo = 'I' ) AND tipo = 'I' LIMIT 1 )" ,
          alias: "correoInstitucional" 
        },{ 
          tabla: null ,
          columna: "( SELECT correo FROM correos WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM correos WHERE personas_id = personas.id AND tipo = 'P' ) AND tipo = 'P' LIMIT 1 )" ,
          alias: "correoPersonal" 
        }
      ],
      enlaces: [
        { tablaE: "estudios" ,  tablaPk: "personas",  tablaFk: "estudios" },
        { tablaE: "cohortes" ,  tablaPk: "cohortes",  tablaFk: "estudios" },
        { tablaE: "sedes" ,     tablaPk: "sedes",     tablaFk: "estudios" },
        { tablaE: "programas" , tablaPk: "programas", tablaFk: "estudios" },                
      ],
      filtros: [
        { tabla: "sedes" , campo: "instituciones_id", condicion: "=", valor: "1" }
      ],
      ordenamientos: [
        { columna: "cohorte" , orden: "DESC" },
        { columna: "sede" , orden: "ASC" },
        { columna: "apellidos" , orden: "ASC" },
      ]
    };

    USO CON EJEMPLO AVANZADO  ----------------------------------------------------------------------------------------------

    let caracteristicas = new EstructuraConsultas();

    caracteristicas.AgregarColumna( null ,         "CONCAT( personas.nombres , ' ' , personas.apellidos )" , "nombreCompleto" );
    caracteristicas.AgregarColumna( "cohortes" ,   "descripcion" ,                                           "cohorte" );
    caracteristicas.AgregarColumna( "sedes" ,      "descripcion" ,                                           "sede" );
    caracteristicas.AgregarColumna( "programas" ,  "descripcion" ,                                           "programa ");
    caracteristicas.AgregarColumna( null ,         "( SELECT numero FROM telefonos WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM telefonos WHERE personas_id = personas.id AND tipo = 'C' ) AND tipo = 'C' LIMIT 1 )" , "celular" );
    caracteristicas.AgregarColumna( null ,         "( SELECT correo FROM correos WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM correos WHERE personas_id = personas.id AND tipo = 'I' ) AND tipo = 'I' LIMIT 1 )" ,     "correoInstitucional" );
    caracteristicas.AgregarColumna( null ,         "( SELECT correo FROM correos WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM correos WHERE personas_id = personas.id AND tipo = 'P' ) AND tipo = 'P' LIMIT 1 )" ,     "correoPersonal" );
    
    caracteristicas.AgregarEnlace( "estudios" ,  "personas" ,  "estudios" );
    caracteristicas.AgregarEnlace( "cohortes" ,  "cohortes" ,  "estudios" );
    caracteristicas.AgregarEnlace( "sedes" ,     "sedes" ,     "estudios" );
    caracteristicas.AgregarEnlace( "programas" , "programas" , "estudios" );  
    
    caracteristicas.AgregarFiltro( "sedes" , "instituciones_id" , "=", "1" );
    
    caracteristicas.AgregarOrdenamiento( "cohorte" , "DESC" );
    caracteristicas.AgregarOrdenamiento( "sede" , "ASC" );
    caracteristicas.AgregarOrdenamiento( "apellidos" , "ASC" );        

    USO CON EJEMPLO DE UN FILTRO DIRECTO  ----------------------------------------------------------------------------------

    let caracteristicas = new EstructuraConsultas("F", null , "id" , "=" , "3" );

    USO CON EJEMPLO DE UN ORDENAMIENTO DIRECTO  ----------------------------------------------------------------------------
    
    let caracteristicas = new EstructuraConsultas("O", "apellido" , "DESC" );


*/



import { isNull } from 'util';

export class EstructuraConsultas {
  
  private columnas: any = null;
  private enlaces: any = null;
  private filtros: any = null;
  private ordenamientos: any = null;

  constructor( tipo?:string, valor1?:string, valor2?:string, valor3?:string, valor4?:string ) {
    if( tipo ){
      if( tipo == "F" ){
        this.filtros = [];
        this.filtros.push( { tabla: valor1 ,   campo: valor2 ,  condicion: valor3, valor: valor4 } );
      }
      if( tipo == "O" ){
        this.ordenamientos = [];
        this.ordenamientos.push( { columna: valor1 ,   orden: valor2 } );
      }      
    }
  }

  public AgregarColumna( nombreTabla:string, nombreColumna:string, aliasColumna:string ){
    if( isNull( this.columnas ) ) this.columnas = [];
    this.columnas.push( { tabla: nombreTabla , columna: nombreColumna , alias: aliasColumna } );
  }

  public AgregarEnlace( tablaEnlace:string, tablaConPK:string, tablaConFK:string ){
    if( isNull( this.enlaces ) ) this.enlaces = [];
    this.enlaces.push( { tablaE: tablaEnlace , tablaPk: tablaConPK , tablaFk: tablaConFK } );
  }

  public AgregarFiltro( nombreTabla:string, campoFiltrado:string, condicionAplicada:string, valorBuscado:string ){
    if( isNull( this.filtros ) ) this.filtros = [];    
    this.filtros.push( { tabla: nombreTabla , campo: campoFiltrado , condicion: condicionAplicada, valor: valorBuscado } );
  }

  public AgregarOrdenamiento( nombreColumna:string, sentido:string ){
    if( isNull( this.ordenamientos ) ) this.ordenamientos = [];        
    this.ordenamientos.push( { columna: nombreColumna , orden: sentido } );
  }

}
