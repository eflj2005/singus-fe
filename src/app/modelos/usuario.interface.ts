export interface UsuarioInterface {
    id: number;
    documento: number;
    clave?:string;
    nombres: string;
    apellidos: string;
    telefono: Date;
    correo: string;
    fechacreacion: string;
    rol:string;
    areas_id:number;
    estado:string;
    token?:string;
}
