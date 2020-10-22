import { Component, OnInit, Input, PipeTransform, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { DecimalPipe } from '@angular/common';
import { startWith, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaestrasComponentesProcesarComponent } from '../maestras-componentes-procesar/maestras-componentes-procesar.component';
import { UsuarioInterface } from '@interfaces/usuario.interface';
import { EstructuraConsultas } from '@generales/estructura-consultas';

@Component({
  selector: 'app-maestras-componentes-lista',
  templateUrl: './maestras-componentes-lista.component.html',
  styleUrls: ['./maestras-componentes-lista.component.css'],
  providers: [DecimalPipe]
})
export class MaestrasComponentesListaComponent implements OnInit {

  @Input() nombreTabla:string;
  @Input() controlador:any;


  


  registros$: Observable<any[]>;
  filter = new FormControl('');

  constructor(
    private pipe: DecimalPipe,
    private servicioEmergentes: NgbModal,    
  ) {

  }

  ngOnInit() {
    
    let caracteristicasConsultas:EstructuraConsultas = new EstructuraConsultas();


    this.controlador.foraneas.forEach( ( nombreForanea: string ) => {

      let nombreAnalizado:string[] = nombreForanea.split("-");

      if( nombreAnalizado.length == 1 ){
        caracteristicasConsultas.AgregarColumna( nombreForanea, "descripcion", nombreForanea + "_des");
        caracteristicasConsultas.AgregarEnlace( nombreForanea, nombreForanea, this.controlador.nombreTabla );
      }
      else{
        caracteristicasConsultas.AgregarColumna( nombreAnalizado[0]+nombreAnalizado[1], "descripcion", nombreAnalizado[0]+nombreAnalizado[1] + "_des");
        caracteristicasConsultas.AgregarEnlace( nombreAnalizado[0], nombreAnalizado[0], this.controlador.nombreTabla, nombreAnalizado[0]+nombreAnalizado[1], "FK" );
      }

      this.controlador.CargarForanea(nombreForanea);
    });

    console.log(caracteristicasConsultas);

    this.controlador.CargarDesdeDB(true,'A',caracteristicasConsultas).subscribe(
      (respuesta: RespuestaInterface) =>{

        switch (respuesta.codigo){
          case 200:

            this.controlador.EstaListo('cargue',true).subscribe( (valor: Boolean ) => {
             
              this.AplicarFiltros();

            });

          break;
          default:
            alert("Error: "+respuesta.mensaje);
          break;
        }
      } 
    );

  }

  Buscar(text: string , pipe: PipeTransform): any[] {
    return this.controlador.todos.filter( (registro:any) => {
      const term = text.toLowerCase();

      var validacion:boolean = false;

      for (let campo in registro) {  
        if(!validacion){
          if(typeof(registro[campo]) != "string"){
            registro[campo] = String(registro[campo]);
          }

          if( registro[campo].toLowerCase().includes(term) )  validacion = true;
        }

      }

      return validacion;
    });
  }

  Procesar(modo:number, usuarioId:number=null){
    var validar:boolean = true;
    var registro:any = {} as any;

    if(modo==2){
      if( this.controlador.Encontrar("id",usuarioId) ){
        registro = this.controlador.actual;
      }else{
        alert("ID no esta en la lista");
      }
    }

    if(validar){
      const modalRef = this.servicioEmergentes.open(MaestrasComponentesProcesarComponent, { centered: true });
      modalRef.componentInstance.modo = modo;
      modalRef.componentInstance.datos = registro;
      modalRef.componentInstance.modal = modalRef;
      modalRef.componentInstance.controlador = this.controlador;

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

  AjustarNombreCampo( nombreCampo:string, sufijo: string){
    let nombre:string[] = nombreCampo.split("_");

    return nombre[0]+"_"+sufijo;
  }


}
