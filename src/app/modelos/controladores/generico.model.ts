import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, isEmpty } from 'rxjs/operators';

import { AmbienteService } from '@servicios/ambiente.service';
import { filtroInterface } from '@interfaces/filtro.interface';
import { RespuestaInterface } from '../interfaces/respuesta.interface';
import { isNull } from 'util';

export class GenericoModel {
  protected llamadoHttp :HttpClient;
  protected servicioAmbiente :AmbienteService;

  public nombreTabla:string;

  protected camposTabla:any[];
  protected camposFecha:string[];

  protected controladoresForaneos:any[];

  protected posicionActual:number;
  //protected cantidad:number = null;

  protected registros:any[];      //ESTE ATRIBUTO SE SOBRECARGA
  
  private consecutivoDbRefs:number;
  protected listo:boolean;

  constructor( 
    instanciaHttpClient :HttpClient,
    InstanciaAmbienteService :AmbienteService
  ) {  
    this.llamadoHttp = instanciaHttpClient;
    this.servicioAmbiente = InstanciaAmbienteService

    this.registros = [];
    this.camposTabla = [];
    this.controladoresForaneos = [];
    this.posicionActual = null;
    this.consecutivoDbRefs =1;
    this.listo=false;

  }

  //SOBRECARGA ATRIBUTOS

  public set fechasDefinidas ( camposRecibida:string[] ){
    this.camposFecha = camposRecibida;
  }

  public get cantidad ():number{
    return this.registros.length;
  }

  public get actual():any{
    return  this.registros[this.posicionActual];
  }

  public get estaListo():boolean{
    return this.listo;
  }

  public get campos():string[]{
    return this.camposTabla;
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
      if(this.actual[nombreAtributo] == valorBuscado )  encontrado=true;
      else                                              this.Siguiente();
    }

    if(!encontrado) this.posicionActual = actualTemporal;
    return encontrado;
  }

  public AgregarForanea(controlador:any){
    this.controladoresForaneos[controlador.nombreTabla] = controlador;
  }

  public ObtenerForanea(nombre:string){
    return this.controladoresForaneos[nombre];
  }

  public TieneForanea(nombre:string){
    return (nombre in this.controladoresForaneos);
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

  //AVANZADAS

  protected DetectarCampos(conToken:boolean=true):Observable<any>{

    let datosEnviados = new HttpParams()
      .set("accion","obtener_campos")
      .set("tabla",this.nombreTabla)
      .set("conSeguridad", String(conToken) )  
   
    return this.llamadoHttp.get<any>( this.servicioAmbiente.GetUrlRecursos() + "pasarela.php",  { params: datosEnviados  }  ).pipe(
      map(
        (respuesta: RespuestaInterface) => {
          switch(respuesta.codigo){
            case 200:
              respuesta.mensaje.forEach(
                (campo:any) => {
                  this.camposTabla.push( campo );
                }
              );
              
              this.listo=true;
            break;
          }

          return respuesta;
        }
      )
    );

  }

  public CargarDesdeDB(  conToken:boolean=true , modoCargue:string="S", caracteristicas:any=null): Observable<any> {
  
    let re1 = /\"/gi;
    let re2 = /{/gi;
    let re3 = /\}/gi;    
    
    let datosEnviados = new HttpParams()
      .set("accion","obtener_registros")
      .set("tabla",this.nombreTabla)
      .set("conSeguridad", String(conToken) )      
      .set("modo", modoCargue )                       //S = simple => consulta directa, A = avanzada => consulta con inner join
      .set("caracteristicas", JSON.stringify(caracteristicas));  
      
   //   console.log(datosEnviados);
   
   //console.log(JSON.stringify(caracteristicas));

    return this.llamadoHttp.get<any>( this.servicioAmbiente.GetUrlRecursos() + "pasarela.php",  { params: datosEnviados  }  ).pipe(
      map(
        (respuesta: RespuestaInterface) => {
          console.log(respuesta);
          this.EliminarTodo();
          respuesta.mensaje.forEach(
            (elemento:any) => {
              elemento.dbRef=null;
              elemento.modo=null;
              elemento = this.ProcesarFechas(elemento,"GET");
              this.registros.push(elemento);
            }
          );

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

  // protected ProcesarFechas(objeto:any, sentido:string){
  //   //ESTE METODO SE SOBRECARGA
  //   return objeto;
  // }



  protected ProcesarFechas(objeto:any, sentido:string){      
    
    let regExp = /\-/gi;

    for (var campo in objeto) {
      if( campo.search("_fecha") != -1 ){

        if(sentido=="SET"){
          if( isNull(objeto[campo]) || (objeto[campo] != "") )    objeto[campo] = "NULL";
          else                                                    objeto[campo] = objeto[campo].replace(regExp, "");
        } 
        if(sentido=="GET"){
          if( !isNull(objeto[campo]) && (objeto[campo] != "") )   objeto[campo] = (objeto[campo]).substr(0,4) + "-" + (objeto[campo]).substr(5,2) + "-" + (objeto[campo]).substr(8,2);
          else                                                    objeto[campo] = "";
        }

      }
    }

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

    return null;
  }




}
