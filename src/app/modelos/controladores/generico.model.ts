import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, isEmpty } from 'rxjs/operators';

import { AmbienteService } from '@servicios/ambiente.service';
import { filtroInterface } from '@interfaces/filtro.interface';
import { RespuestaInterface } from '../interfaces/respuesta.interface';
import { isNull, isUndefined } from 'util';
import { EstructuraConsultas } from '@generales/estructura-consultas';

interface RelacionesInterface {
  controlador: number;
  sentido: string;
}

interface ArrayOfObjectsInterface {
  [index: number]: object;
}

interface DatosCargueInterface{
  caracteristicas: EstructuraConsultas;
  conToken:boolean;
  modoCargue:string;
}

export class GenericoModel {
  protected llamadoHttp :HttpClient;
  protected servicioAmbiente :AmbienteService;

  public nombreTabla:string;

  protected camposTabla:ArrayOfObjectsInterface[];
  protected camposFecha:string[];

  protected controladoresForaneos:any[];        //eliminar

  protected posicionActual:number;
  //protected cantidad:number = null;

  protected registros:any[];      //ESTE ATRIBUTO SE SOBRECARGA
  
  private consecutivoDbRefs:number;
  protected listoCampos:boolean;
  protected listoCargue:boolean;

  private datosCargue:DatosCargueInterface = {
    caracteristicas: null,
    conToken: false,
    modoCargue: "S"
  };

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
    this.listoCampos=false;
    this.listoCargue=false;

    

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

  public get campos():ArrayOfObjectsInterface[]{
    return this.camposTabla;
  }

  //ADMINISTRACION BASICA

  public EstaListo(tipo:string):boolean{
    let validador:boolean=false;
    switch(tipo){
      case "campos":
        validador = this.listoCampos;
      break;
      case "cargue":
        validador = this.listoCargue;
      break;
    }

    return validador;
  }

  public get todos():any[]{
    return  this.registros;
  }

  public Agregar(objeto:any):string{
    objeto.modo = "I";
    objeto.dbRef = "#"+this.consecutivoDbRefs;
    this.consecutivoDbRefs++;

    this.registros.push(objeto);
    this.posicionActual = this.cantidad - 1;
    
    return objeto.dbRef;
  }

  public Modificar(objeto:any){
    if (objeto.modo != "I") objeto.modo = "A";
    this.registros[this.posicionActual]=objeto;
  }

  public Eliminar( moveToFirst:boolean = true ){
    if( this.registros[this.posicionActual].modo == "I" ){
      this.registros.splice( this.posicionActual, 1 );
      this.Primero();
    }
    else{
      this.registros[this.posicionActual].modo = "E";
      if (moveToFirst) this.Primero();
    }
  }

  public LimpiarTodo(){
    this.registros.length = 0;
    this.posicionActual = null;
  }

  public Encontrar( nombreAtributo:string, valorBuscado:any, condicionInversa:boolean = false ): boolean{
    let actualTemporal = this.posicionActual;
    let encontrado:boolean = false;
    
    this.Primero();

    while(!this.esFin && !encontrado){
      if( !condicionInversa ){
        if(this.actual[nombreAtributo] == valorBuscado )  encontrado=true;
        else                                              this.Siguiente();
      }
      else{
        if(this.actual[nombreAtributo] != valorBuscado )  encontrado=true;
        else                                              this.Siguiente();
      }
    }

    if(!encontrado) this.posicionActual = actualTemporal;
    return encontrado;
  }

  public AgregarForanea(controlador:any){
    this.controladoresForaneos[controlador.nombreTabla] = controlador;
  }

  public ReemplazarForanea( nombre : string , controladorForanero : any ){
    return this.controladoresForaneos[nombre] = controladorForanero;
  }

  public TieneForanea(nombre:string){
    return (nombre in this.controladoresForaneos);
  }

  public CargarForanea( nombre : string, caracteristicas:any=null ){
    this.controladoresForaneos[nombre].CargarDesdeDB( true , "S", caracteristicas ).subscribe(  (respuesta:RespuestaInterface) => {  }); // Carge de foranea
  }

  public ObtenerForanea(nombreForaneo : string, registroAsociado :boolean = false, identificador: number = null, esIdentificadorForaneo = false){

    if(registroAsociado){
      if(identificador==null){
        this.controladoresForaneos[nombreForaneo].Encontrar("id", this.registros[this.posicionActual][nombreForaneo+"_id"]);
      }
      else{
        if(esIdentificadorForaneo){
          this.controladoresForaneos[nombreForaneo].Encontrar("id", identificador);
        }
        else{
          this.Encontrar("id", identificador);
          this.controladoresForaneos[nombreForaneo].Encontrar("id", this.registros[this.posicionActual][nombreForaneo+"_id"])
        }
      }
    }
    
    return this.controladoresForaneos[nombreForaneo];
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

    this.listoCampos = false;

    let datosEnviados = new HttpParams()
      .set("accion","obtener_campos")
      .set("tabla",this.nombreTabla)
      .set("conSeguridad", String(conToken) )  
   
    return this.llamadoHttp.get<any>( this.servicioAmbiente.GetUrlRecursos() + "pasarela.php",  { params: datosEnviados  }  ).pipe(
      map(
        (respuesta: RespuestaInterface) => {
          switch(respuesta.codigo){
            case 200:
              this.camposTabla = [];
              respuesta.mensaje.forEach(
                (campo:any) => {
                  this.camposTabla.push( campo );
                }
              );
              
              this.listoCampos=true;
            break;
          }

          return respuesta;
        }
      )
    );

  }

  public Recargar(): Observable<any>{
    const respuesta = this.CargarDesdeDB( this.datosCargue.conToken, this.datosCargue.modoCargue, this.datosCargue.caracteristicas );
    return respuesta;
  }

  public CargarDesdeDB(  conToken:boolean=true , modoCargue:string="S", caracteristicas:EstructuraConsultas = null): Observable<any> {
  
    this.listoCargue=false;

    let re1 = /\"/gi;
    let re2 = /{/gi;
    let re3 = /\}/gi;    
  
    let datosEnviados = new HttpParams()
      .set("accion","obtener_registros")
      .set("tabla",this.nombreTabla)
      .set("conSeguridad", String(conToken) )      
      .set("modo", modoCargue )                       //S = simple => consulta directa, A = avanzada => consulta con inner join
      .set("caracteristicas", JSON.stringify(caracteristicas));  

    const llamado = this.llamadoHttp.get<any>( this.servicioAmbiente.GetUrlRecursos() + "pasarela.php",  { params: datosEnviados  }  ).pipe(
      map(
        (respuesta: RespuestaInterface) => {
          if(respuesta.codigo == 200){
            this.LimpiarTodo();
            if(!isNull(respuesta.mensaje)){
              this.ProcesarRegistros(respuesta.mensaje, this, !isNull(caracteristicas) ? caracteristicas.listaColumnas : caracteristicas );

              this.datosCargue.caracteristicas = caracteristicas;
              this.datosCargue.conToken = conToken;
              this.datosCargue.modoCargue = modoCargue;

            }
            else{
              this.listoCargue=true;
            }
          }
          else{
            console.log(respuesta,"Controlador: "+this.nombreTabla)
          }
          return respuesta;
        }
      )
    );

    return llamado;

  }


  private ActualizarReferencias(datos:filtroInterface[]){

    let actualTemporal = this.posicionActual;
 
    this.Primero();

    while(!this.esFin){
      if(this.registros[this.posicionActual].dbRef != null  ){
        let modoRegistro = this.registros[this.posicionActual].modo;

        if(modoRegistro == "I"){
          datos.forEach(elemento => {
            if( elemento.dbRef == this.registros[this.posicionActual].dbRef ){
              this.registros[this.posicionActual].id = elemento.id;
              this.registros[this.posicionActual].dbRef = null;
            }
          });
        }

        if(modoRegistro == "E"){
          let nuevaPosicion = this.posicionActual - 1;
          this.registros.splice( this.posicionActual, 1 );
          this.posicionActual = nuevaPosicion;
        }

        if(modoRegistro == "I" || modoRegistro == "A"){
          this.registros[this.posicionActual].modo = null;
        }


      }

      this.Siguiente();
    }

    
    this.posicionActual = actualTemporal;

  }

  // protected ProcesarFechas(objeto:any, sentido:string){
  //   //ESTE METODO SE SOBRECARGA
  //   return objeto;
  // }

  private ProcesarRegistros( registrosRecibidos:any[], controladorActual:any, columnasSolicitadas:any ){
    if(controladorActual.listoCampos == false){
      window.setTimeout(controladorActual.ProcesarRegistros, 100, registrosRecibidos,controladorActual,columnasSolicitadas); /* this checks the flag every 100 milliseconds*/
    }
    else{
      let regExp = /\-/gi;

      registrosRecibidos.forEach(
        (registro:any) => {
          registro.dbRef=null;
          registro.modo=null;
          for (var campo in registro) {
            if(registro[campo]!=null){
              if( campo.search("_fecha") != -1 ){
                if( !isNull(registro[campo]) && (registro[campo] != "") )   registro[campo] = (registro[campo]).substr(0,4) + "-" + (registro[campo]).substr(5,2) + "-" + (registro[campo]).substr(8,2);
                else                                                        registro[campo] = "";
              }
              else{ 
                let datosCampo = controladorActual.campos.find((elemento: { nombre: string; }) => elemento.nombre == campo); 
                if(!isUndefined(datosCampo)){
                  let tipoDato = datosCampo.tipo;               
                  if( tipoDato == "int" || tipoDato == "bigint" || tipoDato == "decimal"){  registro[campo] = Number( registro[campo] ); }
                }
                else{ 
                  if(!isNull(columnasSolicitadas)){
                    let columna = columnasSolicitadas.find((elemento: { alias: string; }) => elemento.alias == campo ); 
                    if(!isUndefined(columna)){
                      if(columna.esNumerico){
                        let nuevoValor:any = Number(registro[campo]);
                        if( !isNaN(nuevoValor) ){
                          registro[campo] = nuevoValor;
                        }
                      }
                    }
                  }  
                }
              }
            }
          }
          controladorActual.registros.push(registro);
        }
      );

      if( registrosRecibidos.length > 0 ) controladorActual.posicionActual=0;
      controladorActual.listoCargue=true;
    }
  }

  private ProcesarFechasEnviadas(objeto:any){      
    let regExp = /\-/gi;
    for (var campo in objeto) {
      if( campo.search("_fecha") != -1 ){
        if( isNull(objeto[campo]) || (objeto[campo] == "") )    objeto[campo] = null;
        else                                                    objeto[campo] = objeto[campo].replace(regExp, "");
      }
    }
    return objeto;
  }

  private limpiarEliminados(){
    while ( this.Encontrar("modo","E") ){
      this.registros.splice( this.posicionActual, 1 );
      this.Primero();
    }
  }

  public Guardar(conToken:boolean=true ): Observable<any>{
    var aProcesar:any[] = [];
    var temporal:any;

    this.registros.forEach(registro => {
      if(registro.modo != null) {
        temporal = this.ProcesarFechasEnviadas(Object.assign({}, registro));
        aProcesar.push(temporal);        
      }
    });
    
    let parametros = {
      accion : "procesar_registros",
      tabla: this.nombreTabla,
      conSeguridad: conToken,      
      datos : aProcesar      
    };

    return this.llamadoHttp.post<any>( this.servicioAmbiente.GetUrlRecursos() + "pasarela.php", parametros).pipe(
      map(
        (respuesta: RespuestaInterface) => {
          if( respuesta.codigo == 200 ) this.ActualizarReferencias(respuesta.mensaje.dbRefs);
          return respuesta;
        }
      )
    );

  }




}
