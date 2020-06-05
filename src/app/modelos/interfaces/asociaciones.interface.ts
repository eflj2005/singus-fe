export interface AsociacionesInterface {
  id: number;
  personas_id: number;
  nombre:string;
  cobertura:string;
  sectoresasociaciones_id:number;
  ingreso_fecha:string;
  registro_fecha:string;
  modo?:string;
  dbRef?:string;
}
