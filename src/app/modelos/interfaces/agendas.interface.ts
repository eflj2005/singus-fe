export interface AgendasInterface {
    id: number;
    agendas_id: number;
    apertura_fecha: string;
    cierre_fecha: string;
    nivel: number;
    registro_fecha:string;
    modo?:string;
    dbRef?:string;
}
