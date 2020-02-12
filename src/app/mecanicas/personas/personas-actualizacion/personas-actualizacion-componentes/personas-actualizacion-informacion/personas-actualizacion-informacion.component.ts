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
    actualizacion_fecha: "",
    correoPersonal : "",
    correoInstitucional : "",
    telefonoCelular: null,
    telefonoFijo: null,
    direccionResidencia: "",
    municipioResidencia: "",
  };

  datosTelefonos:TelefonosInterface[];
  datosCorreos:CorreosInterface[];
  datosDirecciones:DireccionesInterface[];
  
  datosEstudios:EstudiosInterface[];

  descripcionProyecto : any ="BICIBAGUÉ: Iniciativa que busca incentivar la práctica del tursimo en bicicleta, el desarrollo social y la tecnología";
  descripcionPrograma : any ="BICIBAGUÉ: Iniciativa que busca incentivar la práctica del tursimo en bicicleta, el desarrollo social y la tecnología";

  correoModelo:string;
  numeroModelo:string;
  

  constructor(
    private servicioAmbiente : AmbienteService,
    private llamadoHttp : HttpClient,
    private router: Router, 
    private modal: NgbModal, 
    private utilidadFechas: DatePipe
  ) {

    this.correoModelo="^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$";
    this.numeroModelo="^[0-9]*$";

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
      this.controladorPersonas.CargarFornea("tiposdocumentos");           // Carge de foranea de personas -> tipos documentos
      this.controladorPersonas.CargarFornea("municipios", new EstructuraConsultas( "O",  "descripcion"  , "ASC") );                                                               // Carge de foranea de municipios -> personas
      this.controladorPersonas.ObtenerForanea("municipios").CargarFornea("departamentos", new EstructuraConsultas( "O",  "descripcion"  , "ASC") );                               // Carge de foranea de Departamentos -> municipios -> personas
      this.controladorPersonas.ObtenerForanea("municipios").ObtenerForanea("departamentos").CargarFornea("paises", new EstructuraConsultas( "O",  "descripcion"  , "ASC") );      // Carge de foranea de paises ->dDepartamentos -> municipios -> personas
      
      caracteristicasConsultas = new EstructuraConsultas( "F", null , "personas_id" , "=" , String(this.personaId) );
      caracteristicasConsultas.AgregarOrdenamiento( "registro_fecha" , "DESC" );
     
      this.controladorCorreos.CargarDesdeDB( true, "S", caracteristicasConsultas ).subscribe( (respuestaC:RespuestaInterface) => {           // Carge de correos
     
        this.datosCorreos =  this.controladorCorreos.todos;

        this.controladorTelefonos.CargarDesdeDB( true, "S", caracteristicasConsultas ).subscribe( (respuestaT:RespuestaInterface) => {       // Carge de telefonos

          this.datosTelefonos =  this.controladorTelefonos.todos;

          this.controladorDirecciones.CargarDesdeDB( true, "S", caracteristicasConsultas ).subscribe( (respuestaT:RespuestaInterface) => {       // Carge de direcciones

            this.controladorDirecciones.ReemplazarForanea( "municipios" , this.controladorPersonas.ObtenerForanea("municipios") );
            
            this.datosDirecciones =  this.controladorDirecciones.todos;
  
          });
  

        });
  
      });

      this.controladorEstudios.CargarDesdeDB( true, "S", caracteristicasConsultas ).subscribe( (respuestaE:RespuestaInterface) => {           // Carge de estudios

        this.datosEstudios = this.controladorEstudios.todos;

      });

    });



    this.cambiarGrupoDatos( 1 );

  }

  ngOnInit() {

  }



  Regresar(){
    this.servicioAmbiente.controlMecanicasPersonas.modo = 1
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
        this.grupoDatos.nombre = "Empleo";
        this.grupoDatos.posicion= 3;
      break;
      case 4:
        this.grupoDatos.nombre = "Reconocimientos";
        this.grupoDatos.posicion= 4;
      break;
      case 5:
        this.grupoDatos.nombre = "Datos historicos";
        this.grupoDatos.posicion= 5;
      break;      
    }
  }

  Actualizar(){
    this.router.navigateByUrl("/agendamiento");
  }


  ActivarModalHistoricos( modalRecibido : any , tipoHistoricoRecibido : number ){
    this.tipoHistorico = tipoHistoricoRecibido;
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

    }
    let parametrosModal = null;
    if(tipoHistoricoRecibido <= 4)  parametrosModal = { centered : true,  backdropClass: 'light-blue-backdrop'  };
    else                            parametrosModal = { size : 'lg'  ,  backdropClass: 'light-blue-backdrop'  }; 
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

    let resultados = arreglo.filter( elemento => elemento[campo] == valor );

    return resultados;
  }

  AgregarHistorico( ){

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

    }

  }

  EliminarHistorico( referencia : string ){
    let controladorActual:any;
    switch (this.tipoHistorico) {
      case 1: controladorActual = this.controladorCorreos;  break;
      case 2: controladorActual = this.controladorDirecciones;  break;
      case 3: 
      case 4:controladorActual = this.controladorTelefonos;  break;
    }

    // console.log(Object.assign({}, this.datosCorreos), "Antes");      
    let encontrado: boolean = controladorActual.Encontrar( "dbRef", referencia );
    if( encontrado ){
      controladorActual.Eliminar();
    }
    
  }
}
