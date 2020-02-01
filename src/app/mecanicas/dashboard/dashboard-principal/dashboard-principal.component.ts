import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AmbienteService } from '@servicios/ambiente.service';


@Component({
  selector: 'dashboard-principal',
  templateUrl: './dashboard-principal.component.html',
  styleUrls: ['./dashboard-principal.component.css']
})
export class DashboardPrincipalComponent implements OnInit {

  constructor(
    private rutas: Router,
    private servicioAmbiente : AmbienteService
  )
  {  }

  ngOnInit() {

    this.rutas.navigate(['/estadisticas'], { skipLocationChange: false });
  }


}
