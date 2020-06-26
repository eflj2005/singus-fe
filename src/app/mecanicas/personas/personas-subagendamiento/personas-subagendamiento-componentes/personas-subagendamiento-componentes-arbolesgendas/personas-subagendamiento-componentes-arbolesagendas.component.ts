import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AgendasInterface } from '@interfaces/agendas.interface'



interface AgendasCompletoInterface extends AgendasInterface  {
  creador: string;
  asignados: number;
  esRaiz?: boolean
  selecionado?:boolean;
}

interface AgendasNodoInterface extends AgendasCompletoInterface  {
  subagendas: AgendasNodoInterface[];
}

class ArbolDeAgendas{
  public raiz:AgendasNodoInterface = null;
  private nivelRaiz:number=null;

  constructor( agendaInicial: AgendasCompletoInterface ){
    let nodoActual: AgendasNodoInterface = this.ToNodo(agendaInicial);
    this.raiz = nodoActual;
    agendaInicial.selecionado=true;
  }

  private ToNodo( objetoRecibido: AgendasCompletoInterface) : AgendasNodoInterface {
    let respuesta:AgendasNodoInterface = {
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

  private ToRegistro( objetoRecibido: AgendasNodoInterface) : AgendasCompletoInterface {
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

  UbicarNodo( elemento: AgendasCompletoInterface,  nodoActual: AgendasNodoInterface = this.raiz ) : boolean {
    let ubicado:boolean = false;
   

    if( elemento.agendas_id == nodoActual.id ){
      nodoActual.subagendas.push( this.ToNodo(elemento) );
      ubicado=true;
    }
    else{
      if( nodoActual.subagendas.length > 0 ){
        let posicion:number = 0;
        while( posicion < nodoActual.subagendas.length  && !ubicado){
          ubicado = this.UbicarNodo(elemento, nodoActual.subagendas[posicion]);
          if ( !ubicado ) posicion++;
        }
      }
    }

    return ubicado;
  }

  ObtenerLista( nodoActual:AgendasNodoInterface = this.raiz, listaResultado:AgendasCompletoInterface[]=[] ):AgendasCompletoInterface[]{

    if(nodoActual!=null){
      listaResultado.push( this.ToRegistro( nodoActual ) );
    }

    if( nodoActual.subagendas.length > 0 ){
      nodoActual.subagendas.forEach( (elemento,indice) => { 
        this.ObtenerLista(elemento,listaResultado);
      }); 
    }

    return listaResultado;
  }

}

@Component({
  selector: 'app-personas-subagendamiento-componentes-arbolesagendas',
  templateUrl: './personas-subagendamiento-componentes-arbolesagendas.component.html',
  styleUrls: ['./personas-subagendamiento-componentes-arbolesagendas.component.css']
})
export class PersonasSubagendamientoComponentesArbolesagendasComponent implements OnInit {

  @Input() agendas:AgendasCompletoInterface[]=[];
  @Input() seleccionada: number = 0;
  @Output() seleccionadaChangue: EventEmitter<number> = new EventEmitter<number>();

  listaArbolesAgendas: ArbolDeAgendas[] = [];

  constructor() {}

  ngOnInit() {
    this.GenerarListaArboles(this.agendas);
    this.agendas = this.ObtenerListaAgendas();
    console.log(this.agendas);
  }

  GenerarListaArboles(agendasRecibidas: AgendasCompletoInterface[]){
    let agendas: AgendasCompletoInterface[] = []; 
    agendasRecibidas.forEach(val => agendas.push(Object.assign({}, val)));

    let conteoMarcas: number = 0;

    // Agrega el atributo "selecionado" y lo inicializa
    agendas.forEach( (elemento,indice) => { 
      elemento.selecionado= false;
    }); 

    // Crear la lista de arboles con las agendas de nivel superior y marca las identificadas
    agendas.forEach( (elemento,indice) => { 
      if(elemento.nivel == 0 ){
        this.listaArbolesAgendas.push(new ArbolDeAgendas( elemento ));
        elemento.selecionado=true;
      }
     else{
       let encontrado: boolean = false;
       let posicion: number = 0;
       while( posicion < agendas.length && !encontrado){
         if(agendas[posicion].id == elemento.agendas_id) encontrado = true;
         else                                            posicion++;
       }
 
       if(!encontrado){
        this.listaArbolesAgendas.push(new ArbolDeAgendas( elemento ));
         elemento.selecionado=true;
       }
     }    
    });


    // Construir arbol
    while( conteoMarcas < agendas.length ){
      conteoMarcas = 0;
      agendas.forEach( (elemento,indice) => { 
        if( elemento.selecionado == true ){
          conteoMarcas++;
        }
        else{

          let posicionArbol: number = 0;
          let nodoUbicado: boolean = false;

          while( posicionArbol < this.listaArbolesAgendas.length && !nodoUbicado ){
            if( this.listaArbolesAgendas[posicionArbol].UbicarNodo( elemento ) ){
              elemento.selecionado = true;
              nodoUbicado = true;
            }
            else{
              posicionArbol++;
            }
          }

        }
      });
    } 

    console.log(agendas);
    console.log(this.listaArbolesAgendas);
  }

  ObtenerListaAgendas(){
    let agendasResultado: AgendasCompletoInterface[]=[];

    this.listaArbolesAgendas.forEach( (elementoArbol,indiceArbol) => { 
      elementoArbol.ObtenerLista().forEach( (elementoAgenda,indiceAgenda) => { 
        if(indiceAgenda == 0) elementoAgenda.esRaiz = true;
        agendasResultado.push(elementoAgenda);
      });
    });

    return agendasResultado;
  }

  Seleccionado( idRecibido : number){
    this.seleccionada = idRecibido;
    this.seleccionadaChangue.emit( this.seleccionada );    
  }
}
