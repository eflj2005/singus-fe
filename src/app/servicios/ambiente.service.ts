import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AmbienteService {
  urlRecursos:string[] = [];
  urlMode:string =null;

  inicioModo:number =null;  //Modo de inicio =>  1 = Login normal, 2 = Nuevo Administrador, 3 = Recuperación Clave  
  inicioPaso:number =null;  //pasos de registro de administrador =>  1 = Registro, 2 = Validación código
  inicioIdUsrTemp:number =null;
  
  public controlMecanicasPersonas:any = { 
    modo : 0,           // Modo 1 es lista de personas -> Modo 2 es Editar a una persona
    datos: {},          // datos transferidos
    origen: ""          // Ruta Origen de llamada
   } 

  agendaModo:any = {
                      modo: 0,          // Modo 1 es lista de personas -> Modo 2 es Editar a una persona
                      datos:null
                    }    

                                          
  eventosModo: any = { 
    modo:0,          //Modo 0 es lista de eventos -> Modo 1 es crear evento -> Modo 2 es editar evento 
    datos: null
  }



  

  constructor() {
    this.urlRecursos["DEV1"]="http://localhost/singus-be/";
    this.urlRecursos["DEV2"]="http://localhost:4200/api_backend_1/";
    this.urlRecursos["DEV3"]="http://localhost:4200/api_backend_2/";
    this.urlRecursos["PRO"]="http://localhost/singus/";

    this.urlMode = "DEV3";

    this.inicioModo = 0;
    this.inicioPaso = 0;

    this.controlMecanicasPersonas = { modo: 1, datos: null } // Modo 1 -> lista | Modo 2 -> Editar


    this.eventosModo.modo =  0;
    
    this.agendaModo = {
      modo: 1,        
      datos: null
      }
   
  }

  GetUrlRecursos(){
    return this.urlRecursos[this.urlMode];
  }


}
