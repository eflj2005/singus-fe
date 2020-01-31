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
