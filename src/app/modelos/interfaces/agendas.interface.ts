export interface AgendasInterface {
    id: number;
    coordinadores_id: number;
    responsables_id: number;
    inicial_fecha: string;
    final_fecha: string;
    modo?:string;
    dbRef?:string;
}
