import { Component, OnInit, Input, PipeTransform, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { RespuestaInterface } from '@app/modelos/interfaces/respuesta.interface';
import { DecimalPipe } from '@angular/common';
import { startWith, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaestrasComponentesProcesarComponent } from '../maestras-componentes-procesar/maestras-componentes-procesar.component';
import { UsuarioInterface } from '@app/modelos/interfaces/usuario.interface';

@Component({
  selector: 'app-maestras-componentes-lista',
  templateUrl: './maestras-componentes-lista.component.html',
  styleUrls: ['./maestras-componentes-lista.component.css'],
  providers: [DecimalPipe]
})
export class MaestrasComponentesListaComponent implements OnInit {

  @Input() nombreTabla:string;
  @Input() controlador:any;


  

  registros:any[];

  registros$: Observable<any[]>;
  filter = new FormControl('');

  constructor(
    private pipe: DecimalPipe,
    private servicioEmergentes: NgbModal,    
  ) {
      this.registros=[];
  }

  ngOnInit() {
    this.controlador.CargarDesdeDB( false ).subscribe(
      (respuesta: RespuestaInterface) =>{
        switch (respuesta.codigo){
          case 200:
            this.registros =this.controlador.todos;
            this.AplicarFiltros();
          break;
          default:
            alert("Error: "+respuesta.mensaje);
          break;
        }
      } 
    );

  }

  Buscar(text: string , pipe: PipeTransform): any[] {
    return this.registros.filter(registro => {
      const term = text.toLowerCase();

      var validacion:boolean = false;

      this.controlador.campos.forEach(
        (campo:any) => {
          if(!validacion){
            if(typeof(registro[campo.nombre]) != "string"){
              registro[campo.nombre] = registro[campo.nombre].toString();
            }
            if( registro[campo.nombre].toLowerCase().includes(term) )  validacion = true;
          }
        }
      );

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


}
