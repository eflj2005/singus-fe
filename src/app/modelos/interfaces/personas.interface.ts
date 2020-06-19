export interface PersonasInterface {
  id:number;
  nacimiento_fecha:string;
  iduniminuto:number;  
  nombres:string;
  apellidos:string;
  genero:string;
  tiposdocoumentos_id:number;
  documento:number;
  municipios_id:number;
  actualizacion_fecha:string;
  registro_fecha:string;
  desempleado:string;
  encuestaole:string;
  habeasdata:string;
  modo?:string;
  dbRef?:string;  
}