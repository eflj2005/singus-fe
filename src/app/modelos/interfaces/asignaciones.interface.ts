export interface AsignacionesInterface {
  id: number;
  agendas_id: number;
  usuarios_id: number;
  tipo:string;
  registro_fecha:string;
  modo?:string;
  dbRef?:string;
}
