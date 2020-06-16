export interface AgendasInterface {
    id: number;
    agendas_id: number;
    apertura_fecha: string;
    cierre_fecha: string;
    nivel: number;
    modo?:string;
    dbRef?:string;
}
