import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AmbienteService {
  inicioModo:number =null;  //Modo de inicio =>  1 = Login normal, 2 = Nuevo Administrador, 3 = Recuperación Clave  
  InicioPaso:number =null;  //pasos de registro de administrador =>  1 = Registro, 2 = Validación código

  urlRecursos:string[] = [];
  urlMode:string =null;

  

  constructor() {
    this.urlRecursos["DEV"]="http://localhost/singus/";
    this.urlRecursos["PRO"]="http://localhost/singus/";

    this.urlMode = "DEV";

    this.inicioModo = 2;
    this.InicioPaso = 1;
  }

  obtenerUrlRecurso(){
    return this.urlRecursos[this.urlMode];
  }
}
