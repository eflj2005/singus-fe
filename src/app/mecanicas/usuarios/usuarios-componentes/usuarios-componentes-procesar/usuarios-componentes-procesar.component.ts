import { Component, OnInit } from '@angular/core';
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

  modo:number;
  datos:UsuarioInterface;

  numeroModelo:string;
  correoModelo:string;

  
  constructor(
    private utilidadFechas: DatePipe
  ) 
  {
    this.titulo ="";

    this.numeroModelo="^[0-9]*$";
    this.correoModelo="^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$";

  }

  ngOnInit() {
    if(this.modo == 1){
      this.titulo = "Crear";
      this.datos.creacion_fecha = this.utilidadFechas.transform(new Date(), 'yyyy-MM-dd');
    }
    else{
      this.titulo = "Modificar";
    }
  }


  Guardar(){

    if(this.modo==1) this.controladorUsuarios.Agregar(this.datos);  
    if(this.modo==2) this.controladorUsuarios.Modificar(this.datos);

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
