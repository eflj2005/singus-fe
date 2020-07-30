import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';
import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { TiposdocumentosController } from '@controladores/tiposdocumentos.controller';
import { MunicipiosController } from '@controladores/municipios.controller';
import { ProgramasController } from '@controladores/programas.controller';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isNull } from 'util';

@Component({
  selector: 'app-cargues-componentes-analisistipo1',
  templateUrl: './cargues-componentes-analisistipo1.component.html',
  styleUrls: ['./cargues-componentes-analisistipo1.component.css']
})
export class CarguesComponentesAnalisistipo1Component implements OnInit {
  @Input() controlCargue : { [inndice:string] : any};

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
    programa: []
  }

  controladorTiposDocumentos: TiposdocumentosController;
  controladorMunicipios: MunicipiosController;
  controladorProgramas: ProgramasController;

  enProceso: boolean;

  constructor(
    private servicioAmbiente : AmbienteService,
    private llamadoHttp : HttpClient,
    private servicioEmergentes: NgbModal
  ) {
    this.enProceso = false;

    this.arregloNuevasPersonas = [];
    this.arregloNuevosEstudios = [];
    this.arregloCambios = [];

    this.controladorTiposDocumentos = new TiposdocumentosController( llamadoHttp , servicioAmbiente );
    this.controladorMunicipios = new MunicipiosController( llamadoHttp , servicioAmbiente );
    this.controladorProgramas = new ProgramasController( llamadoHttp , servicioAmbiente );

  }

  ngOnInit() {
    this.enProceso = true;

    this.controladorTiposDocumentos.CargarDesdeDB( ).subscribe( (respuestaTD:RespuestaInterface) => { } );           // Carge de Tipos de Documentos      
    this.controladorProgramas.CargarDesdeDB( ).subscribe( (respuestaP:RespuestaInterface) => {  } );       // Carge de Tipos de Documentos 
    this.controladorMunicipios.CargarDesdeDB( ).subscribe( (respuestaM:RespuestaInterface) => { } );          // Carge de Tipos de Documentos 

    this.controladorTiposDocumentos.EstaListo("cargue",true).subscribe( (valorTD:boolean) => {
      this.controladorProgramas.EstaListo("cargue",true).subscribe( (valorP:boolean) => {
        this.controladorMunicipios.EstaListo("cargue",true).subscribe( (valorM:boolean) => {
          if(valorTD && valorP && valorM){
            this.enProceso = false;
            this.AnalizarDatos();
          }
        });
      });
    });
   
  }

  AnalizarDatos(){
    var datosAnalizados: any[];

    this.BuscarCambiosMasivos();
    this.enProceso = true;

    datosAnalizados = this.controlCargue.datos;

    let parametros = {
      accion : "registros_cargue_tipo1",
      conSeguridad: true,
      modoCargue: 1,
      datos : datosAnalizados 
    };
   
    this.llamadoHttp.post<any>( this.servicioAmbiente.GetUrlRecursos() + "pasarela.php", parametros).subscribe(
      (respuesta: RespuestaInterface) => {
        if(respuesta.codigo == 200){

          this.arregloNuevasPersonas = [];
          this.arregloNuevosEstudios = [];
          this.arregloCambios = [];

          respuesta.mensaje.nuevasPersonas.forEach((registro: any, indice: any) => {          

            let posActual = 0;
            let encontrado = false;
            while(posActual < datosAnalizados.length && !encontrado ){
              if( registro == datosAnalizados[posActual].ref )  encontrado = true;
              else                                                  posActual++;
            }

            if(encontrado) this.arregloNuevasPersonas.push( datosAnalizados[posActual] );

          });

          respuesta.mensaje.nuevosEstudios.forEach((registro: any, indice: any) => {    

            let posActual = 0;
            let encontrado = false;
            while(posActual < datosAnalizados.length && !encontrado ){
              if( registro == datosAnalizados[posActual].ref )  encontrado = true;
              else                                              posActual++;
            }

            if(encontrado) this.arregloNuevosEstudios.push(  datosAnalizados[posActual]  );

          });
          
          respuesta.mensaje.personasCambios.forEach((registro: any, indice: any) => {    

            let posActual = 0;
            let encontrado = false;
            while(posActual < datosAnalizados.length && !encontrado ){
              if( registro.referencia == datosAnalizados[posActual].ref )  encontrado = true;
              else                                                         posActual++;
            }         

            let temporal  =Object.assign({},datosAnalizados[posActual]);
            temporal.cambios = registro.cambios;

            if(encontrado) this.arregloCambios.push(  temporal );

          });          

          this.enProceso = false;
        }
        else{
          console.log(respuesta);
          alert("Error en proceso de analisis")
          this.enProceso = false;
        }
        
      }
    );
  }

  BuscarCambiosMasivos(){
    var datosAnalizados: any[];
    var encontrado: boolean;

    this.enProceso = true;

    datosAnalizados = this.controlCargue.datos;

    this.cambiosMasivos.tipoDocumento = [];
    this.cambiosMasivos.expDocumento = [];
    this.cambiosMasivos.genero = [];
    this.cambiosMasivos.programa = [];

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

    });

    console.log(this.cambiosMasivos);

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
      !this.enProceso 
    );

    return validador;
  }

  HayCambiosMasivos(){
    let cantidad: number = this.cambiosMasivos.tipoDocumento.length + this.cambiosMasivos.expDocumento.length + this.cambiosMasivos.genero.length + this.cambiosMasivos.programa.length;
    return ( cantidad > 0 );
  }

  ControlBloqueoMasivos( registro:any ){
    if( isNull(registro.cambio) ) alert("No puede bloquear el control sin seleccionar una opción");
    else                          registro.bloqueo = !registro.bloqueo;
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

    this.controlCargue.datos.forEach( ( registro: any ) => {
      
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

    });
    this.enProceso = false;

    this.AnalizarDatos();
  }
  
  CambioRegistroMasivoTipoDocumento( registro: any, objeto:any ){
    registro.cambio_texto = objeto.sigla;
  }

  CambioRegistroMasivoOtro( registro: any, objeto:any ){
    registro.cambio_texto = objeto.descripcion;
  }

}
