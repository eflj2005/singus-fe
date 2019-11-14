import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AutenticacionService } from '@servicios/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class GuardianService implements CanActivate{

  constructor(
    private enrutador: Router,
    private autenticador: AutenticacionService
  ) { }
 
  canActivate(
    ruta: ActivatedRouteSnapshot, 
    estado: RouterStateSnapshot
  ) 
  {
    let resultado = false;
    const usuarioActual = this.autenticador.UsuarioActualValor;
    if(usuarioActual){
      resultado = true;
    }

    this.enrutador.navigate(['/login'], {queryParams: { returnUrl: estado.url } });
    return resultado;

  }


}
