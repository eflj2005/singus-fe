import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AmbienteService } from '@app/servicios/ambiente.service';


@Component({
  selector: 'app-inicio-principal',
  templateUrl: './inicio-principal.component.html',
  styleUrls: ['./inicio-principal.component.css']
})
export class InicioPrincipalComponent implements OnInit {
  
 
  
  constructor( 
    private datosAmbiente: AmbienteService,
    private llamadoHttp :HttpClient
  ) {
    


    
  }

  ngOnInit() {
    this.ValidarAdministrador();
  }

  ValidarAdministrador(){
    // this.datosAmbiente.inicioModo=3;
    // this.datosAmbiente.InicioPaso=1;    
    
    // setTimeout(() => 
    // {
    //   this.datosAmbiente.inicioModo=1;
    //   this.datosAmbiente.InicioPaso=1;   
    // },
    // 5000);

    // let respuest = this.llamadoHttp.get(this.datosAmbiente.getUrlRecursos()+"pasarela.php?accion=inicio").subscribe(
    //   respuesta => {  
    //     this.datosAmbiente.inicioModo=1;
    //     this.datosAmbiente.InicioPaso=1;        
    //     console.log(respuesta);
    //   },
    //   error     => {  
    //     if(error.status != 0 ){
    //       let miError =  error.error;
    //       switch (miError.codigo){
    //         case 404:
    //           console.log(this.datosAmbiente.inicioModo); 
      
    //           this.datosAmbiente.inicioModo=2;
    //           this.datosAmbiente.InicioPaso=1;
    //           console.log(this.datosAmbiente.inicioModo); 
      
    //         break;
    //       }

    //     }
    //     console.log(error); 
      
    //   },
    //   ()        => {  console.log("Completado");    }
    // );


   // let respuesta = this.http.get(this.ruta+'validar.php?accion=consultarParentescos' )

    /*

      AQUI VA EL LLAMADO PARA IDENTIFICAR SI HAY ADMINISTRADOR O NO


    */

  }


}
