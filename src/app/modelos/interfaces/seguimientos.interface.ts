export interface SeguimientosInterface {
    id: number;
    personas_id: number;
    observacion: string;
    tiposobservaciones_id: number;
    actualizacion_fecha: string;
    modo?:string;
    dbRef?:string;
}
