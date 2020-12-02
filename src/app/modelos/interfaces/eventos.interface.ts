export interface EventoInterface {
  id:Number;
  nombre:String;
  lugar:String;
  descripcion:String;
  imagen:String;
  evento_fecha:String;
  creacion_fecha:String;
  ofertas_id:Number;
  modo?:String;
  dbRef?:String;
}
