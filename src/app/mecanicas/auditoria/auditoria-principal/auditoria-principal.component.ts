import { Component, OnInit , PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { UsuarioInterface } from '@interfaces/usuario.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


interface Graduados {
  Id: number;
  IdUniminuto: number;
  Nombre: string;
  Apellidos: string;
  cohorte: string;
  Programa: string;
}

interface Usuario {
  id: number;
  documento: number;
  nombres: string;
  rol: string;
}

@Component({
  selector: 'app-auditoria-principal',
  templateUrl: './auditoria-principal.component.html',
  styleUrls: ['./auditoria-principal.component.css'],
  providers: [DecimalPipe]
})
export class AuditoriaPrincipalComponent implements OnInit {

  usuarios$: Observable<Usuario[]>;
  graduados$: Observable<Graduados[]>;

  USUARIO: Array<Usuario> = [
    {
      id: 1234,
      documento: 123456,
      nombres: "usuario1",
      rol:"estandar"
    },
    {
      id: 123456,
      documento:123456,
      nombres: "usuario1",
      rol:"estandar"
    },
    {
      id: 123456789,
      documento:123456,
      nombres: "usuario1",
      rol:"estandar"
    }
  ];

  GRADUADO: Array<Graduados> = [
    {
      Id: 987654,
      IdUniminuto: 2589,
      Nombre: "graduado1",
      Apellidos: "graduado1",
      cohorte: "201815",
      Programa: "Contaduria publica"
    },
    {
      Id: 789456,
      IdUniminuto: 9865,
      Nombre: "graduado2",
      Apellidos: "graduado2",
      cohorte: "201815",
      Programa: "Comunucacion social"
    },
    {
      Id: 456987,
      IdUniminuto: 6654,
      Nombre: "graduado3",
      Apellidos: "graduado3",
      cohorte: "201815",
      Programa: "Contaduria publica"
    }
  ];

  filter = new FormControl('');
  filter2 = new FormControl('');

  constructor(private pipe: DecimalPipe, private modal: NgbModal) {
    this.AplicarFiltros();
  }

  ngOnInit() {
  }

  AplicarFiltros(){



    this.usuarios$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.buscar(text, this.pipe, 1 ))
    );

    this.graduados$ = this.filter2.valueChanges.pipe(
      startWith(''),
      map(text => this.buscar(text, this.pipe, 2 ))
    );

  }

  buscar(text: string , pipe: PipeTransform, tipo: number ): any {

    if (tipo == 1) {

      return this.USUARIO.filter(usuario => {
        const term = text.toLowerCase();
        return pipe.transform(usuario.id).includes(term)
            || pipe.transform(usuario.documento).includes(term)
            || usuario.nombres.toLowerCase().includes(term)
            || usuario.rol.toLowerCase().includes(term);
      });

    } else {
       
      console.log("aqui");
      return this.GRADUADO.filter(graduado => {
        const term = text.toLowerCase();
        return graduado.Nombre.toLowerCase().includes(term)
            || graduado.Programa.toLowerCase().includes(term)
            || pipe.transform(graduado.Id).includes(term)
            || pipe.transform(graduado.IdUniminuto).includes(term)
            || graduado.cohorte.toLowerCase().includes(term)
            || graduado.Apellidos.toLowerCase().includes(term);
      });

    }
  }

  VerHistorial(historia){
    const respuesta  = this.modal.open(historia, { centered: true , backdropClass: 'light-blue-backdrop' } );
  }

}
