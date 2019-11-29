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
<<<<<<< HEAD
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UsuariosComponentesProcesarComponent } from '../usuarios-componentes-procesar/usuarios-componentes-procesar.component';
=======
>>>>>>> 810e7725a18a01b58fd6a240a3129bc881eee722
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

//   USUARIOS: Usuario[] = [
//     {
//       idUsuario : 1,
//       documentoUsuario : "32154",
//       claveUsuario: "6354654132",
//       nombresUsuario: "aaaaaaa",
//       apellidosUsuario: "aaaa",
//       telefonoUsuario :"3135487896",
//       correoUsuario : "abcdfghi@gmail.com",
//       fechaCreacionUsuario :"16-05-2015",
//       estadoUsuario : "A",
//       rolUsuario: "A",
//       areasId: 1,
//   },
//   {
//     idUsuario : 3,
//     documentoUsuario : "32154",
//     claveUsuario: "6354654132",
//     nombresUsuario: "aaaaaaa",
//     apellidosUsuario: "aaaa",
//     telefonoUsuario :"3135487896",
//     correoUsuario : "hoy@gmail.com",
//     fechaCreacionUsuario :"16-05-2015",
//     estadoUsuario : "A",
//     rolUsuario: "A",
//     areasId: 1,
//   },
//   {
//     idUsuario : 2,
//     documentoUsuario : "32154",
//     claveUsuario: "6354654132",
//     nombresUsuario: "aaaaaaa",
//     apellidosUsuario: "aaaa",
//     telefonoUsuario :"3135487896",
//     correoUsuario : "hoy@gmail.com",
//     fechaCreacionUsuario :"16-05-2015",
//     estadoUsuario : "A",
//     rolUsuario: "A",
//     areasId: 1,
//   }
// ];

  usuarios$: Observable<UsuarioInterface[]>;
  filter = new FormControl('');

  controladorUsuarios: UsuariosController;

  constructor(
    pipe: DecimalPipe,
    private rutas: Router,

    private llamadoHttp :HttpClient,
    private servicioAmbiente: AmbienteService,    

    private servicioEmergentes: NgbModal,
  ) 
  {
    this.usuarios$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.buscar(text, pipe))
    );


    this.controladorUsuarios = new UsuariosController(llamadoHttp,servicioAmbiente);

    this.controladorUsuarios.CargarDesdeDB( false ).subscribe(
      (respuesta: RespuestaInterface) =>{
        switch (respuesta.codigo){
          case 200:

            console.log(this.controladorUsuarios.todos);


    this.controladorUsuarios.CargarDesdeDB( false ).subscribe(
      (respuesta: RespuestaInterface) =>{
        switch (respuesta.codigo){
          case 200:

            console.log(this.controladorUsuarios.todos);

          break;
          default:
            alert("Error: "+respuesta.mensaje);
          break;
        }
      } 
    );
    
  }

  ngOnInit() {  }

  buscar(text: string , pipe: PipeTransform): UsuarioInterface[] {
    return this.USUARIOS.filter(usuario => {
      const term = text.toLowerCase();
      return pipe.transform(usuario.idUsuario).includes(term)
          || usuario.documentoUsuario.toLowerCase().includes(term)
          || usuario.claveUsuario.toLowerCase().includes(term)
          || usuario.nombresUsuario.toLowerCase().includes(term)
          || usuario.apellidosUsuario.toLowerCase().includes(term)
          || usuario.telefonoUsuario.toLowerCase().includes(term)
          || usuario.correoUsuario.toLowerCase().includes(term)
          || usuario.fechaCreacionUsuario.toLowerCase().includes(term)
          || usuario.estadoUsuario.toLowerCase().includes(term)
          || usuario.rolUsuario.toLowerCase().includes(term)
          || pipe.transform(usuario.areasId).includes(term)
  
    });
  }

  Procesar(modo:number, aProcesar:UsuarioInterface=null){

    const modalRef = this.servicioEmergentes.open(UsuariosComponentesProcesarComponent, { centered: true });
    //modalRef.componentInstance.datos = aProcesar;    
    modalRef.componentInstance.modo = modo;    

    //[routerLink]="['../procesar']" skipLocationChange=true  [queryParams]="{modo: 1}"


  }
}  
