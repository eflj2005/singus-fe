import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@servicios/ambiente.service';
import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { TiposdocumentosController } from '@controladores/tiposdocumentos.controller';
import { MunicipiosController } from '@controladores/municipios.controller';
import { ProgramasController } from '@controladores/programas.controller';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    this.arregloNuevasPersonas = [];
    this.arregloNuevosEstudios = [];
    this.arregloCambios = [];

    this.controladorTiposDocumentos = new TiposdocumentosController( llamadoHttp , servicioAmbiente );
    this.controladorMunicipios = new MunicipiosController( llamadoHttp , servicioAmbiente );
    this.controladorProgramas = new ProgramasController( llamadoHttp , servicioAmbiente );

    this.controladorTiposDocumentos.CargarDesdeDB( ).subscribe( (respuestaTD:RespuestaInterface) => { } );           // Carge de Tipos de Documentos      
    this.controladorProgramas.CargarDesdeDB( ).subscribe( (respuestaP:RespuestaInterface) => { } );       // Carge de Tipos de Documentos 
    this.controladorMunicipios.CargarDesdeDB( ).subscribe( (respuestaM:RespuestaInterface) => { } );          // Carge de Tipos de Documentos 

    this.enProceso = false;

   }

  ngOnInit() {
    this.enProceso = true;
    this.AnalizarDatos();
  }

  AnalizarDatos(){
    var datosAnalizados: any[];

    datosAnalizados = this.controlCargue.datos;


    let parametros = {
      accion : "registros_cargue_tipo1",
      conSeguridad: true,
      modoCargue: 1,
      datos : datosAnalizados 
    };

    console.log(parametros);
    
    this.llamadoHttp.post<any>( this.servicioAmbiente.GetUrlRecursos() + "pasarela.php", parametros).subscribe(
      (respuesta: RespuestaInterface) => {
        if(respuesta.codigo == 200){
          console.log(respuesta);
          
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

          this.cambiosMasivos.tipoDocumento = [];
          this.cambiosMasivos.expDocumento = [];
          this.cambiosMasivos.genero = [];
          this.cambiosMasivos.programa = [];
          
          respuesta.mensaje.personasCambios.forEach((registro: any, indice: any) => {    

            let posActual = 0;
            let encontrado = false;
            while(posActual < datosAnalizados.length && !encontrado ){
              if( registro.referencia == datosAnalizados[posActual].ref )  encontrado = true;
              else                                                         posActual++;
            }         

            if(encontrado) {
              let temporal  =datosAnalizados[posActual];
              temporal.cambios = registro.cambios;

              this.arregloCambios.push( temporal );

              if( 'TIPO_DOCUMENTO' in temporal.cambios ){                              
                let encontrado: boolean;
                
                encontrado = this.controladorTiposDocumentos.Encontrar( "descripcion", temporal.TIPO_DOCUMENTO );

                if(!encontrado) {
                  let posActual = 0;
                  let encontrado = false;
                  while(posActual < this.cambiosMasivos.tipoDocumento.length && !encontrado ){
                    if( temporal.TIPO_DOCUMENTO == this.cambiosMasivos.tipoDocumento[posActual].descripcion )  encontrado = true;
                    else                                                                                       posActual++;
                  }
                        
                  if(encontrado)  this.cambiosMasivos.tipoDocumento[posActual].cantidad++;
                  else            this.cambiosMasivos.tipoDocumento.push( { descripcion: temporal.TIPO_DOCUMENTO , cantidad: 1 } );
                }
              }
              if( 'CIUDAD_EXP_DOC' in temporal.cambios ){
                let encontrado: boolean;
                
                encontrado = this.controladorMunicipios.Encontrar( "descripcion", temporal.CIUDAD_EXP_DOC.toUpperCase() );

                if(!encontrado) {
                  let posActual = 0;
                  let encontrado = false;
                  while(posActual < this.cambiosMasivos.expDocumento.length && !encontrado ){
                    if( temporal.CIUDAD_EXP_DOC == this.cambiosMasivos.expDocumento[posActual].descripcion )  encontrado = true;
                    else                                                                                      posActual++;
                  }
                        
                  if(encontrado)  this.cambiosMasivos.expDocumento[posActual].cantidad++;
                  else            this.cambiosMasivos.expDocumento.push( { descripcion: temporal.CIUDAD_EXP_DOC , cantidad: 1 } );     
                }
              }
              if( 'GENERO' in temporal.cambios ){
                if(temporal.GENERO != "M" && temporal.GENERO != "F") {
                  let posActual = 0;
                  let encontrado = false;
                  while(posActual < this.cambiosMasivos.genero.length && !encontrado ){
                    if( temporal.GENERO == this.cambiosMasivos.genero[posActual].descripcion )  encontrado = true;
                    else                                                                        posActual++;
                  }
                        
                  if(encontrado)  this.cambiosMasivos.genero[posActual].cantidad++;
                  else            this.cambiosMasivos.genero.push( { descripcion: temporal.GENERO , cantidad: 1 } );        
                }               
              }
              if( 'CARRERA' in temporal.cambios ){
                let encontrado: boolean;
                
                encontrado = this.controladorProgramas.Encontrar( "codigo", temporal.CARRERA );

                if(!encontrado) {
                  let posActual = 0;
                  let encontrado = false;
                  while(posActual < this.cambiosMasivos.programa.length && !encontrado ){
                    if( temporal.CARRERA == this.cambiosMasivos.programa[posActual].codigo )  encontrado = true;
                    else                                                                      posActual++;
                  }
                        
                  if(encontrado)  this.cambiosMasivos.programa[posActual].cantidad++;
                  else            this.cambiosMasivos.programa.push( { codigo: temporal.CARRERA , cantidad: 1 } );
                }              
              }
            }

          });          


          console.log(this.arregloNuevasPersonas);
          console.log(this.arregloNuevosEstudios);
          console.log(this.arregloCambios);

          console.log(respuesta.mensaje.personasCambios);

          console.log(this.cambiosMasivos);
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

}
