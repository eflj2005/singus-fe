import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AmbienteService } from '@app/servicios/ambiente.service';
import { map } from 'rxjs/operators';
import { ɵConsole } from '@angular/core';
import { UsuariosController } from './usuarios.controller';

export interface filtroInterface{
    [key: string]: string | boolean | number;
}

export class GenericoModel {
  protected nombreTabla:string;

  protected posicionActual:number = null;
  //protected cantidad:number = null;

  protected registros:any[] = []

  constructor(
    protected llamadoHttp :HttpClient,
    protected servicioAmbiente: AmbienteService
  ) {
  }

  //SOBRECARGA ATRIBUTOS

  public get cantidad ():number{
    return this.registros.length;
  }

  public get registroActual():any{
    return  this.registros[this.posicionActual];
  }

  // //MAJEJO ATRIBUTOS

  // public AsignarAtributo( nombreAtributo:String, valorAtributo:any ){
  //   this.registroActual.nombreAtributo = valorAtributo;
  // }

  // public ObtenerAtributo( nombreAtributo:String ){
  //   return this.registroActual.nombreAtributo;
  // }

  //ADMINISTRACION BASICA
  
  public ObtenerTodos(){
    return  this.registros;
  }

  public Agregar(objeto:any){
    objeto.modo = "I";
    this.registros.push(objeto);
    this.posicionActual = this.cantidad - 1;
  }

  public Modificar(objeto:any){
    objeto.modo = "A";
    this.registros = objeto;
  }

  public Eliminar(){
    this.registros.splice( this.posicionActual );
    this.Primero();
  }

  public EliminarTodo(){
    this.registros.length = 0;
  }

  public Encontrar( nombreAtributo:String, valorBuscado:any ): boolean{
    let actualTemporal = this.posicionActual;
    let encontrado:boolean = false;

    this.Primero();

    while(!this.esFin && !encontrado){
      if(this.registroActual.nombreAtributo == valorBuscado ) encontrado=true;
      this.Siguiente();
    }

    if(!encontrado) this.posicionActual = actualTemporal;
    return encontrado;
  }

  //DESPLAZAMIENTO

  public Primero(){
    this.posicionActual = 0;
  }

  public Ultimo(){
    this.posicionActual = this.cantidad - 1;
  }

  public Siguiente(){
    if( this.posicionActual < this.cantidad  ) this.posicionActual++;
  }

  public Anterior(){
    if( this.posicionActual > 0 )  this.posicionActual++;
  }

  public get esFin():boolean{
    let validacion:boolean = false;
    
    if( this.posicionActual = this.cantidad ) validacion= true;
    return validacion;
  }

  //AVAMZADAS

  public CargarDesdeDB( filtrosRecibidos:filtroInterface ): Observable<any> {
  
    let re1 = /\"/gi;
    let re2 = /{/gi;
    let re3 = /\}/gi;    
    
    let datosEnviados = new HttpParams()
      .set("accion","obtener_registros")
      .set("tabla",this.nombreTabla)
      .set("filtros", JSON.stringify(filtrosRecibidos).replace(re1, "").replace(re2, "").replace(re3, ""));

      console.log(datosEnviados);
    return this.llamadoHttp.get<any>( this.servicioAmbiente.GetUrlRecursos() + "pasarela.php",  { params: datosEnviados  }  ).pipe(
      map(
        (respuesta: any) => {

          

          return respuesta;
        }
      )
    );

  }

  public Guardar(conToken:boolean=true ): Observable<any>{
    var aProcesar:UsuariosController[] = [];

    this.registros.forEach(registro => {
      if(registro.modo != null) aProcesar.push(registro);        
    });

    
    
    let parametros = {
      accion : "crear_registros",
      tabla: this.nombreTabla,
      conSeguridad: conToken,      
      datos : this.registros      
    };

    return this.llamadoHttp.post<any>( this.servicioAmbiente.GetUrlRecursos() + "pasarela.php", parametros).pipe(
      map(
        (respuesta: any) => {

          

          return respuesta;
        }
      )
    );

  }




}
