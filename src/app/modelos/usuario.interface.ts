export interface UsuarioInterface {
    id: number;
    documento: number;
    clave?:string;
    nombres: string;
    apellidos: string;
    telefono: Date;
    correo: string;
    fechacreacion: string;
    roles_id:number;
    areas_id:number;
    estado:number;
    token?:string;
}
