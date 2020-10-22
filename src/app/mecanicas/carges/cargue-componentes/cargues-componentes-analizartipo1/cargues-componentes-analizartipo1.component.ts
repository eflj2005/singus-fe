import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';
import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { TiposdocumentosController } from '@controladores/tiposdocumentos.controller';
import { MunicipiosController } from '@controladores/municipios.controller';
import { ProgramasController } from '@controladores/programas.controller';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isNull } from 'util';
import { timer } from 'rxjs';
import { CarguesController } from '@controladores/cargues.controller';
import { CohortesController } from '@controladores/cohortes.controller';
import { TitulosController } from '@controladores/titulos.controller';

@Component({
  selector: 'app-cargues-componentes-analizartipo1',
  templateUrl: './cargues-componentes-analizartipo1.component.html',
  styleUrls: ['./cargues-componentes-analizartipo1.component.css']
})
export class CarguesComponentesAnalizartipo1Component implements OnInit {
  @Input() controlVisual : { [inndice:string] : any};
  @Input() controladorCargues: CarguesController;

  arregloNuevasPersonas: any[];
  arregloNuevosEstudios: any[];
  arregloCambios: any[];

  // seleccionarTodos: any = {
  //   nuevasPersonas: false,
  //   nuevosEstudios: false,
  //   conCambios: false
  // }

  cambiosMasivos:any = {
    tipoDocumento: [],
    expDocumento: [],
    genero: [],
    programa: [],
    cohorte: []
  }

  controladorTiposDocumentos: TiposdocumentosController;
  controladorMunicipios: MunicipiosController;
  controladorProgramas: ProgramasController;
  controladorCohortes: CohortesController;
  controladorTitulos: TitulosController;


  enProceso: boolean;

  progresoLocal: { valor: number, proceso: string } = { valor: 0, proceso: "" };

  constructor(
    private servicioAmbiente : AmbienteService,
    private llamadoHttp : HttpClient,
    private servicioEmergentes: NgbModal
  ) {
    this.enProceso = false;

    this.controladorTiposDocumentos = new TiposdocumentosController( llamadoHttp , servicioAmbiente );
    this.controladorMunicipios = new MunicipiosController( llamadoHttp , servicioAmbiente );
    this.controladorProgramas = new ProgramasController( llamadoHttp , servicioAmbiente );
    this.controladorCohortes = new CohortesController( llamadoHttp , servicioAmbiente );
    this.controladorTitulos = new TitulosController( llamadoHttp , servicioAmbiente );

  }

  ngOnInit() {
    this.enProceso = true;

    this.controlVisual.desactivarPasos.siguiente = false;
    this.controlVisual.desactivarPasos.anterior = false;
    this.controlVisual.desactivarPasos.inicio = true;
    this.controlVisual.controlPasos.anterior = false;
    this.controlVisual.controlPasos.siguiente = true;


    this.controladorCargues.adicionales = {
      arregloNuevasPersonas : [] ,
      arregloNuevosEstudios : [],
      arregloCambios: []
    }


    this.controladorTiposDocumentos.CargarDesdeDB( ).subscribe( (respuestaTD:RespuestaInterface) => { } );           // Carge de Tipos de Documentos      
    this.controladorProgramas.CargarDesdeDB( ).subscribe( (respuestaP:RespuestaInterface) => {  } );       // Carge de Programas 
    this.controladorMunicipios.CargarDesdeDB( ).subscribe( (respuestaM:RespuestaInterface) => { } );          // Carge de Municipios 
    this.controladorCohortes.CargarDesdeDB( ).subscribe( (respuestaC:RespuestaInterface) => { } );          // Carge de Cohortes 
    this.controladorTitulos.CargarDesdeDB( ).subscribe( (respuestaT:RespuestaInterface) => { } );          // Carge de Titulos 

    this.controladorTiposDocumentos.EstaListo("cargue",true).subscribe( (valorTD:boolean) => {
      this.controladorProgramas.EstaListo("cargue",true).subscribe( (valorP:boolean) => {
        this.controladorMunicipios.EstaListo("cargue",true).subscribe( (valorM:boolean) => {
          this.controladorCohortes.EstaListo("cargue",true).subscribe( (valorC:boolean) => {
            this.controladorTitulos.EstaListo("cargue",true).subscribe( (valorT:boolean) => {
              if(valorTD && valorP && valorM && valorC && valorT ){
                this.enProceso = false;
                this.AnalizarDatos();
              }
            });    
          });    
        });
      });
    });
   
  }

  AnalizarDatos(){
    var datosAnalizados: any[];
    let parametros:any = {};

    this.BuscarCambiosMasivos();
    this.enProceso = true;

    datosAnalizados = this.controladorCargues.datos;
  
    this.ActualizarProgresoLocal("Analizando Registros:", 100, 0 );      //Inicializa barra de proceso

    const temporizador = timer(0, 100);
    const subscripciónTemporizador = temporizador.subscribe( (valor: any) => { 
      this.ActualizarProgresoLocal("Segmentando Registros:", 100, valor );      //Actualiza Proceso barra de proceso
    });

    this.controladorCargues.ProcesarDatos(1, null).subscribe(
      (respuesta: RespuestaInterface) => { 

        this.controladorCargues.EstaListo().subscribe(
          (valor:boolean)=>{
            if(valor){

              subscripciónTemporizador.unsubscribe();
              this.enProceso = false;
              this.BuscarRepetidos();              
          
            }
          }
        );
       
      }      
    );
  }

  BuscarRepetidos(){
    this.enProceso = true;

    let pasosProceso: number;

    pasosProceso = this.controladorCargues.adicionales.arregloNuevasPersonas.length;                 //Base de conteo para barra de progreso
    this.ActualizarProgresoLocal("Buscando Repetidos 1/3:", pasosProceso, 0 );      //Inicializa barra de proceso
    this.controladorCargues.MarcarRepetidos( this.controladorCargues.adicionales.arregloNuevasPersonas,  ["SPRIDEN_ID"] , true );
    this.ActualizarProgresoLocal("Buscando Repetidos 1/3:", pasosProceso, pasosProceso);      //Actualiza Proceso barra de proceso

    pasosProceso = this.controladorCargues.adicionales.arregloNuevosEstudios.length;                 //Base de conteo para barra de progreso
    this.ActualizarProgresoLocal("Buscando Repetidos 2/3:", pasosProceso, 0 );      //Inicializa barra de proceso
    this.controladorCargues.MarcarRepetidos( this.controladorCargues.adicionales.arregloNuevosEstudios,  ["SPRIDEN_ID", "CARRERA"]  );
    this.ActualizarProgresoLocal("Buscando Repetidos 2/3:", pasosProceso, pasosProceso);      //Actualiza Proceso barra de proceso

    pasosProceso = this.controladorCargues.adicionales.arregloCambios.length;                 //Base de conteo para barra de progreso
    this.ActualizarProgresoLocal("Buscando Repetidos 3/3:", pasosProceso, 0 );      //Inicializa barra de proceso
    this.controladorCargues.MarcarRepetidos( this.controladorCargues.adicionales.arregloCambios, ["SPRIDEN_ID"] );
    this.ActualizarProgresoLocal("Buscando Repetidos 3/3:", pasosProceso, pasosProceso);      //Actualiza Proceso barra de proceso

    this.enProceso = false;
  }

  BuscarCambiosMasivos(){
    var datosAnalizados: any[];
    var encontrado: boolean;

    this.enProceso = true;

    datosAnalizados = this.controladorCargues.datos;

    this.cambiosMasivos.tipoDocumento = [];
    this.cambiosMasivos.expDocumento = [];
    this.cambiosMasivos.genero = [];
    this.cambiosMasivos.programa = [];

    let pasosProceso: number = datosAnalizados.length;                 //Base de conteo para barra de progreso
    this.ActualizarProgresoLocal("Buscando Cambios Masivos:", pasosProceso, 0 );      //Inicializa barra de proceso

    datosAnalizados.forEach((registro: any, indice: any) => {          
        
      encontrado = this.controladorTiposDocumentos.Encontrar( "descripcion", registro.TIPO_DOCUMENTO );
      if(!encontrado){
        encontrado = this.controladorTiposDocumentos.Encontrar( "sigla", registro.TIPO_DOCUMENTO );

        if(!encontrado) {
          let posActual = 0;
          let encontrado = false;
          while(posActual < this.cambiosMasivos.tipoDocumento.length && !encontrado ){
            if( registro.TIPO_DOCUMENTO == this.cambiosMasivos.tipoDocumento[posActual].valor )  encontrado = true;
            else                                                                                       posActual++;
          }
                
          if(encontrado)  this.cambiosMasivos.tipoDocumento[posActual].cantidad++;
          else            this.cambiosMasivos.tipoDocumento.push( { valor: registro.TIPO_DOCUMENTO , cantidad: 1, cambio_id: null, cambio_texto: null, bloqueo: false } );
        }
        else{
          registro.foraneas.tiposdocumentos_id = this.controladorTiposDocumentos.actual.id;
          registro.TIPO_DOCUMENTO = this.controladorTiposDocumentos.actual.sigla;
        }
      }
      else{
        registro.foraneas.tiposdocumentos_id = this.controladorTiposDocumentos.actual.id;
        registro.TIPO_DOCUMENTO = this.controladorTiposDocumentos.actual.sigla;
      }

      encontrado = this.controladorMunicipios.Encontrar( "descripcion", registro.CIUDAD_EXP_DOC.toUpperCase() );
      if(!encontrado) {
        let posActual = 0;
        let encontrado = false;
        while(posActual < this.cambiosMasivos.expDocumento.length && !encontrado ){
          if( registro.CIUDAD_EXP_DOC == this.cambiosMasivos.expDocumento[posActual].valor )  encontrado = true;
          else                                                                                      posActual++;
        }
              
        if(encontrado)  this.cambiosMasivos.expDocumento[posActual].cantidad++;
        else            this.cambiosMasivos.expDocumento.push( { valor: registro.CIUDAD_EXP_DOC , cantidad: 1, cambio_id: null, cambio_texto: null, bloqueo: false } );     
      }
      else{
        registro.foraneas.municipios_id = this.controladorMunicipios.actual.id;
      }

      if(registro.GENERO != "M" && registro.GENERO != "F") {
        let posActual = 0;
        let encontrado = false;
        while(posActual < this.cambiosMasivos.genero.length && !encontrado ){
          if( registro.GENERO == this.cambiosMasivos.genero[posActual].valor )  encontrado = true;
          else                                                                        posActual++;
        }
              
        if(encontrado)  this.cambiosMasivos.genero[posActual].cantidad++;
        else            this.cambiosMasivos.genero.push( { valor: registro.GENERO , cantidad: 1, cambio_id: null, cambio_texto: null, bloqueo: false } );        
      }               
        
      encontrado = this.controladorProgramas.Encontrar( "codigo", registro.CARRERA );
      if(!encontrado) {    
        let posActual = 0;
        let encontrado = false;
        while(posActual < this.cambiosMasivos.programa.length && !encontrado ){
          if( registro.CARRERA == this.cambiosMasivos.programa[posActual].valor )  encontrado = true;
          else                                                                      posActual++;
        }
              
        if(encontrado)  this.cambiosMasivos.programa[posActual].cantidad++;
        else            this.cambiosMasivos.programa.push( { valor: registro.CARRERA , cantidad: 1, cambio_id: null, cambio_texto: null, bloqueado: false } );
      }              
      else{
        registro.foraneas.programas_id = this.controladorProgramas.actual.id;
      }



      encontrado = this.controladorCohortes.Encontrar( "descripcion", registro.PER_GRADO );
      if(!encontrado) {    
        let posActual = 0;
        let encontrado = false;
        while(posActual < this.cambiosMasivos.cohorte.length && !encontrado ){
          if( registro.PER_GRADO == this.cambiosMasivos.cohorte[posActual].valor )  encontrado = true;
          else                                                                      posActual++;
        }
              
        if(encontrado)  this.cambiosMasivos.cohorte[posActual].cantidad++;
        else            this.cambiosMasivos.cohorte.push( { valor: registro.PER_GRADO , cantidad: 1, cambio_id: null, cambio_texto: null, bloqueado: false } );
      }              
      else{
        registro.foraneas.cohortes_id = this.controladorCohortes.actual.id;
      }



      encontrado = this.controladorCohortes.Encontrar( "descripcion", registro.PER_GRADO );
      if(!encontrado) {    
        let posActual = 0;
        let encontrado = false;
        while(posActual < this.cambiosMasivos.cohorte.length && !encontrado ){
          if( registro.PER_GRADO == this.cambiosMasivos.cohorte[posActual].valor )  encontrado = true;
          else                                                                      posActual++;
        }
              
        if(encontrado)  this.cambiosMasivos.cohorte[posActual].cantidad++;
        else            this.cambiosMasivos.cohorte.push( { valor: registro.PER_GRADO , cantidad: 1, cambio_id: null, cambio_texto: null, bloqueado: false } );
      }              
      else{
        registro.foraneas.cohortes_id = this.controladorCohortes.actual.id;
      }     

      
      this.ActualizarProgresoLocal("Buscando Cambios Masivos:", pasosProceso, indice+1 );      //Actualiza Proceso barra de proceso

    });

    this.enProceso = false;
  }
  

  ActivarModalCambiosMasivos( modalRecibido: any ){
    this.servicioEmergentes.open( modalRecibido, { size : 'xl', backdropClass: 'light-blue-backdrop', backdrop: "static"  } );
  }
  
  ValidarCampoEnObjeto( campo: string, objeto: any ){
    return ( campo in objeto);
  }

  EstoyListo(){
    let validador:boolean = false;

    validador = (
      this.controladorTiposDocumentos.EstaListo("cargue") &&
      this.controladorMunicipios.EstaListo("cargue")      &&
      this.controladorProgramas.EstaListo("cargue")       && 
      this.controladorCohortes.EstaListo("cargue")        &&
      !this.enProceso 
    );

    return validador;
  }

  HayCambiosMasivos(){
    let validador:boolean;
    let cantidad: number = this.cambiosMasivos.tipoDocumento.length + this.cambiosMasivos.expDocumento.length + this.cambiosMasivos.genero.length + this.cambiosMasivos.programa.length + this.cambiosMasivos.cohorte.length;
    
    validador =  ( cantidad > 0 );

    if( validador == true ) {
      this.controlVisual.desactivarPasos.siguiente = true;
    }
    else{
      if( this.HayRepetidos() )  this.controlVisual.desactivarPasos.siguiente = true;
      else                       this.controlVisual.desactivarPasos.siguiente = false;
    } 

    return validador;
  }

  HayRepetidos():boolean{
    let conteo: number = 0;

    conteo = conteo + this.controladorCargues.adicionales.arregloNuevasPersonas.filter((registro:any)=>{ return (registro.repetido) }).length;
    conteo = conteo + this.controladorCargues.adicionales.arregloNuevosEstudios.filter((registro:any)=>{ return (registro.repetido) }).length;
    conteo = conteo + this.controladorCargues.adicionales.arregloCambios.filter((registro:any)=>{ return (registro.repetido) }).length;
        
    return ( conteo > 0 );
  }

  ControlBloqueoMasivos( registro:any ){
    if( isNull(registro.cambio_id) )  alert("No puede bloquear el control sin seleccionar una opción");
    else                              registro.bloqueo = !registro.bloqueo;
  }

  PendientesMasivos(){
    let conteo:number = 0;
    conteo = conteo + this.cambiosMasivos.tipoDocumento.filter((registro:any) => { return (registro.bloqueo == false) }).length;
    conteo = conteo + this.cambiosMasivos.expDocumento.filter((registro:any) => { return (registro.bloqueo == false) }).length;
    conteo = conteo + this.cambiosMasivos.genero.filter((registro:any) => { return (registro.bloqueo == false) }).length;
    conteo = conteo + this.cambiosMasivos.programa.filter((registro:any) => { return (registro.bloqueo == false) }).length;

    return ( conteo > 0 );
  }


  AplicarCambiosMasivos(modalRecibido: any){
    this.enProceso = true;
    modalRecibido.dismiss('CANCELAR');

    let posActual = 0;
    let encontrado = false;

    let pasosProceso: number = this.controladorCargues.datos.length;                 //Base de conteo para barra de progreso
    this.ActualizarProgresoLocal("Aplicando Cambios Masivos:", pasosProceso, 0 );      //Inicializa barra de proceso


    this.controladorCargues.datos.forEach( ( registro: any, indice: any ) => {
      
      posActual = 0;
      encontrado = false;
      while(posActual < this.cambiosMasivos.tipoDocumento.length && !encontrado ){
        if( registro.TIPO_DOCUMENTO == this.cambiosMasivos.tipoDocumento[posActual].valor )  encontrado = true;
        else                                                                                 posActual++;
      }
      if(encontrado){
         registro.TIPO_DOCUMENTO = this.cambiosMasivos.tipoDocumento[posActual].cambio_texto;
         registro.foraneas.tiposdocumentos_id = this.cambiosMasivos.tipoDocumento[posActual].cambio_id;
      }

      posActual = 0;
      encontrado = false;
      while(posActual < this.cambiosMasivos.expDocumento.length && !encontrado ){
        if( registro.CIUDAD_EXP_DOC == this.cambiosMasivos.expDocumento[posActual].valor )  encontrado = true;
        else                                                                                posActual++;
      }
      if(encontrado){
        registro.CIUDAD_EXP_DOC = this.cambiosMasivos.expDocumento[posActual].cambio_texto;
        registro.foraneas.municipios_id = this.cambiosMasivos.expDocumento[posActual].cambio_id;
     }      

      posActual = 0;
      encontrado = false;
      while(posActual < this.cambiosMasivos.genero.length && !encontrado ){
        if( registro.GENERO == this.cambiosMasivos.genero[posActual].valor )  encontrado = true;
        else                                                                  posActual++;
      }
      if(encontrado)  registro.GENERO = this.cambiosMasivos.genero[posActual].cambio_id;  

      posActual = 0;
      encontrado = false;
      while(posActual < this.cambiosMasivos.programa.length && !encontrado ){
        if( registro.CARRERA == this.cambiosMasivos.programa[posActual].valor )  encontrado = true;
        else                                                                     posActual++;
      }
      if(encontrado)  registro.CARRERA = this.cambiosMasivos.programa[posActual].cambio; 
      if(encontrado){
        registro.CARRERA = this.cambiosMasivos.programa[posActual].cambio_texto;
        registro.foraneas.programas_id = this.cambiosMasivos.programa[posActual].cambio_id;
     } 

     this.ActualizarProgresoLocal("Aplicando Cambios Masivos:", pasosProceso, indice+1 );      //Actualiza Proceso barra de proceso

    });
    this.enProceso = false;

    this.AnalizarDatos();
  }

  CambioRegistroMasivo( registro: any, valor: number, tipoElemento: string ){
    switch(tipoElemento){
      case "documento":
        this.controladorTiposDocumentos.Encontrar("id",valor);
        registro.cambio_id = valor;
        registro.cambio_texto = this.controladorTiposDocumentos.actual.sigla;
      break;
      case "expedicion":
        this.controladorMunicipios.Encontrar("id",valor);
        registro.cambio_id = valor;
        registro.cambio_texto = this.controladorMunicipios.actual.descripcion;
      break;
      case "programa":
        this.controladorProgramas.Encontrar("id",valor);
        registro.cambio_id = valor;
        registro.cambio_texto = this.controladorProgramas.actual.descripcion;
      break;
    }
  }

  ActualizarProgresoLocal( nombreProceso: string, totalPasos: number, pasoActual: number ){
    this.progresoLocal.proceso = nombreProceso;
    if( totalPasos!= 0 )  this.progresoLocal.valor = (pasoActual * 100 ) / totalPasos;
    else                  this.progresoLocal.valor = 100;
  }

  AsignarMedellin(){
    this.cambiosMasivos.expDocumento.forEach((registro:any) => {
      registro.cambio_id = "5005";
      registro.cambio_texto = "MEDELLIN";
      registro.bloqueo = true;
    });
  }

}
