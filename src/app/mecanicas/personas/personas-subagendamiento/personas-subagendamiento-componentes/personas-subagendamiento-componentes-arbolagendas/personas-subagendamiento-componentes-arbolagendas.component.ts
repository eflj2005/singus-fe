import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AgendasInterface } from '@interfaces/agendas.interface'


interface AgendasCompletoInterface extends AgendasInterface  {
  creador: string;
  asignados: number;
  selecionado?:boolean;
}

interface AgendasArbolInterface extends AgendasCompletoInterface  {
  subagendas: AgendasArbolInterface[];
}

class ArbolDeAgendas{
  public raiz:AgendasArbolInterface[] = [];
  private nivelRaiz:number=null;

  constructor( agendasRecibidas: AgendasCompletoInterface[] ){
    let agendas: AgendasCompletoInterface[] = []; 
    agendasRecibidas.forEach(val => agendas.push(Object.assign({}, val)));

    let conteoMarcas: number = 0;

    this.nivelRaiz=10;

    // Agrega el atributo "selecionado" e identifica el nivel minimo
    agendas.forEach( (elemento,indice) => { 
      elemento.selecionado= false;
      if(elemento.nivel < this.nivelRaiz ) this.nivelRaiz = elemento.nivel;
    }); 

    // console.log(agendas,"agendas");
    // console.log(this.nivelRaiz,"nivel");

    // Crear rices de arbol con las agendas de nivel superior y marca las identificadas
    agendas.forEach( (elemento,indice) => { 
      if(elemento.nivel == this.nivelRaiz ){
        this.UbicarNodo( elemento ); 
        elemento.selecionado=true;
      }    
    }); 

    //Construir arbol
    while( conteoMarcas < agendas.length ){
      conteoMarcas = 0;
      agendas.forEach( (elemento,indice) => { 
        if( elemento.selecionado == true ){
          conteoMarcas++;
        }
        else{
          if( this.UbicarNodo( this.ToNodo(elemento) ) ){
            elemento.selecionado = true;
          }
        }
      });
    }    
  }

  private ToNodo( objetoRecibido: AgendasCompletoInterface) : AgendasArbolInterface {
    let respuesta:AgendasArbolInterface = {
      id:             objetoRecibido.id,
      agendas_id:     objetoRecibido.agendas_id,
      apertura_fecha: objetoRecibido.apertura_fecha,
      cierre_fecha:   objetoRecibido.cierre_fecha,
      asignados:      objetoRecibido.asignados,
      creador:        objetoRecibido.creador,
      nivel:          objetoRecibido.nivel,
      subagendas: []
    };
    return respuesta;
  }

  private ToRegistro( objetoRecibido: AgendasArbolInterface) : AgendasCompletoInterface {
    let respuesta:AgendasCompletoInterface = {
      id:             objetoRecibido.id,
      agendas_id:     objetoRecibido.agendas_id,
      apertura_fecha: objetoRecibido.apertura_fecha,
      cierre_fecha:   objetoRecibido.cierre_fecha,
      asignados:      objetoRecibido.asignados,
      creador:        objetoRecibido.creador,
      nivel:          objetoRecibido.nivel,
    };
    return respuesta;
  }

  UbicarNodo( elemento: AgendasCompletoInterface, ramaBusqueda: AgendasArbolInterface[] = this.raiz ) : boolean {
    let ubicado:boolean = false;
    let posicion:number = 0;

    if( elemento.nivel == this.nivelRaiz ){
      ramaBusqueda.push( this.ToNodo(elemento) );
      ubicado=true;
    }
    else{
      while( posicion < ramaBusqueda.length && !ubicado ){
        if( ramaBusqueda[posicion].subagendas.length > 0 ){
          ubicado = this.UbicarNodo(elemento, ramaBusqueda[posicion].subagendas );
        }
        if( ramaBusqueda[posicion].id == elemento.agendas_id ){
          ramaBusqueda[posicion].subagendas.push( this.ToNodo(elemento) );
          ubicado=true;
        }
        posicion++;
      }   
    }

    return ubicado;
  }

  ObtenerLista( ramaBusqueda:AgendasArbolInterface[] = this.raiz, listaResultado:AgendasCompletoInterface[]=[] ):AgendasCompletoInterface[]{
    let posicion:number = 0;

    while( posicion < ramaBusqueda.length ){
      listaResultado.push( this.ToRegistro( ramaBusqueda[posicion] ) );
      if( ramaBusqueda[posicion].subagendas.length > 0 ){
        this.ObtenerLista( ramaBusqueda[posicion].subagendas, listaResultado );
      }
      posicion++;
    }
    return listaResultado;
  }

}

@Component({
  selector: 'app-personas-subagendamiento-componentes-arbolagendas',
  templateUrl: './personas-subagendamiento-componentes-arbolagendas.component.html',
  styleUrls: ['./personas-subagendamiento-componentes-arbolagendas.component.css']
})
export class PersonasSubagendamientoComponentesArbolagendasComponent implements OnInit {

  @Input() agendas:AgendasCompletoInterface[];

  @Input() seleccionada: number = 0;
  @Output() seleccionadaChangue: EventEmitter<number> = new EventEmitter<number>();

  
  arbolAgendas: ArbolDeAgendas = null;

  constructor() {

   
    // this.listaAgendas.push( { id: 1, agendas_id: null, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 0, asignados: 10, creador: "Pepito Flores" } );      //10
    //   this.listaAgendas.push( { id: 2, agendas_id: 1, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 1, asignados: 5, creador: "Perencejto Rivas" } );    //5
    //     this.listaAgendas.push( { id: 4, agendas_id: 2, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 2, creador: "Sultanita Rojas" } );     //2
    //     this.listaAgendas.push( { id: 5, agendas_id: 2, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 2, creador: "Sultanita Rojas" } );     //2
    //     this.listaAgendas.push( { id: 6, agendas_id: 2, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 1, creador: "Sultanita Rojas" } );     //1
    //   this.listaAgendas.push( { id: 3, agendas_id: 1, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 1, asignados: 5, creador: "Perencejto Rivas" } );    //5
    //     this.listaAgendas.push( { id: 7, agendas_id: 3, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 3, creador: "Fabio Torres" } );        //3
    //     this.listaAgendas.push( { id: 8, agendas_id: 3, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 2, creador: "Fabio Torres" } );        //2

    // this.listaAgendas.push( { id: 1, agendas_id: null, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 0, asignados: 10, creador: "Pepito Flores Primero" } );
    // this.listaAgendas.push( { id: 2, agendas_id: 1, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 1, asignados: 5, creador: "Perencejto Rivas Segundo" } );
    // this.listaAgendas.push( { id: 3, agendas_id: 1, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 1, asignados: 5, creador: "Perencejto Rivas Segundo" } );
    // this.listaAgendas.push( { id: 4, agendas_id: 2, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 2, creador: "Sultanita Rojas Tercera" } );
    // this.listaAgendas.push( { id: 5, agendas_id: 2, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 2, creador: "Sultanita Roja Tercera" } );
    // this.listaAgendas.push( { id: 6, agendas_id: 2, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 1, creador: "Sultanita Rojas Tercera" } );
    // this.listaAgendas.push( { id: 7, agendas_id: 3, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 3, creador: "Fabio Torres Cuarto" } );
    // this.listaAgendas.push( { id: 8, agendas_id: 3, apertura_fecha: "2020-06-01", cierre_fecha: "2020-06-30", nivel: 2, asignados: 2, creador: "Fabio Torres Cuarto" } );    

    
  }

  ngOnInit() {   
    this.arbolAgendas = new ArbolDeAgendas(this.agendas);
    this.agendas = this.arbolAgendas.ObtenerLista();   
  }

  Seleccionado( idRecibido : number){
    this.seleccionada = idRecibido;
    this.seleccionadaChangue.emit( this.seleccionada );    
  }
}
