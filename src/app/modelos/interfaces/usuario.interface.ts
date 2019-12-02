export interface UsuarioInterface {
  id: number;
  documento: number;
  clave?:string;
  nombres: string;
  apellidos: string;
  telefono: number;
  correo: string;
  creacion_fecha: string;
  rol:string;
  areas_id:number;
  estado:string;
  token?:string;
  modo?:string;
  dbRef?:string;
}
