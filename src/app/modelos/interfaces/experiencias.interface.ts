export interface ExperienciasInterface {
  id                    : number;
  personas_id           : number;
  estudios_id           : number;
  cargo                 : string;
  empresa               : string;
  sectoreslaborales_id  : number;
  tiposcontratos_id     : number;
  vinculacion_fecha     : string;
  terminacion_fecha     : string;
  rangosingresos_id     : number;
  jefenombre            : string;
  jefetelefono          : string;
  municipios_id         : number;
  registro_fecha        : string;
  modo?                 : string;
  dbRef?                : string;  
}