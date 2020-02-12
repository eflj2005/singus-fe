export interface EstudiosInterface {
  id                    : number;
  personas_id           : number;
  programas_id          : number;  
  cohortes_id           : number;
  tiposestudios_id      : number;
  titulos_id            : number;
  grado_fecha           : string;
  sedes_id              : number;
  mecanismosgrados_id   : number;
  descripcionmecanismo  : string;
  registro_fecha        : string;
  modo?                 : string;
  dbRef?                : string;  
}