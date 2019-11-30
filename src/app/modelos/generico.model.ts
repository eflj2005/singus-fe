import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AmbienteService } from '@servicios/ambiente.service';
import { filtroInterface } from '@modelos/interfaces/filtro.interface';
import { RespuestaInterface } from './interfaces/respuesta.interface';

export class GenericoModel {
  protected llamadoHttp :HttpClient;
  protected servicioAmbiente :AmbienteService;

  protected nombreTabla:string;

  protected posicionActual:number;
  //protected cantidad:number = null;

  protected registros:any[];      //ESTE ATRIBUTO SE SOBRECARGA
  
  private consecutivoDbRefs:number;

  constructor( 
    instanciaHttpClient :HttpClient,
    InstanciaAmbienteService :AmbienteService
  ) {  
    this.llamadoHttp = instanciaHttpClient;
    this.servicioAmbiente = InstanciaAmbienteService

    this.registros = [];
    this.posicionActual = null;
    this.consecutivoDbRefs =1;
  }

  //SOBRECARGA ATRIBUTOS

  public get cantidad ():number{
    return this.registros.length;
  }

  public get actual():any{
    return  this.registros[this.posicionActual];
  }

  //ADMINISTRACION BASICA
  
  public get todos():any[]{
    return  this.registros;
  }

  public Agregar(objeto:any){
    objeto.modo = "I";
    objeto.dbRef = "#"+this.consecutivoDbRefs;
    this.consecutivoDbRefs++;

    this.registros.push(objeto);
    this.posicionActual = this.cantidad - 1;
  }

  public Modificar(objeto:any){
    if (objeto.modo != "I") objeto.modo = "A";
    this.registros[this.posicionActual]=objeto;
  }

  public Eliminar(){
    this.registros.splice( this.posicionActual );
    this.Primero();
  }

  public EliminarTodo(){
    this.registros.length = 0;
  }

  public Encontrar( nombreAtributo:string, valorBuscado:any ): boolean{
    let actualTemporal = this.posicionActual;
    let encontrado:boolean = false;

    this.Primero();

    while(!this.esFin && !encontrado){
      if(this.actual[nombreAtributo] == valorBuscado ) encontrado=true;
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
    
    if( this.posicionActual == this.cantidad ) validacion= true;
    return validacion;
  }

  //AVAMZADAS

  public CargarDesdeDB(  conToken:boolean=true , filtrosRecibidos:filtroInterface=null ): Observable<any> {
  
    let re1 = /\"/gi;
    let re2 = /{/gi;
    let re3 = /\}/gi;    
    
    let datosEnviados = new HttpParams()
      .set("accion","obtener_registros")
      .set("tabla",this.nombreTabla)
      .set("conSeguridad", String(conToken) )      
      .set("modo","S")                       //S = simple => consulta directa, A = avanzada => consulta con inner join
      //.set("filtros", JSON.stringify(filtrosRecibidos).replace(re1, "").replace(re2, "").replace(re3, ""));
      .set("filtros", JSON.stringify(filtrosRecibidos));      
   
    return this.llamadoHttp.get<any>( this.servicioAmbiente.GetUrlRecursos() + "pasarela.php",  { params: datosEnviados  }  ).pipe(
      map(
        (respuesta: RespuestaInterface) => {

          respuesta.mensaje.forEach(elemento => {
            elemento.dbRef=null;
            elemento.modo=null;
            elemento = this.ProcesarFechas(elemento,"GET");
            this.registros.push(elemento);
          });

          if( respuesta.mensaje.length > 0 ) this.posicionActual=0;

          return respuesta;
        }
      )
    );

  }

  private ActualizarReferencias(datos:filtroInterface[]){


    let actualTemporal = this.posicionActual;
 
    this.Primero();

    while(!this.esFin){
      if(this.registros[this.posicionActual].dbRef != null  ){
        datos.forEach(elemento => {
          if( elemento.dbRef == this.registros[this.posicionActual].dbRef ){
            this.registros[this.posicionActual].id = elemento.id;
            this.registros[this.posicionActual].dbRef = null;
          }
        });
      }
      this.registros[this.posicionActual].modo = null;
      this.Siguiente();
    }

    
    this.posicionActual = actualTemporal;


  }

  protected ProcesarFechas(objeto:any, sentido:string){
    //ESTE METODO SE SOBRECARGA
    return objeto;
  }

  public Guardar(conToken:boolean=true ): Observable<any>{
    var aProcesar:any[] = [];
    var temporal:any;

    this.registros.forEach(registro => {
      if(registro.modo != null) {
        temporal = this.ProcesarFechas(Object.assign({}, registro),"SET");
        aProcesar.push(temporal);        
      }
    });
    
    let parametros = {
      accion : "procesar_registros",
      tabla: this.nombreTabla,
      conSeguridad: conToken,      
      datos : this.registros      
    };

    return this.llamadoHttp.post<any>( this.servicioAmbiente.GetUrlRecursos() + "pasarela.php", parametros).pipe(
      map(
        (respuesta: RespuestaInterface) => {
         
          this.ActualizarReferencias(respuesta.mensaje.dbRefs);

          return respuesta;
        }
      )
    );


  }




}
