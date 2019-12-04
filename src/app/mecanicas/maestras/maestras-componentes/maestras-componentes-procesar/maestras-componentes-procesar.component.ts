import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { RespuestaInterface } from '@app/modelos/interfaces/respuesta.interface';
import { AreaInterface } from '@app/modelos/interfaces/area.interface';

@Component({
  selector: 'app-maestras-componentes-procesar',
  templateUrl: './maestras-componentes-procesar.component.html',
  styleUrls: ['./maestras-componentes-procesar.component.css']
})
export class MaestrasComponentesProcesarComponent implements OnInit {


  controlador: any;

  modal:NgbModalRef;
  titulo:string;

  modo:number;
  datos:AreaInterface;

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
      this.titulo = "Crear " + this.controlador.nombreTabla.substr(0,1).toUpperCase()+this.controlador.nombreTabla.substr(1);
    }
    else{
      this.titulo = "Modificar" + this.controlador.nombreTabla.substr(0,1).toUpperCase()+this.controlador.nombreTabla.substr(1);
    }

  }


  Guardar(){

    if(this.modo==1) this.controlador.Agregar(this.datos);

    this.controlador.Guardar(false).subscribe(
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
