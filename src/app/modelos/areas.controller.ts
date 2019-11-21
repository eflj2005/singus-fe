import { Injectable, Injector } from '@angular/core';
import { GenericoModel } from './generico.model';
import { AreaInterface } from './area.interface';
import { HttpClient } from '@angular/common/http';
import { AmbienteService } from '@app/servicios/ambiente.service';


@Injectable({
  providedIn: 'root'
})
export class AreasController extends GenericoModel {

  registros: AreaInterface[]= [];

  constructor( private injector:Injector ) {
    super( injector.get(HttpClient)  , injector.get(AmbienteService) );
    this.nombreTabla = "areas";
  }


}

