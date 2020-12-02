export interface OfertasInterface {
  id                    : Number;
  descripcion           : String;
  registrocalificado    : String;
  congenero             : String;
  tiposestudios_id      : Number;
  programas_id          : Number;  
  instituciones_id      : Number;
  modo?                 : String;
  dbRef?                : String;  
}