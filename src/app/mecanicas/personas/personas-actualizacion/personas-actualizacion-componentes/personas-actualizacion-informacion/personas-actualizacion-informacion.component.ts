import { Component, OnInit,  ElementRef } from '@angular/core';
import { AmbienteService } from '@servicios/ambiente.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

import { PersonasController } from '@controladores/personas.controller';
import { EstructuraConsultas } from '@generales/estructura-consultas';
import { CorreosController } from '@controladores/correos.controller';
import { TelefonosController } from '@controladores/telefonos.controller';
import { PersonasInterface } from '@interfaces/personas.interface';
import { TelefonosInterface } from '@interfaces/telefonos.interface';
import { CorreosInterface } from '@interfaces/correos.interface';



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

  tipoHistorico : number ;
  grupoDatos : any = { } ;

  controladorPersonas: PersonasController;
  controladorCorreos: CorreosController;
  controladorTelefonos: TelefonosController;

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

  datosTelefonos:TelefonosInterface;
  datosCorreos:CorreosInterface[];

  descripcionProyecto : any ="BICIBAGUÉ: Iniciativa que busca incentivar la práctica del tursimo en bicicleta, el desarrollo social y la tecnología";
  descripcionPrograma : any ="BICIBAGUÉ: Iniciativa que busca incentivar la práctica del tursimo en bicicleta, el desarrollo social y la tecnología";
  
  constructor(
    private servicioAmbiente : AmbienteService,
    private llamadoHttp : HttpClient,
    private router: Router, 
    private modal: NgbModal, 
    private el: ElementRef 
  ) {


    let caracteristicasConsultas = null;

    // console.log(this.servicioAmbiente);

    let personaId = this.servicioAmbiente.controlMecanicasPersonas.datos.id;

    this.controladorPersonas = new PersonasController( llamadoHttp , servicioAmbiente );
    this.controladorCorreos = new CorreosController( llamadoHttp , servicioAmbiente );
    this.controladorTelefonos = new TelefonosController( llamadoHttp , servicioAmbiente );

    caracteristicasConsultas = new EstructuraConsultas();
    caracteristicasConsultas.AgregarColumna( null , "( SELECT numero FROM telefonos WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM telefonos WHERE personas_id = personas.id AND tipo = 'C' ) AND tipo = 'C' LIMIT 1 )" ,                                                           "telefonoCelular" );
    caracteristicasConsultas.AgregarColumna( null , "( SELECT numero FROM telefonos WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM telefonos WHERE personas_id = personas.id AND tipo = 'F' ) AND tipo = 'F' LIMIT 1 )" ,                                                           "telefonoFijo" );    
    caracteristicasConsultas.AgregarColumna( null , "( SELECT correo FROM correos WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM correos WHERE personas_id = personas.id AND tipo = 'I' ) AND tipo = 'I' LIMIT 1 )" ,                                                               "correoInstitucional" );
    caracteristicasConsultas.AgregarColumna( null , "( SELECT correo FROM correos WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM correos WHERE personas_id = personas.id AND tipo = 'P' ) AND tipo = 'P' LIMIT 1 )" ,                                                               "correoPersonal" );   
    caracteristicasConsultas.AgregarColumna( null , "( SELECT direccion FROM direcciones WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM direcciones WHERE personas_id = personas.id ) LIMIT 1 )" ,                                                                                  "direccionResidencia" );   
    caracteristicasConsultas.AgregarColumna( null , "( SELECT municipios.descripcion FROM  direcciones INNER JOIN municipios ON municipios.id = direcciones.municipios_id WHERE personas_id = personas.id AND registro_fecha = ( SELECT MAX( registro_fecha ) FROM direcciones WHERE personas_id = personas.id ) LIMIT 1)" ,  "municipioResidencia" );   
    caracteristicasConsultas.AgregarFiltro( "personas" , "id" , "=", personaId );

    this.controladorPersonas.CargarDesdeDB( true, "A", caracteristicasConsultas ).subscribe( (respuestaP:PersonasInterface) => {                // Carge de datos basicos
      
      this.datosPersona = this.controladorPersonas.actual;                                                                                                            
      this.controladorPersonas.ObtenerForanea("tiposdocumentos").CargarDesdeDB().subscribe( (respuestaT:PersonasInterface) => {  } );           // Carge de foranea de personas -> tipos documentos
      this.controladorPersonas.ObtenerForanea("municipios").CargarDesdeDB().subscribe( (respuestaT:PersonasInterface) => {  } );                // Carge de foranea de personas -> municipios
      
      caracteristicasConsultas = new EstructuraConsultas( "F", null , "personas_id" , "=" , personaId );

      this.controladorCorreos.CargarDesdeDB( true, "S", caracteristicasConsultas ).subscribe( (respuestaC:PersonasInterface) => {           // Carge de correos
     
        this.datosCorreos =  this.controladorCorreos.todos;

        this.controladorTelefonos.CargarDesdeDB( true, "S", caracteristicasConsultas ).subscribe( (respuestaT:PersonasInterface) => {       // Carge de telefonos



        });
  
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

  AdicionarHistorico( modalRecibido : any , tipoHistoricoRecibido : number ){
  
console.log(this.controladorCorreos.todos);

    this.tipoHistorico = tipoHistoricoRecibido;

    let parametrosModal = null;

    if(tipoHistoricoRecibido <= 4){
      parametrosModal = { centered : true,  backdropClass: 'light-blue-backdrop'  };
    }else{
      parametrosModal = { size : 'lg'  ,  backdropClass: 'light-blue-backdrop'  };
      // const respuesta  = this.modal.open(modalRecibido, {  size: 'lg' ,  backdropClass: 'light-blue-backdrop'  } );
    }
    
    const respuesta  = this.modal.open( modalRecibido, parametrosModal );

  }

}
