import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { UsuarioInterface } from '@app/modelos/interfaces/usuario.interface';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { UsuariosController } from '@app/modelos/controladores/usuarios.controller';
import { RespuestaInterface } from '@app/modelos/interfaces/respuesta.interface';

@Component({
  selector: 'app-usuarios-componentes-procesar',
  templateUrl: './usuarios-componentes-procesar.component.html',
  styleUrls: ['./usuarios-componentes-procesar.component.css']
})
export class UsuariosComponentesProcesarComponent implements OnInit {

  controladorUsuarios: UsuariosController;

  modal:NgbModalRef;
  titulo:string;
  // queryParams: Params;
  modo:number;
  datos:UsuarioInterface;

  numeroModelo:string;
  correoModelo:string;

  
  constructor(
    private rutaActiva: ActivatedRoute,
    private utilidadFechas: DatePipe
  ) 
  {
    // // URL query parameters
    // this.rutaActiva.queryParams.subscribe( params => {
    //   this.queryParams = params;
    // });

    // console.log(this.queryParams);

    this.titulo ="";

    this.numeroModelo="^[0-9]*$";
    this.correoModelo="^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$";



  }

  ngOnInit() {
    if(this.modo == 1){
      this.titulo = "Crear";
    }
    else{
      this.titulo = "Modificar";
    }
    this.datos.creacion = this.utilidadFechas.transform(new Date(), 'yyyy-MM-dd');
  }


  Guardar(){

    if(this.modo==1) this.controladorUsuarios.Agregar(this.datos);

    this.controladorUsuarios.Guardar(false).subscribe(
      (notificacion:RespuestaInterface) => {
        switch (notificacion.codigo){
          case 200:         //login ok         

            alert("GUARDADO");
            this.modal.close('GUARDAR');
          break;
          case 400:         //autenticación erronea / Usuario Bloqueado / Usuario Inactivo
            alert(notificacion.asunto + ": " + notificacion.mensaje);
          break;
        }
      }
    );          
  }

  Cancelar(){
    this.modal.dismiss('CANCELAR');
  }
}
