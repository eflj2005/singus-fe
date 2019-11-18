import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AmbienteService {
  inicioModo:number =null;  //Modo de inicio =>  1 = Login normal, 2 = Nuevo Administrador, 3 = Recuperación Clave  
  inicioPaso:number =null;  //pasos de registro de administrador =>  1 = Registro, 2 = Validación código
  actualizacionModo:any = {
                            modo: 0,          // Modo 1 es lista de personas -> Modo 2 es Editar a una persona
                            datos:null
                              } 

  urlRecursos:string[] = [];
  urlMode:string =null;

  

  constructor() {
    this.urlRecursos["DEV"]="http://localhost/singus-be/";
    this.urlRecursos["PRO"]="http://localhost/singus/";

    this.urlMode = "DEV";

    this.inicioModo = 0;
    this.inicioPaso = 0;
    this.actualizacionModo = {
      modo: 1,        
      datos: null
        }
  }

  GetUrlRecursos(){
    return this.urlRecursos[this.urlMode];
  }


}
