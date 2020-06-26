import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AgendasInterface } from '@interfaces/agendas.interface'



interface AgendasCompletoInterface extends AgendasInterface  {
  creador: string;
  asignados: number;
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

  // constructor( agendasRecibidas: AgendasCompletoInterface[] ){
  //   let agendas: AgendasCompletoInterface[] = []; 
  //   agendasRecibidas.forEach(val => agendas.push(Object.assign({}, val)));

  //   let conteoMarcas: number = 0;


  //   // Agrega el atributo "selecionado" e identifica el nivel minimo
  //   agendas.forEach( (elemento,indice) => { 
  //     elemento.selecionado= false;
  //   }); 

  //   // console.log(agendas,"agendas");
  //   // console.log(this.nivelRaiz,"nivel");

  //   // Crear raices de arbol con las agendas de nivel superior y marca las identificadas
  //   agendas.forEach( (elemento,indice) => { 
  //     if(elemento.nivel == 0 ){
  //        this.UbicarNodo( elemento ); 
  //        elemento.selecionado=true;
  //     }
  //     else{
  //       let encontrado: boolean = false;
  //       let posicion: number = 0;
  //       while( posicion < agendas.length && !encontrado){
  //         if(agendas[posicion].id == elemento.agendas_id) encontrado = true;
  //         else                                            posicion++;
  //       }

  //       if(!encontrado){
  //         this.UbicarNodo( elemento ); 
  //         elemento.selecionado=true;
  //       }
  //     }

  //   }); 

  //   //Construir arbol
  //   while( conteoMarcas < agendas.length ){
  //     conteoMarcas = 0;
  //     agendas.forEach( (elemento,indice) => { 
  //       if( elemento.selecionado == true ){
  //         conteoMarcas++;
  //       }
  //       else{
  //         if( this.UbicarNodo( this.ToNodo(elemento) ) ){
  //           elemento.selecionado = true;
  //         }
  //       }
  //     });
  //   }    
  // }

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

  // UbicarNodo( elemento: AgendasCompletoInterface,  ramaBusqueda: AgendasArbolInterface[] = this.raiz ) : boolean {
  //   let ubicado:boolean = false;
  //   let posicion:number = 0;

  //   if( elemento.nivel == this.nivelRaiz ){
  //     ramaBusqueda.push( this.ToNodo(elemento) );
  //     ubicado=true;
  //   }
  //   else{
  //     while( posicion < ramaBusqueda.length && !ubicado ){
  //       if( ramaBusqueda[posicion].subagendas.length > 0 ){
  //         ubicado = this.UbicarNodo(elemento, ramaBusqueda[posicion].subagendas );
  //       }
  //       if( ramaBusqueda[posicion].id == elemento.agendas_id ){
  //         ramaBusqueda[posicion].subagendas.push( this.ToNodo(elemento) );
  //         ubicado=true;
  //       }
  //       posicion++;
  //     }   
  //   }

  //   return ubicado;
  // }

  ObtenerLista( nodoActual:AgendasNodoInterface = this.raiz, listaResultado:AgendasCompletoInterface[]=[] ):AgendasCompletoInterface[]{

    if(nodoActual!=null){
      listaResultado.push( this.ToRegistro( nodoActual ) );
    }



    
  //   while( posicion < ramaBusqueda.length ){
  //     listaResultado.push( this.ToRegistro( ramaBusqueda[posicion] ) );
  //     if( ramaBusqueda[posicion].subagendas.length > 0 ){
  //       this.ObtenerLista( ramaBusqueda[posicion].subagendas, listaResultado );
  //     }
  //     posicion++;
  //   }
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
    // this.agendas = this.ObtenerListaAgendas();   
  }

  GenerarListaArboles(agendasRecibidas: AgendasCompletoInterface[]){
    let agendas: AgendasCompletoInterface[] = []; 
    agendasRecibidas.forEach(val => agendas.push(Object.assign({}, val)));

    let conteoMarcas: number = 0;
    // Agrega el atributo "selecionado" y lo inicializa
    agendas.forEach( (elemento,indice) => { 
      elemento.selecionado= false;
    }); 

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
    console.log(agendas);
    console.log(this.listaArbolesAgendas);
  }

  ObtenerListaAgendas(){
    let agendasResultado: AgendasCompletoInterface[]=[];

    this.listaArbolesAgendas.forEach( (elementoArbol,indiceArbol) => { 
      

      elementoArbol.ObtenerLista().forEach( (elementoAgenda,indiceAgenda) => { 
      



      
      });

      
    });

    return agendasResultado;
  }

  Seleccionado( idRecibido : number){
    this.seleccionada = idRecibido;
    this.seleccionadaChangue.emit( this.seleccionada );    
  }
}
