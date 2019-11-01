import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcesoLogeoService {

  paso:number =null;  //Modo de inicio =>  1 = Login normal, 2 = Nuevo Administrador
  modo:number =null;   //pasos de registro de administrador =>  1 = Registro, 2 = Validación código

  constructor() {
    this.modo = 0;
    this.paso = 0;
  }
}
