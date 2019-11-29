import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'dashboard-principal',
  templateUrl: './dashboard-principal.component.html',
  styleUrls: ['./dashboard-principal.component.css']
})
export class DashboardPrincipalComponent implements OnInit {

  constructor(
    private rutas: Router,
  )
  {  }

  ngOnInit() {
    this.rutas.navigate(['/estadisticas']);
  }


}
