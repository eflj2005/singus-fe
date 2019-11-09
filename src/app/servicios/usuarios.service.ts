import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  paso:number =null;  //pasos de registro de administrador =>  1 = Registro, 2 = Validación código
  modo:number =null;  //Modo de inicio =>  1 = Login normal, 2 = Nuevo Administrador, 3 = Recuperación Clave

  constructor() {
    this.modo = 3;
    this.paso = 1;
  }
}
