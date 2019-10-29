import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:string= null;
  clave:string= null;

  error:any = null;

  estado:number = null;

  constructor() { }

  ngOnInit() {
    this.usuario="";
    this.clave="";
  }

}
