export interface UsuarioInterface {
    id: number;
    documento: Number;
    nombres: String;
    apellidos: String;
    telefono: Date;
    fechacreacion: string;
    roles_id:number;
    areas_id:number;
    token:string;
}
