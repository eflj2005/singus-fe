export interface DireccionesInterface {
  id: number;
  direccion: string;
  registro_fecha: string;
  personas_id: number;
  municipios_id:number;
  modo?:string;
  dbRef?:string;
}
