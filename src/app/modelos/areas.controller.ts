import { Injectable } from '@angular/core';
import { GenericoModel } from './generico.model';
import { AreaInterface } from './area.interface';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class AreasController extends GenericoModel {

  registros: AreaInterface[]= [];

  constructor(
    private llamadoHttp :HttpClient
  ) 
  {
    super();
  }


}
