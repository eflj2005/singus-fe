import { Component, OnInit } from '@angular/core';
import { AmbienteService } from '@servicios/ambiente.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

import { EstructuraConsultas } from '@generales/estructura-consultas';

import { PersonasController } from '@controladores/personas.controller';
import { CorreosController } from '@controladores/correos.controller';
import { TelefonosController } from '@controladores/telefonos.controller';
import { PersonasInterface } from '@interfaces/personas.interface';
import { TelefonosInterface } from '@interfaces/telefonos.interface';
import { CorreosInterface } from '@interfaces/correos.interface';
import { DatePipe } from '@angular/common';
import { DireccionesController } from '@controladores/direcciones.controller';
import { DireccionesInterface } from '@interfaces/direcciones.interface';
import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { EstudiosController } from '@controladores/estudios.controller';
import { EstudiosInterface } from '@interfaces/estudios.interface';
import { MunicipiosController } from '@controladores/municipios.controller';
import { ExperienciasController } from '@controladores/experiencias.controller';
import { ExperienciasInterface } from '@interfaces/experiencias.interface';
import { AsociacionesController } from '@controladores/asociaciones.controller';
import { ReconocimientosController } from '@controladores/reconocimientos.controller';
import { AsociacionesInterface } from '@interfaces/asociaciones.interface';
import { ReconocimientosInterface } from '@interfaces/reconocimientos.interface';


import * as moment from 'moment';
import { IfStmt } from '@angular/compiler';

interface Trabajo {
  name: string;
  flag: string;
  area: number;
  population: number;
}

interface PersonaCompletoInterface extends PersonasInterface{
  correoPersonal : string;
  correoInstitucional : string;
  telefonoCelular: number;
  telefonoFijo: number;
  direccionResidencia: string;
  municipioResidencia: string;
}

@Component({
  selector: 'personas-actualizacion-informacion',
  templateUrl: './personas-actualizacion-informacion.component.html',
  styleUrls: ['./personas-actualizacion-informacion.component.css']
})
export class PersonasActualizacionInformacionComponent implements OnInit {

  personaId:number;

  tipoHistorico : number ;
  tituloHistorico : string;
  nuevoValorHistorico:any = { };
  parametrosHistorico:any = { };

  grupoDatos : any = { } ;

  controladorPersonas: PersonasController;
  controladorCorreos: CorreosController;
  controladorTelefonos: TelefonosController;
  controladorDirecciones: DireccionesController;

  controladorEstudios: EstudiosController;

  controladorExperiencias: ExperienciasController;

  controladorAsociaciones: AsociacionesController;

  controladorReconocimientos: ReconocimientosController;

  datosPersona:PersonaCompletoInterface = {
    id: null,
    nacimiento_fecha: "",
    iduniminuto: null,
    nombres: "",
    apellidos: "",
    genero: "",
    tiposdocoumentos_id: null,
    documento: null,
    municipios_id: null,
    correoPersonal : "",
    correoInstitucional : "",
    telefonoCelular: null,
    telefonoFijo: null,
    direccionResidencia: "",
    municipioResidencia: "",
    registro_fecha: null,
    actualizacion_fecha: null,
    desempleado: "N",
    permitecontactar: "N",
    encuestaole: "N",
    habeasdata: "N"
  };

  datosTelefonos:TelefonosInterface[];
  datosCorreos:CorreosInterface[];
  datosDirecciones:DireccionesInterface[];
  datosEstudios:EstudiosInterface[];
  datosExperiencias:ExperienciasInterface[];
  datosAsociaciones:AsociacionesInterface[];
  datosReconocimientos:ReconocimientosInterface[]

  descripcionProyecto : any ="BICIBAGUÉ: Iniciativa que busca incentivar la práctica del tursimo en bicicleta, el desarrollo social y la tecnología";
  descripcionPrograma : any ="BICIBAGUÉ: Iniciativa que busca incentivar la práctica del tursimo en bicicleta, el desarrollo social y la tecnología";

  correoModelo:string;
  numeroModelo:string;
  calificacionModelo:string;

  notificacionActiva:boolean=false;
  notificacionMensaje:string ="";

  huboCambios : boolean = false ;

  procesando: boolean = false;

  constructor(
    private servicioAmbiente : AmbienteService,
    private llamadoHttp : HttpClient,
    private router: Router, 
    private modal: NgbModal, 
    private utilidadFechas: DatePipe
  ) {

    console.log(this.servicioAmbiente.controlMecanicasPersonas.origen);

    this.correoModelo="^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$";
    this.numeroModelo="^[0-9]*$";
    this.calificacionModelo = "^[0-5]+(.[0-9]+)?$";

    this.nuevoValorHistorico = {
      "valorA" : "",
      "valorB" : "",
      "valorC" : "",
      "valorD" : ""            
    };
  
    this.parametrosHistorico = {};

    let caracteristicasConsultas:EstructuraConsultas;

    // console.log(this.servicioAmbiente);

    this.personaId = this.servicioAmbiente.controlMecanicasPersonas.datos.id;

    this.controladorPersonas = new PersonasController( llamadoHttp , servicioAmbiente );
    this.controladorCorreos = new CorreosController( llamadoHttp , servicioAmbiente );
    this.controladorTelefonos = new TelefonosController( llamadoHttp , servicioAmbiente );
    this.controladorDirecciones= new DireccionesController( llamadoHttp , servicioAmbiente );
    this.controladorEstudios= new EstudiosController( llamadoHttp , servicioAmbiente );   
    this.controladorExperiencias= new ExperienciasController( llamadoHttp , servicioAmbiente );
    this.controladorAsociaciones= new AsociacionesController( llamadoHttp , servicioAmbiente );
    this.controladorReconocimientos= new ReconocimientosController( llamadoHttp , servicioAmbiente );

    caracteristicasConsultas = new EstructuraConsultas();
    caracteristicasConsultas.AgregarColumna( null , "( SELECT numero FROM telefonos WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM telefonos WHERE personas_id = personas.id AND tipo = 'C' ) AND tipo = 'C' LIMIT 1 )" ,                                                           "telefonoCelular" );
    caracteristicasConsultas.AgregarColumna( null , "( SELECT numero FROM telefonos WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM telefonos WHERE personas_id = personas.id AND tipo = 'F' ) AND tipo = 'F' LIMIT 1 )" ,                                                           "telefonoFijo" );    
    caracteristicasConsultas.AgregarColumna( null , "( SELECT correo FROM correos WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM correos WHERE personas_id = personas.id AND tipo = 'I' ) AND tipo = 'I' LIMIT 1 )" ,                                                               "correoInstitucional" );
    caracteristicasConsultas.AgregarColumna( null , "( SELECT correo FROM correos WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM correos WHERE personas_id = personas.id AND tipo = 'P' ) AND tipo = 'P' LIMIT 1 )" ,                                                               "correoPersonal" );   
    caracteristicasConsultas.AgregarColumna( null , "( SELECT direccion FROM direcciones WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM direcciones WHERE personas_id = personas.id ) LIMIT 1 )" ,                                                                                  "direccionResidencia" );   
    caracteristicasConsultas.AgregarColumna( null , "( SELECT municipios.descripcion FROM  direcciones INNER JOIN municipios ON municipios.id = direcciones.municipios_id WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM direcciones WHERE personas_id = personas.id ) LIMIT 1)" ,  "municipioResidencia" );   
    caracteristicasConsultas.AgregarFiltro( "personas" , "id" , "=", String(this.personaId) );
    this.controladorPersonas.CargarDesdeDB( true, "A", caracteristicasConsultas ).subscribe( (respuestaP:RespuestaInterface) => {                // Carge de datos basicos
      this.datosPersona = this.controladorPersonas.actual;  
      
      this.controladorPersonas.CargarForanea("tiposdocumentos");           // Carge de foranea de personas -> tipos documentos
      this.controladorPersonas.CargarForanea("municipios", new EstructuraConsultas( "O",  "descripcion"  , "ASC") );                                                               // Carge de foranea de municipios -> personas
      this.controladorPersonas.ObtenerForanea("municipios").CargarForanea("departamentos", new EstructuraConsultas( "O",  "descripcion"  , "ASC") );                               // Carge de foranea de Departamentos -> municipios -> personas
      this.controladorPersonas.ObtenerForanea("municipios").ObtenerForanea("departamentos").CargarForanea("paises", new EstructuraConsultas( "O",  "descripcion"  , "ASC") );      // Carge de foranea de paises ->dDepartamentos -> municipios -> personas
      

      caracteristicasConsultas = new EstructuraConsultas( "F", null , "personas_id" , "=" , String(this.personaId) );
      caracteristicasConsultas.AgregarOrdenamiento( "registro_fecha" , "DESC" );

      this.controladorCorreos.CargarDesdeDB( true, "S", caracteristicasConsultas ).subscribe( (respuestaC:RespuestaInterface) => {           // Carge de correos
        this.datosCorreos =  this.controladorCorreos.todos;  
      });

      this.controladorTelefonos.CargarDesdeDB( true, "S", caracteristicasConsultas ).subscribe( (respuestaT:RespuestaInterface) => {       // Carge de telefonos
        this.datosTelefonos =  this.controladorTelefonos.todos;
      });      

      this.controladorDirecciones.CargarDesdeDB( true, "S", caracteristicasConsultas ).subscribe( (respuestaT:RespuestaInterface) => {       // Carge de direcciones
        this.controladorDirecciones.ReemplazarForanea( "municipios" , this.controladorPersonas.ObtenerForanea("municipios") );      
        this.datosDirecciones =  this.controladorDirecciones.todos;
      });


      caracteristicasConsultas = new EstructuraConsultas( "F", null , "personas_id" , "=" , String(this.personaId) );
      caracteristicasConsultas.AgregarOrdenamiento( "grado_fecha" , "DESC" );
      this.controladorEstudios.CargarDesdeDB( true, "S", caracteristicasConsultas ).subscribe( (respuestaES:RespuestaInterface) => {           // Carge de estudios
        this.controladorEstudios.CargarForanea("titulos");
        this.controladorEstudios.CargarForanea("sedes");
        this.controladorEstudios.ObtenerForanea("sedes").CargarForanea("instituciones");
        this.controladorEstudios.CargarForanea("mecanismosgrados");
        this.controladorEstudios.CargarForanea("cohortes");
  
        this.controladorEstudios.CargarForanea("ofertas");
        this.controladorEstudios.ObtenerForanea("ofertas").CargarForanea("tiposestudios");
        this.controladorEstudios.ObtenerForanea("ofertas").ReemplazarForanea("instituciones",this.controladorEstudios.ObtenerForanea("sedes").ObtenerForanea("instituciones"));
        this.controladorEstudios.ObtenerForanea("ofertas").CargarForanea("programas");
  
        this.datosEstudios = this.controladorEstudios.todos;

        caracteristicasConsultas = new EstructuraConsultas( "F", null , "personas_id" , "=" , String(this.personaId) );
        caracteristicasConsultas.AgregarOrdenamiento( "vinculacion_fecha" , "DESC" );
        this.controladorExperiencias.CargarDesdeDB( true, "S", caracteristicasConsultas ).subscribe( (respuestaEX:RespuestaInterface) => {           // Carge de experiencias    
          this.controladorExperiencias.ReemplazarForanea("estudios", this.controladorEstudios);     //Se recicla controlador de estudios
          this.controladorExperiencias.CargarForanea("rangosingresos");
          this.controladorExperiencias.CargarForanea("sectoreslaborales");
          this.controladorExperiencias.CargarForanea("tiposcontratos");
          this.controladorExperiencias.ReemplazarForanea( "municipios" , this.controladorPersonas.ObtenerForanea("municipios") );
    
          this.datosExperiencias = this.controladorExperiencias.todos;
        });           



      });   
   
      caracteristicasConsultas = new EstructuraConsultas( "F", null , "personas_id" , "=" , String(this.personaId) );
      caracteristicasConsultas.AgregarOrdenamiento( "ingreso_fecha" , "DESC" );
      this.controladorAsociaciones.CargarDesdeDB( true, "S", caracteristicasConsultas ).subscribe( (respuestaAS:RespuestaInterface) => {           // Carge de experiencias    
        this.controladorAsociaciones.CargarForanea("sectoresasociaciones");
  
        this.datosAsociaciones = this.controladorAsociaciones.todos;
      });
  
      caracteristicasConsultas = new EstructuraConsultas( "F", null , "personas_id" , "=" , String(this.personaId) );
      caracteristicasConsultas.AgregarOrdenamiento( "momento_fecha" , "DESC" );
      this.controladorReconocimientos.CargarDesdeDB( true, "S", caracteristicasConsultas ).subscribe( (respuestaAS:RespuestaInterface) => {           // Carge de experiencias    
  
        this.datosReconocimientos = this.controladorReconocimientos.todos;
      });

    });

 

    this.cambiarGrupoDatos( 1 );

  }

  ngOnInit() {
 

  }

  EstoyListo(){
    let validador:boolean = false;

    validador = (
      this.controladorPersonas.estaListo("cargue")                                                                                         &&
      this.controladorPersonas.ObtenerForanea("tiposdocumentos").estaListo("cargue")                                                       &&
      this.controladorPersonas.ObtenerForanea("municipios").estaListo("cargue")                                                            &&
      this.controladorPersonas.ObtenerForanea("municipios").ObtenerForanea("departamentos").estaListo("cargue")                            &&
      this.controladorPersonas.ObtenerForanea("municipios").ObtenerForanea("departamentos").ObtenerForanea("paises").estaListo("cargue")   &&
      this.controladorCorreos.estaListo("cargue")                                                                                          &&
      this.controladorTelefonos.estaListo("cargue")                                                                                        &&
      this.controladorDirecciones.estaListo("cargue")                                                                                      &&
      this.controladorEstudios.estaListo("cargue")                                                                                         &&
      this.controladorEstudios.ObtenerForanea("titulos").estaListo("cargue")                                                               &&
      this.controladorEstudios.ObtenerForanea("sedes").estaListo("cargue")                                                                 &&
      this.controladorEstudios.ObtenerForanea("sedes").ObtenerForanea("instituciones").estaListo("cargue")                                 &&
      this.controladorEstudios.ObtenerForanea("mecanismosgrados").estaListo("cargue")                                                      &&
      this.controladorEstudios.ObtenerForanea("cohortes").estaListo("cargue")                                                              &&
      this.controladorEstudios.ObtenerForanea("ofertas").estaListo("cargue")                                                               &&
      this.controladorEstudios.ObtenerForanea("ofertas").ObtenerForanea("tiposestudios").estaListo("cargue")                               &&
      this.controladorEstudios.ObtenerForanea("ofertas").ObtenerForanea("programas").estaListo("cargue")                                   &&
      this.controladorExperiencias.estaListo("cargue")                                                                                     &&
      this.controladorExperiencias.ObtenerForanea("rangosingresos").estaListo("cargue")                                                    &&
      this.controladorExperiencias.ObtenerForanea("sectoreslaborales").estaListo("cargue")                                                 &&
      this.controladorExperiencias.ObtenerForanea("tiposcontratos").estaListo("cargue")                                                    &&
      this.controladorAsociaciones.estaListo("cargue")                                                                                     &&
      this.controladorAsociaciones.ObtenerForanea("sectoresasociaciones").estaListo("cargue")                                              &&
      this.controladorReconocimientos.estaListo("cargue") 
      
    );

    return validador;
  }

  DiferenciaFechas2( fechaInicial:string, fechaFinal:string, intervalo:string ){
    let fechaI = moment(fechaInicial);
    let fechaF = moment(fechaFinal);
    let resultado:number;
    let texto:string ="";


    switch(intervalo){
      case "dias":
        resultado = fechaF.diff(fechaI, 'days');
        texto = "d";
      break;
      case "meses":
        resultado = fechaF.diff(fechaI, 'months');
        texto = "m";          
      break;
      case "años":
        resultado = fechaF.diff(fechaI, 'years');
        texto = "a";          
      break;      
    }
    
    if(  isNaN(resultado )){
      resultado = 0;
    }

    return resultado + texto;
  }

  DiferenciaFechas1( fechaInicial:string, fechaFinal:string ){
    let fechaI = moment(fechaInicial);
    let fechaF = moment(fechaFinal);
    let resultadoD:number;
    let resultadoM:number;
    let resultadoA:number;
    let resultado:string;
    let texto:string ="";


    resultadoD = fechaF.diff(fechaI, 'days');
    if(  isNaN(resultadoD) )  resultadoD = 0;

    resultadoM = fechaF.diff(fechaI, 'months');
    if(  isNaN(resultadoM) )  resultadoM = 0;

    resultadoA = fechaF.diff(fechaI, 'years');
    if(  isNaN(resultadoA) )  resultadoA = 0;
    


    return resultado;
  }


  Regresar(){
    this.servicioAmbiente.controlMecanicasPersonas.modo = 1

    this.router.navigateByUrl(this.servicioAmbiente.controlMecanicasPersonas.origen);
  }

  cambiarGrupoDatos( posicion : number ){
    switch (posicion) {
      case 1:
        this.grupoDatos.nombre = "Datos personales";
        this.grupoDatos.posicion= 1;
      break;
      case 2:
        this.grupoDatos.nombre = "Estudios";
        this.grupoDatos.posicion= 2;
      break;
      case 3:
        this.grupoDatos.nombre = "Empleos";
        this.grupoDatos.posicion= 3;
      break;
      case 4:
        this.grupoDatos.nombre = "Logros Personales";
        this.grupoDatos.posicion= 4;
      break;
      case 5:
        this.grupoDatos.nombre = "Otros Datos";
        this.grupoDatos.posicion= 5;
      break;      
    }
  }

  Actualizar(){
    this.router.navigateByUrl("/agendamiento");
  }


  ActivarModalHistoricos( modalRecibido : any , tipoHistoricoRecibido : number, idHistorico?: Number ){
    this.tipoHistorico = tipoHistoricoRecibido;
    let buscado:boolean;

    switch (tipoHistoricoRecibido) {
      case 1:
        this.tituloHistorico = "Correos Personales";
        this.parametrosHistorico = { "lista" : [] , "descripcionA": "correo", "modeloValidacionA" : this.correoModelo };        
      break;
      case 2:
        this.tituloHistorico = "Direcciones";
        this.parametrosHistorico = { "lista" : [] , "descripcionA": "direccion", "modeloValidacionA" : "" , "descripcionB": "municipio", "modeloValidacionB" : "" };                
      break;       
      case 3:
        this.tituloHistorico = "Telefonos Fijos";
        this.parametrosHistorico = { "lista" : [] , "descripcionA": "telefono", "modeloValidacionA" : this.numeroModelo };                
      break;      
      case 4:
        this.tituloHistorico = "Telefonos Celulares";
        this.parametrosHistorico = { "lista" : [] , "descripcionA": "celular", "modeloValidacionA" : this.numeroModelo };                
      break;      
      case 5:
        this.tituloHistorico = "Estudios";
        this.parametrosHistorico = { "lista" : {} , "id": idHistorico, "instituciones_id": "", "programas_id": "", "tiposestudios_id": "" };              

        buscado = this.controladorEstudios.Encontrar("id",idHistorico);                                 

        if(buscado)  {
          this.parametrosHistorico["lista"] = this.controladorEstudios.actual;
          this.parametrosHistorico["instituciones_id"] = this.controladorEstudios.ObtenerForanea('ofertas',true).actual.instituciones_id;
          this.parametrosHistorico["programas_id"] = this.controladorEstudios.ObtenerForanea('ofertas',true).actual.programas_id;
          this.parametrosHistorico["tiposestudios_id"] = this.controladorEstudios.ObtenerForanea('ofertas',true).actual.tiposestudios_id;
        }
        else{
          let registro: EstudiosInterface = {
            id                    : null,
            personas_id           : this.personaId,
            cohortes_id           : null,
            titulos_id            : null,
            grado_fecha           : null,
            mecanismosgrados_id   : null,
            descripcionmecanismo  : null,
            ofertas_id            : null,
            sedes_id              : null,
            registro_fecha        : null,
            promedio              : null,
            acta                  : null,
            libro                 : null,
            folio                 : null,
            diploma               : null,
            modo                  : null,
            dbRef                 : null
          }
          this.parametrosHistorico.lista = registro;  
        }

        this.ValidarHistorico("estudios");
      break;      
      case 6:
        this.tituloHistorico = "Experiencia Laboral";
        this.parametrosHistorico = { "lista" : {} , "id": idHistorico, "paises_id": "", "departamentos_id": "" };              
        
        buscado = this.controladorExperiencias.Encontrar("id",idHistorico);                                 
        if(buscado)  {
          this.parametrosHistorico["lista"] = Object.assign({}, this.controladorExperiencias.actual);
          this.parametrosHistorico["departamentos_id"] = this.controladorExperiencias.ObtenerForanea("municipios",true).actual.departamentos_id;
          this.parametrosHistorico["paises_id"] = this.controladorExperiencias.ObtenerForanea("municipios",true).ObtenerForanea("departamentos",true).actual.paises_id;
        }
        else{
          buscado = this.controladorExperiencias.Encontrar("dbRef",idHistorico);
          if(buscado)  {
            this.parametrosHistorico["lista"] =  this.controladorExperiencias.actual;
            this.parametrosHistorico["departamentos_id"] = this.controladorExperiencias.ObtenerForanea("municipios",true).actual.departamentos_id;
            this.parametrosHistorico["paises_id"] = this.controladorExperiencias.ObtenerForanea("municipios",true).ObtenerForanea("departamentos",true).actual.paises_id;
          }
        }

        if(!buscado){
          let registro: ExperienciasInterface = {
            id                    : null,
            personas_id           : this.personaId,
            estudios_id           : null,
            cargo                 : null,
            empresa               : null,
            sectoreslaborales_id  : null,
            tiposcontratos_id     : null,
            vinculacion_fecha     : null,
            terminacion_fecha     : null,
            rangosingresos_id     : null,
            jefenombre            : null,
            jefetelefono          : null,
            municipios_id         : null,
            registro_fecha        : null,
            modo                  : null,
            dbRef                 : null
          }
          this.parametrosHistorico.lista = registro;  
        }

        this.ValidarHistorico("experiencias");
      break;
      case 7:
        this.tituloHistorico = "Comunidades y/o Asociaciones";
        this.parametrosHistorico = { "lista" : {} };              
        
        buscado = this.controladorAsociaciones.Encontrar("id",idHistorico);                                 //REVISAR MAS ADELANTE

        if(buscado)  {
          this.parametrosHistorico["lista"] = this.controladorAsociaciones.actual;
        }
        else{
          let registro: AsociacionesInterface = {
            id                      : null,
            personas_id             : this.personaId,
            nombre                  : null,
            cobertura               : null,
            sectoresasociaciones_id : null,
            ingreso_fecha           : null,
            registro_fecha          : null,
            modo                    : null,
            dbRef                   : null
          }
          this.parametrosHistorico.lista = registro;  
        }

        this.ValidarHistorico("asociaciones");
      break;
      case 8:
        this.tituloHistorico = "Reconocimientos";
        this.parametrosHistorico = { "lista" : {} };              
        
        buscado = this.controladorReconocimientos.Encontrar("id",idHistorico);                                 //REVISAR MAS ADELANTE

        if(buscado)  {
          this.parametrosHistorico["lista"] = this.controladorReconocimientos.actual;
        }
        else{
          let registro: ReconocimientosInterface = {
            id              : null,
            personas_id     : this.personaId,
            nombre          : null,
            motivo          : null,
            institucion     : null,
            momento_fecha   : null,
            registro_fecha  : null,
            modo            : null,
            dbRef           : null
          }
          this.parametrosHistorico.lista = registro;  
        }

        this.ValidarHistorico("reconocimientos");
      break;           
    }
    let parametrosModal = null;
    if(tipoHistoricoRecibido <= 4)  parametrosModal = { centered : true,  backdropClass: 'light-blue-backdrop'  };
    else                            parametrosModal = { size : 'lg'  ,  backdropClass: 'light-blue-backdrop', backdrop: "static"  }; 
    const respuesta  = this.modal.open( modalRecibido, parametrosModal );
  }

  ObtenerParametroHistorico( nombre : string ){
    let parametro:any;
    if(nombre == "lista"){
      switch (this.tipoHistorico) {
        case 1: this.parametrosHistorico["lista"] = this.datosCorreos;    break;
        case 2: this.parametrosHistorico["lista"] = this.datosDirecciones;    break;
        case 3: 
        case 4: this.parametrosHistorico["lista"] = this.datosTelefonos;  break;
      }
    }
    parametro = this.parametrosHistorico[nombre];
    return parametro;
  }

  FiltrarDatos( arreglo : any , campo : string , valor : any ){
    let resultados = arreglo.filter( (elemento: { [x: string]: any; }) => elemento[campo] == valor );
    return resultados;
  }

  FiltrarDatosAvanzado(arregloTotal: any, arregloBase: any, CampoReferencia: string){
    let posicion: number;
    let encontrado:boolean;
    let resutados: any[] = [];
    
    arregloBase.forEach((elementoBase: any) => {
      posicion=0;
      encontrado=false;
      while( posicion < arregloTotal.length && !encontrado ){
        if( elementoBase[CampoReferencia] == arregloTotal[posicion].id ){
          resutados.push(arregloTotal[posicion]);
          encontrado = true;
        }
        else{
          posicion++;
        }
      }

    });

    return resutados;
  }

  Estudios_ObtenerListaInstituciones(){
    return this.controladorEstudios.ObtenerForanea('ofertas').ObtenerForanea('instituciones').todos
  }


  Estudios_ObtenerListaPorgramas(){
    let datosBase:any[];
    let resultados: any[];
    datosBase = this.FiltrarDatos( this.controladorEstudios.ObtenerForanea('ofertas').todos , 'instituciones_id' , this.parametrosHistorico.instituciones_id);   
    resultados = this.FiltrarDatosAvanzado( this.controladorEstudios.ObtenerForanea('ofertas').ObtenerForanea('programas').todos, datosBase, 'programas_id' );
    return resultados;
  }

  Estudios_ObtenerListaTiposEstudios(){
    let datosBase:any[];
    let resultados: any[];
    datosBase = this.FiltrarDatos( this.controladorEstudios.ObtenerForanea('ofertas').todos , 'instituciones_id' , this.parametrosHistorico.instituciones_id);
    datosBase = this.FiltrarDatos( datosBase , 'programas_id' , this.parametrosHistorico.programas_id);
    resultados = this.FiltrarDatosAvanzado( this.controladorEstudios.ObtenerForanea('ofertas').ObtenerForanea('tiposestudios').todos, datosBase, 'tiposestudios_id' );
    return resultados;
  }

  Estudios_ObtenerOferta(elemento: string){
    if(elemento == "instituciones"){
      this.parametrosHistorico.programas_id = "";
      this.parametrosHistorico.tiposestudios_id = "";
      this.parametrosHistorico["lista"].ofertas_id="";
    }
    else if(elemento == "programas"){
      this.parametrosHistorico.tiposestudios_id = "";
      this.parametrosHistorico["lista"].ofertas_id="";
    }
    else{
      let datosBase:any[];
      let resultado: any;
      datosBase = this.FiltrarDatos( this.controladorEstudios.ObtenerForanea('ofertas').todos , 'instituciones_id' , this.parametrosHistorico.instituciones_id);
      datosBase = this.FiltrarDatos( datosBase , 'programas_id' , this.parametrosHistorico.programas_id);
      resultado = this.FiltrarDatos( datosBase , 'tiposestudios_id' , this.parametrosHistorico.tiposestudios_id)[0];
    
      this.parametrosHistorico["lista"].ofertas_id = resultado.id;
    }
    this.ValidarHistorico('estudios');
  }

  AgregarHistorico(){

    switch (this.tipoHistorico) {

      case 1:
        let nuevoRegistroCorreo: CorreosInterface = {
          id              : null,
          personas_id     : this.personaId,
          correo          : this.nuevoValorHistorico["valorA"],
          tipo            : "P",
          registro_fecha  : this.utilidadFechas.transform(new Date(), 'yyyy-MM-dd'),
        } 
        this.controladorCorreos.Agregar(nuevoRegistroCorreo);
        this.nuevoValorHistorico["valorA"] = "";
      break;
      case 2:
        let nuevoRegistroDireccion: DireccionesInterface = {
          id              : null,
          personas_id     : this.personaId,
          direccion       : this.nuevoValorHistorico["valorA"],
          municipios_id   : this.nuevoValorHistorico["valorB"],
          registro_fecha  : this.utilidadFechas.transform(new Date(), 'yyyy-MM-dd'),
        } 
        this.controladorDirecciones.Agregar(nuevoRegistroDireccion);
        this.nuevoValorHistorico["valorA"] = "";
        this.nuevoValorHistorico["valorB"] = "";
        this.nuevoValorHistorico["valorC"] = "";
        this.nuevoValorHistorico["valorD"] = "";
      break;      
      case 3:
        let nuevoRegistroTelefonoF: TelefonosInterface = {
          id              : null,
          personas_id     : this.personaId,
          numero          : this.nuevoValorHistorico["valorA"],
          tipo            : "F",
          registro_fecha  : this.utilidadFechas.transform(new Date(), 'yyyy-MM-dd'),
        } 
        this.controladorTelefonos.Agregar(nuevoRegistroTelefonoF);
        this.nuevoValorHistorico["valorA"] = "";
      break;      
      case 4:
        let nuevoRegistroTelefonoC: TelefonosInterface = {
          id              : null,
          personas_id     : this.personaId,
          numero          : this.nuevoValorHistorico["valorA"],
          tipo            : "C",
          registro_fecha  : this.utilidadFechas.transform(new Date(), 'yyyy-MM-dd'),
        } 
        this.controladorTelefonos.Agregar(nuevoRegistroTelefonoC);
        this.nuevoValorHistorico["valorA"] = "";
      break;      
      case 5:
        let nuevoRegistroEstudio: EstudiosInterface = this.parametrosHistorico["lista"];
        nuevoRegistroEstudio.registro_fecha = this.utilidadFechas.transform(new Date(), 'yyyy-MM-dd');
        this.controladorEstudios.Agregar(nuevoRegistroEstudio);
      break;  
      case 6:
        let nuevoRegistroExperiencia: ExperienciasInterface = this.parametrosHistorico["lista"];
        nuevoRegistroExperiencia.actualizacion_fecha = nuevoRegistroExperiencia.registro_fecha = this.utilidadFechas.transform(new Date(), 'yyyy-MM-dd');
        this.controladorExperiencias.Agregar(nuevoRegistroExperiencia);
      break;
      case 7:
        let nuevoRegistroAsociaciones: AsociacionesInterface = this.parametrosHistorico["lista"];
        nuevoRegistroAsociaciones.registro_fecha = this.utilidadFechas.transform(new Date(), 'yyyy-MM-dd');
        this.controladorAsociaciones.Agregar(nuevoRegistroAsociaciones);
      break;
      case 8:
        let nuevoRegistroReconocimientos: ReconocimientosInterface = this.parametrosHistorico["lista"];
        nuevoRegistroReconocimientos.registro_fecha = this.utilidadFechas.transform(new Date(), 'yyyy-MM-dd');
        this.controladorReconocimientos.Agregar(nuevoRegistroReconocimientos);
      break;       
    }

    this.huboCambios = true;
  }

  ActualizarHistorico(){
    switch (this.tipoHistorico) {
      case 6:
        let RegistroExperiencia: ExperienciasInterface = this.parametrosHistorico["lista"];
        this.controladorExperiencias.Encontrar("id",RegistroExperiencia.id);
        RegistroExperiencia.actualizacion_fecha = this.utilidadFechas.transform(new Date(), 'yyyy-MM-dd');
        this.controladorExperiencias.Modificar(RegistroExperiencia);
      break;        
    }
    this.huboCambios = true;
  }

  ModificarPersona(){
    this.huboCambios = true
    this.datosPersona.actualizacion_fecha = this.utilidadFechas.transform(new Date(), 'yyyy-MM-dd');
    this.controladorPersonas.Modificar(this.datosPersona);
  }

  EliminarHistorico( referencia : string , tipoRecibido:number=null){

    if(tipoRecibido!=null){
      this.tipoHistorico = tipoRecibido;
    }

    let controladorActual:any;
    switch (this.tipoHistorico) {
      case 1: controladorActual = this.controladorCorreos;  break;
      case 2: controladorActual = this.controladorDirecciones;  break;
      case 3: 
      case 4: controladorActual = this.controladorTelefonos;  break;
      case 5: controladorActual = this.controladorEstudios;  break;
      case 5: controladorActual = this.controladorExperiencias;  break;
      case 7: controladorActual = this.controladorAsociaciones;  break;
      case 8: controladorActual = this.controladorReconocimientos;  break;   
    }

    // console.log(Object.assign({}, this.datosCorreos), "Antes");      
    let encontrado: boolean = controladorActual.Encontrar( "dbRef", referencia );
    if( encontrado ){
      controladorActual.Eliminar();
    }
    
  }

  ActualizarPersona(){

    if(this.huboCambios){
      this.controladorPersonas.Guardar().subscribe( 
        (respuesta:RespuestaInterface) => { 
          if( respuesta.codigo == 200 ){
            console.log(respuesta);
          }    
          else{
            alert("Error al guardar personas");
            console.log(respuesta);
          }                              
        }
      );

      if( this.controladorCorreos.Encontrar("modo", null, true) ){
        this.controladorCorreos.Guardar().subscribe( 
          (respuesta:RespuestaInterface) => { 
            if( respuesta.codigo == 200 ){
              this.controladorCorreos.todos.forEach(elemento => {
                if( elemento.registro_fecha == this.utilidadFechas.transform(new Date(), 'yyyy-MM-dd') ){
                  if( elemento.tipo == "P" ){
                    this.datosPersona.correoPersonal = elemento.correo;
                  }
                  else{
                    this.datosPersona.correoInstitucional = elemento.correo;
                  }
                }
              });
            }
            else{
              alert("Error al guardar correos");
              console.log(respuesta);
            }          
          }
        );
      }

      if( this.controladorTelefonos.Encontrar("modo", null, true) ){
        this.controladorTelefonos.Guardar().subscribe( 
          (respuesta:RespuestaInterface) => { 
            if( respuesta.codigo == 200 ){
              this.controladorTelefonos.todos.forEach(elemento => {
                if( elemento.registro_fecha == this.utilidadFechas.transform(new Date(), 'yyyy-MM-dd') ){
                  if( elemento.tipo == "F" ){
                    this.datosPersona.telefonoFijo = elemento.numero;
                  }
                  else{
                    this.datosPersona.telefonoCelular = elemento.numero;
                  }
                }
              });
            }    
            else{
              alert("Error al guardar telefonos");
              console.log(respuesta);
            }                              
          }
        );
      }
    


      if( this.controladorDirecciones.Encontrar("modo", null, true) ){
        this.controladorDirecciones.Guardar().subscribe( 
          (respuesta:RespuestaInterface) => { 
            if( respuesta.codigo == 200 ){
              this.controladorDirecciones.todos.forEach(elemento => {
                let controladorMunicipios : MunicipiosController;

                if( elemento.registro_fecha == this.utilidadFechas.transform(new Date(), 'yyyy-MM-dd') ){
                    this.datosPersona.direccionResidencia = elemento.direccion;

                    controladorMunicipios = this.controladorDirecciones.ObtenerForanea("municipios");
                    controladorMunicipios.Encontrar("id",elemento.municipios_id);
                    this.datosPersona.municipioResidencia = controladorMunicipios.actual.descripcion;
                }
              });
            }
            else{
              alert("Error al guardar direcciones");
              console.log(respuesta);
            }                     
          }
        );
      }

      if( this.controladorEstudios.Encontrar("modo", null, true) ){
        this.controladorEstudios.Guardar().subscribe( 
          (respuesta:RespuestaInterface) => { 
            if( respuesta.codigo == 200 ){
              console.log(respuesta);
            }    
            else{
              alert("Error al guardar estudios");
              console.log(respuesta);
            }                              
          }
        );
      }
  
      if( this.controladorExperiencias.Encontrar("modo", null, true) ){
        this.controladorExperiencias.Guardar().subscribe( 
          (respuesta:RespuestaInterface) => { 
            if( respuesta.codigo == 200 ){
              console.log(respuesta);
            }    
            else{
              alert("Error al guardar experiencias");
              console.log(respuesta);
            }                              
          }
        );
      }      

      if( this.controladorAsociaciones.Encontrar("modo", null, true) ){
        this.controladorAsociaciones.Guardar().subscribe( 
          (respuesta:RespuestaInterface) => { 
            if( respuesta.codigo == 200 ){
              console.log(respuesta);
            }    
            else{
              alert("Error al guardar asociaciones");
              console.log(respuesta);
            }                              
          }
        );
      }  

      if( this.controladorReconocimientos.Encontrar("modo", null, true) ){
        this.controladorReconocimientos.Guardar().subscribe( 
          (respuesta:RespuestaInterface) => { 
            if( respuesta.codigo == 200 ){
              console.log(respuesta);
            }    
            else{
              alert("Error al guardar reconocimientos");
              console.log(respuesta);
            }                              
          }
        );
      }

    }
  }

  ValidarHistorico(historico:string){

    let regexpPromedio = new RegExp(this.calificacionModelo);

    this.notificacionActiva = false;
    switch(historico){
      case "estudios":

        if( this.parametrosHistorico.lista.promedio != null && this.parametrosHistorico.lista.promedio != "" ){
          let valor = Number(this.parametrosHistorico.lista.promedio);
          if(isNaN(valor) || valor<0 || valor>5){
            this.notificacionActiva = true;
            this.notificacionMensaje = "Debe ingresar un promedio valido";
          }
        }

        if( this.parametrosHistorico.lista.mecanismosgrados_id == null || this.parametrosHistorico.lista.mecanismosgrados_id == "" ){
          this.notificacionActiva = true;
          this.notificacionMensaje = "Debe seleccionar una mecanismo de grado";
        }   

        if( this.parametrosHistorico.lista.titulos_id == null || this.parametrosHistorico.lista.titulos_id == "" ){
          this.notificacionActiva = true;
          this.notificacionMensaje = "Debe seleccionar una titulo";
        }    

        if( this.parametrosHistorico.lista.cohortes_id == null || this.parametrosHistorico.lista.cohortes_id == "" ){
          this.notificacionActiva = true;
          this.notificacionMensaje = "Debe seleccionar una cohorte";
        }        

        if( this.parametrosHistorico.lista.grado_fecha == null || this.parametrosHistorico.lista.grado_fecha == "" ){
          this.notificacionActiva = true;
          this.notificacionMensaje = "Debe diligenciar una fecha";
        }    

        if( this.parametrosHistorico.lista.sedes_id == null || this.parametrosHistorico.lista.sedes_id == "" ){
          this.notificacionActiva = true;
          this.notificacionMensaje = "Debe seleccionar una sede";
        }

        if( this.parametrosHistorico.lista.ofertas_id == null || this.parametrosHistorico.lista.ofertas_id == "" ){
          this.notificacionActiva = true;
          this.notificacionMensaje = "Debe seleccionar una oferta";
        }

      break;
      case "experiencias":

        if( this.parametrosHistorico.lista.estudios_id == "" ){
          this.notificacionActiva = true;
          this.notificacionMensaje = "Debe seleccionar un estudio asociado";
        }            

        if( this.parametrosHistorico.lista.cargo == null || this.parametrosHistorico.lista.cargo == "" ){
          this.notificacionActiva = true;
          this.notificacionMensaje = "Debe diligenciar un cargo";
        }    

        if( this.parametrosHistorico.lista.cargo == null || this.parametrosHistorico.lista.cargo == "" ){
          this.notificacionActiva = true;
          this.notificacionMensaje = "Debe diligenciar un cargo";
        }

        if( this.parametrosHistorico.lista.rangosingresos_id == null || this.parametrosHistorico.lista.rangosingresos_id == "" ){
          this.notificacionActiva = true;
          this.notificacionMensaje = "Debe seleccionar una rango salarial";
        }

        if( this.parametrosHistorico.lista.rangosingresos_id == null || this.parametrosHistorico.lista.rangosingresos_id == "" ){
          this.notificacionActiva = true;
          this.notificacionMensaje = "Debe seleccionar una rango salarial";
        }

        if( this.parametrosHistorico.lista.tiposcontratos_id == null || this.parametrosHistorico.lista.tiposcontratos_id == "" ){
          this.notificacionActiva = true;
          this.notificacionMensaje = "Debe seleccionar un tipo de contratación";
        }

        if( this.parametrosHistorico.lista.municipios_id == null || this.parametrosHistorico.lista.municipios_id == "" ){
          this.notificacionActiva = true;
          this.notificacionMensaje = "Debe seleccionar un municipio";
        }
        if( this.parametrosHistorico.lista.sectoreslaborales_id == null || this.parametrosHistorico.lista.sectoreslaborales_id == "" ){
          this.notificacionActiva = true;
          this.notificacionMensaje = "Debe seleccionar una sector laboral";
        }

        if( this.parametrosHistorico.lista.empresa == null || this.parametrosHistorico.lista.empresa == "" ){
          this.notificacionActiva = true;
          this.notificacionMensaje = "Debe diligenciar una empresa";
         }
      break;
      case "asociaciones":
        if( this.parametrosHistorico.lista.sectoresasociaciones_id == null || this.parametrosHistorico.lista.sectoresasociaciones_id == ""){
          this.notificacionActiva = true;
          this.notificacionMensaje = "Debe seleccionar un sector de la comunidad/asociación";
        }

        if( this.parametrosHistorico.lista.cobertura == null || this.parametrosHistorico.lista.cobertura == "" ){
          this.notificacionActiva = true;
          this.notificacionMensaje = "Debe seleccionar una cobertura de la comunidada/asociación";
        }

        if( this.parametrosHistorico.lista.ingreso_fecha == null || this.parametrosHistorico.lista.ingreso_fecha == "" ){
          this.notificacionActiva = true;
          this.notificacionMensaje = "Debe seleccionar una fecha de ingreso a la comunidada/asociación";
        }

        if( this.parametrosHistorico.lista.nombre == null || this.parametrosHistorico.lista.nombre == "" ){
          this.notificacionActiva = true;
          this.notificacionMensaje = "Debe diligenciar un nombre de la comunidada/asociación";
        }  
      break;
      case "reconocimientos":
        if( this.parametrosHistorico.lista.institucion == null || this.parametrosHistorico.lista.institucion == "" ){
          this.notificacionActiva = true;
          this.notificacionMensaje = "Debe diligenciar un nombre de institución";
        }

        if( this.parametrosHistorico.lista.motivo == null || this.parametrosHistorico.lista.motivo == "" ){
          this.notificacionActiva = true;
          this.notificacionMensaje = "Debe diligenciar un motivo";
        } 

        if( this.parametrosHistorico.lista.momento_fecha == null || this.parametrosHistorico.lista.momento_fecha == "" ){
          this.notificacionActiva = true;
          this.notificacionMensaje = "Debe seleccionar la fecha del reconocimiento";
        }

        if( this.parametrosHistorico.lista.nombre == null || this.parametrosHistorico.lista.nombre == "" ){
          this.notificacionActiva = true;
          this.notificacionMensaje = "Debe diligenciar el nombre del reconocimiento";
        }
      break;  
    }
  }

}


