import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


import { AmbienteService } from '@app/servicios/ambiente.service';
import { UsuariosController } from '@app/modelos/controladores/usuarios.controller';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { RespuestaInterface } from '@app/modelos/respuesta.interface';
import { UsuarioInterface } from '@app/modelos/interfaces/usuario.interface';

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.component.html',
  styleUrls: ['./cambiar-clave.component.css']
})
export class CambiarClaveComponent implements OnInit {
  
  controladorUsuarios:UsuariosController;

  datos:UsuarioInterface;
  
  claveActual:string;
  claveNueva:string;
  claveConfirmada:string;

  claveModelo:string=null;
  claveError:string=null;
  
  procesando:boolean=null;

  constructor( 
    private servicioEmergentes: NgbModal,
    private llamadoHttp :HttpClient,
    private servicioAmbiente: AmbienteService,    
    private rutas: Router 
  ) { 
    this.controladorUsuarios = new UsuariosController(llamadoHttp,servicioAmbiente);

    this.claveModelo="(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,}";
    this.procesando=false;

    this.claveActual="";
    this.claveNueva="";
    this.claveConfirmada="";

    this.controladorUsuarios.CargarDesdeDB( false, { id: servicioAmbiente.inicioIdUsrTemp} ).subscribe(
      (respuesta:RespuestaInterface) => {    
        this.datos= this.controladorUsuarios.actual;
      }
    );
  }

  ngOnInit() {
  }


  ConfirmarCambio(){
    alert("Confirmo");
    this.procesando=true;

    this.datos.clave = this.claveNueva;
    this.controladorUsuarios.Modificar(this.datos);

    this.controladorUsuarios.Guardar(false).subscribe(
      (respuesta:RespuestaInterface) => {    
        switch (respuesta.codigo){
          case 200:         //Guardado ok        
            console.log(this.controladorUsuarios.actual,"actual");
            console.log(respuesta,"Guardado");
            
            if(this.servicioAmbiente.inicioModo != 1){
          
              this.servicioAmbiente.inicioModo = 1; //eliminar
              this.servicioAmbiente.inicioPaso = 1; //eliminar

              this.procesando=false;
              
              this.RecargarComponente();
            }
          break;
        }
      }
    )




  }

  RecargarComponente(){
    this.rutas.routeReuseStrategy.shouldReuseRoute = function(){return false;};

    let currentUrl = this.rutas.url + '?';
  
    this.rutas.navigateByUrl(currentUrl).then(() => {
      this.rutas.navigated = false;
      this.rutas.navigate([this.rutas.url]);
    });
  }
}
