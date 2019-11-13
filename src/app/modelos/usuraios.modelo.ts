import { ModeloGenerico } from './generico.modelo';

export interface UsuariosInterface {
    id: number;
    documento: number;
    nombres: String;
    apellidos: String;
    telefono: Date;
    fechacreacion: string
    roles_id:number;
    areas_id:number;
  }
  
  
  export class UsuariosControlador extends ModeloGenerico{
  

    registros: UsuariosInterface[]= [];



  }