export interface ReconocimientosInterface {
  id: number;
  personas_id: number;
  nombre:string;
  motivo:string;
  institucion:string;
  momento_fecha:string;
  registro_fecha:string;
  modo?:string;
  dbRef?:string;
}
