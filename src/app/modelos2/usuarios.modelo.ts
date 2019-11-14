import { Injectable } from '@angular/core';
import { GenericoControlador } from './generico.modelo';

export interface IUsuariosInterface {
    id: number;
    documento: Number;
    nombres: String;
    apellidos: String;
    telefono: Date;
    fechacreacion: string;
    roles_id:number;
    areas_id:number;
  }
  
  @Injectable({
    providedIn: 'root'
  })
  export class UsuariosControlador extends GenericoControlador{
  
    registros: IUsuariosInterface[]= [];

    public ExisteAdministrador(){

    }

  }

