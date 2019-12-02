import { Component, OnInit, Input, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { RespuestaInterface } from '@app/modelos/interfaces/respuesta.interface';
import { DecimalPipe } from '@angular/common';
import { startWith, map } from 'rxjs/operators';


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

            console.log(this.registros);

            // let registro = this.registros[0];

            // console.log(registro);

            // for (let propiedad in registro){
            //   console.log(propiedad + " - " + typeof(registro[propiedad]));
            // }
       
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
        (elemento:string) => {
          if(!validacion){
            if( pipe.transform(registro[elemento] ).includes(term) )  validacion = true;
          }
        }
      );

      return validacion;
    });
  }


  AplicarFiltros(){
    this.registros$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.Buscar(text, this.pipe))
    );
  }


}
