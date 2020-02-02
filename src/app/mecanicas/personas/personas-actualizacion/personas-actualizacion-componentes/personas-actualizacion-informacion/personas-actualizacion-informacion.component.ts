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



interface Trabajo {
  name: string;
  flag: string;
  area: number;
  population: number;
}



@Component({
  selector: 'personas-actualizacion-informacion',
  templateUrl: './personas-actualizacion-informacion.component.html',
  styleUrls: ['./personas-actualizacion-informacion.component.css']
})
export class PersonasActualizacionInformacionComponent implements OnInit {

  tipoInformacion : number ;
  grupoDatos : any = { } ;

  controladorPersonas: PersonasController;
  controladorCorreos: CorreosController;
  controladorTelefonos: TelefonosController;

  datosPersona:PersonasInterface;
  datosTelefono:TelefonosInterface;

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

    this.cambiarGrupoDatos( 1 );

    this.controladorPersonas = new PersonasController( llamadoHttp , servicioAmbiente );
    this.controladorCorreos = new CorreosController( llamadoHttp , servicioAmbiente );
    this.controladorTelefonos = new TelefonosController( llamadoHttp , servicioAmbiente );

    caracteristicasConsultas = new EstructuraConsultas( "F" , null , "id" , "=" , personaId );

    this.controladorPersonas.CargarDesdeDB( true, "S", caracteristicasConsultas ).subscribe( (respuestaP:PersonasInterface) => {                // Carge de datos basicos
      
      this.controladorPersonas.ObtenerForanea("tiposdocumentos").CargarDesdeDB().subscribe( (respuestaT:PersonasInterface) => {                 // Carge de foranea de personas -> tipos documentos
  
        this.controladorPersonas.ObtenerForanea("municipios").CargarDesdeDB().subscribe( (respuestaT:PersonasInterface) => {                    // Carge de foranea de personas -> municipios

          caracteristicasConsultas = new EstructuraConsultas( "F", null , "personas_id" , "=" , personaId );
  
          this.controladorCorreos.CargarDesdeDB( true, "S", caracteristicasConsultas ).subscribe( (respuestaC:PersonasInterface) => {           // Carge de correos
         
            this.controladorTelefonos.CargarDesdeDB( true, "S", caracteristicasConsultas ).subscribe( (respuestaT:PersonasInterface) => {       // Carge de telefonos

              this.datosPersona = this.controladorPersonas.actual;                                                                                                  

            });
      
          });
              
        });

      });

    });


  }

  ngOnInit() {

  }



  Cancelar(){
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

  agregarInfo(agregador, tipoInfo){
  
    this.tipoInformacion = tipoInfo;

    if(tipoInfo <= 4){
      const respuesta  = this.modal.open(agregador, { centered: true , backdropClass: 'light-blue-backdrop' } );
    }else{
      const respuesta  = this.modal.open(agregador, {  size: 'lg' ,  backdropClass: 'light-blue-backdrop'  } );
    }
    
  }

}
