import { Component,  OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UsuariosController } from '@app/modelos/controladores/usuarios.controller';
import { RespuestaInterface } from '@app/modelos/interfaces/respuesta.interface';
import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@app/servicios/ambiente.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UsuariosComponentesProcesarComponent } from '../usuarios-componentes-procesar/usuarios-componentes-procesar.component';
import { UsuarioInterface } from '@app/modelos/interfaces/usuario.interface';

// interface Usuario{
//   idUsuario : number;
//   documentoUsuario : string;
//   claveUsuario: string;
//   nombresUsuario: string;
//   apellidosUsuario: string;
//   telefonoUsuario :string;
//   correoUsuario : string;
//   fechaCreacionUsuario :string;
//   estadoUsuario : string;
//   rolUsuario: string;
//   areasId: number;
// }

@Component({
  selector: 'app-usuarios-componentes-lista',
  templateUrl: './usuarios-componentes-lista.component.html',
  styleUrls: ['./usuarios-componentes-lista.component.css'],
  providers: [DecimalPipe]
})
export class UsuariosComponentesListaComponent implements OnInit {


  registros:UsuarioInterface[];

  registros$: Observable<UsuarioInterface[]>;
  filter = new FormControl('');

  controladorUsuarios: UsuariosController;

  constructor(
    private pipe: DecimalPipe,
    private rutas: Router,

    private llamadoHttp :HttpClient,
    private servicioAmbiente: AmbienteService,    

    private servicioEmergentes: NgbModal,
  ) 
  {

    this.registros =[];
    this.controladorUsuarios = new UsuariosController(llamadoHttp,servicioAmbiente);

    this.controladorUsuarios.CargarDesdeDB( false ).subscribe(
      (respuesta: RespuestaInterface) =>{
        switch (respuesta.codigo){
          case 200:

            this.registros =this.controladorUsuarios.todos;
            this.AplicarFiltros();

          break;
          default:
            alert("Error: "+respuesta.mensaje);
          break;
        }
      } 
    );
    
  }

  ngOnInit() { 
    
  }

  Buscar(text: string , pipe: PipeTransform): UsuarioInterface[] {
    return this.registros.filter(registro => {
      const term = text.toLowerCase();

      return pipe.transform(registro.id).includes(term)
          || pipe.transform(registro.documento).includes(term)      
          || registro.nombres.toLowerCase().includes(term)
          || registro.apellidos.toLowerCase().includes(term)
          || pipe.transform(registro.telefono).includes(term)                
          || registro.correo.toLowerCase().includes(term)
          || registro.creacion_fecha.toLowerCase().includes(term)
          || registro.estado.toLowerCase().includes(term)
          || registro.rol.toLowerCase().includes(term)
          || pipe.transform(registro.areas_id).includes(term)
    });
  }

  Procesar(modo:number, usuarioId:number=null){
    var validar:boolean = true;
    var registro:UsuarioInterface = {} as UsuarioInterface;

    if(modo==2){
      if( this.controladorUsuarios.Encontrar("id",usuarioId) ){
        registro = this.controladorUsuarios.actual;
      }else{
        alert("ID no esta en la lista");
      }
    }

    if(validar){
      const modalRef = this.servicioEmergentes.open(UsuariosComponentesProcesarComponent, { centered: true });
      //modalRef.componentInstance.datos = aProcesar;    
      modalRef.componentInstance.modo = modo;
      modalRef.componentInstance.datos = registro;
      modalRef.componentInstance.modal = modalRef;
      modalRef.componentInstance.controladorUsuarios = this.controladorUsuarios;

      modalRef.result.then(
        (result) => {                  
          if(result == 'GUARDAR'){
            this.AplicarFiltros();               
          }
        },
        (reason) => { } // Se recibe dismiss  
      );
      }
  }

  AplicarFiltros(){
    this.registros$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.Buscar(text, this.pipe))
    );
  }
}  
