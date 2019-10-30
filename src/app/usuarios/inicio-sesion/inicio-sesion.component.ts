import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  usuario:string= null;
  clave:string= null;
  suscrito:any=null;

      /*
      Modo de inicio
        1 = Login normal
        2 = Nuevo Administrador
        */
  modo:number=null;

  procesando:boolean=null;

  constructor(
    private rutas: Router,
    private rutaActiva: ActivatedRoute    
  ) {
    this.usuario="";
    this.clave="";
    this.procesando=false;

    this.ValidarAdministrador();
  }

  ngOnInit() {
    this.suscrito = this.rutaActiva.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.modo = +params['modo'];
    }); 
  }    


  ngOnDestroy() {
    this.suscrito.unsubscribe();
  }

  ValidarAdministrador(){
    this.modo = 1;
  }

  ValidarLogin(){
    alert("envio formulario Login");
    this.procesando=true;
    
  }

  ActivarRegitroAdministrador(){
    this.rutas.navigate( ['registro_administrador/'], { relativeTo: this.rutaActiva.parent, skipLocationChange: true } );
    
  }  

}


 