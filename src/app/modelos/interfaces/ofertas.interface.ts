export interface OfertasInterface {
  id                    : number;
  registrocalificado    : string;
  congenero             : string;
  tiposestudios_id      : number;
  programas_id          : number;  
  instituciones_id      : number;
  modo?                 : string;
  dbRef?                : string;  
}