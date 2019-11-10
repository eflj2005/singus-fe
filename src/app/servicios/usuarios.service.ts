import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  modo:number =null;  //Modo de inicio =>  1 = Login normal, 2 = Nuevo Administrador, 3 = Recuperación Clave  
  paso:number =null;  //pasos de registro de administrador =>  1 = Registro, 2 = Validación código

  constructor() {
    this.modo = 1;
    this.paso = 1;
  }
}
