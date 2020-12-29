interface Columnas {
    nombre: string;
    estado: boolean;
}

interface VistaInterface {
    // id:Number;
    seleccionada: boolean;
    relacionable: boolean;
    titulo: string;
    nombreTablaVista:String;
    columnasVista: Columnas[];
}