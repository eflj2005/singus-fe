export interface EstudiosInterface {
  id                    : number;
  personas_id           : number;
  cohortes_id           : number;
  titulos_id            : number;
  grado_fecha           : string;
  mecanismosgrados_id   : number;
  descripcionmecanismo  : string;
  ofertas_id            : number;
  sedes_id              : number;
  registro_fecha        : string;
  promedio              : number;
  acta                  : string;
  libro                 : string;
  folio                 : string;
  diploma               : string;
  modo?                 : string;
  dbRef?                : string;  
}