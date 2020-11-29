import { Component, OnInit } from '@angular/core';
import {AmbienteService} from '@servicios/ambiente.service';
import { EventoInterface } from '@interfaces/eventos.interface';
import { EventosController } from "@controladores/eventos.controller";
import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { HttpClient } from '@angular/common/http';
import { EstructuraConsultas } from '@generales/estructura-consultas';
import { OfertasController } from '@controladores/ofertas.controller';
import { OfertasInterface } from '@interfaces/ofertas.interface';


@Component({
  selector: 'app-eventos-componentes-crear',
  templateUrl: './eventos-componentes-crear.component.html',
  styleUrls: ['./eventos-componentes-crear.component.css']
})

export class EventosComponentesCrearComponent implements OnInit {

  ofertaSeleccionada:any;

  pruebaImagen: FileList;
  titulo:string;
  controladorEventos: EventosController;
  datos: EventoInterface;
  today: Date ;
  img: any;
  tieneCertificado: boolean;

  controladorOfertas: OfertasController;

  constructor(private servicioAmbiente : AmbienteService, private llamadoHttp : HttpClient) {
        
    this.tieneCertificado = false;

    this.datos = {
      id: null,
      descripcion:"",
      evento_fecha:"",
      imagen:"predeterminada.png",
      lugar:"",
      nombre:"",
      creacion_fecha: "",
      ofertas_id: null
    };
    this.controladorEventos= new EventosController(this.llamadoHttp,this.servicioAmbiente);
    
    if(this.servicioAmbiente.eventosModo.modo == 1){
      this.titulo="Crear Evento";
      this.today = new Date();

    }else{
      this.titulo="Modificar Evento";
      this.ConsultarEvento(this.servicioAmbiente.eventosModo.datos);
      
      if(this.datos.ofertas_id != null){       
        this.tieneCertificado = true;
      }
    } 

    this.controladorOfertas = new OfertasController(this.llamadoHttp,this.servicioAmbiente);
    this.buscarOfertas();
   }
   

  ngOnInit() {

  }

  Atras(){
    this.servicioAmbiente.eventosModo.modo = 0 ;
    this.servicioAmbiente.eventosModo.datos = null;
  }

  Procesar(){
    this.PonerOferta();

    if(this.servicioAmbiente.eventosModo.modo == 1){
      this.datos.creacion_fecha =  this.today.getFullYear() + "-" + this.ElCero(this.today.getMonth()  + 1) + "-" + this.ElCero(this.today.getDate());
      console.log(this.datos);
      this.controladorEventos.Agregar(this.datos);
    } 
    else{ 
      this.controladorEventos.Modificar(this.datos) ;
    }

     this.controladorEventos.Guardar().subscribe(
       (notificacion:RespuestaInterface) => {
         switch (notificacion.codigo){
           case 200:         //login ok               

             alert("GUARDADO");
 
           break;
            case 400:         //autenticación erronea / Usuario Bloqueado / Usuario Inactivo
           alert(notificacion.asunto + ": " + notificacion.mensaje);
            break;
          }
        }
      ); 

      this.Atras();  
     
  }

  PonerOferta(){
    this.controladorOfertas.registros.forEach(oferta => {
      if(this.ofertaSeleccionada == oferta.descripcion){
        this.datos.ofertas_id = oferta.id;
      }  
    }
    );
  }

  ElCero(numero){
    if(numero<10){
      numero = "0"+numero;
    }

    console.log(numero);
    return numero;
  }

  ConsultarEvento(id: number){

    let evento  = id.toString();
    let caracteristicas = new  EstructuraConsultas();
    caracteristicas.AgregarFiltro("","eventos","id","=", evento );

    this.controladorEventos.CargarDesdeDB(true, "S" , caracteristicas).subscribe(
      (respuesta: RespuestaInterface) =>{

        switch(respuesta.codigo){
          case 200:
            this.controladorEventos.EstaListo("cargue",true).subscribe((valor:boolean) => {
              this.datos = this.controladorEventos.actual;
              if (this.datos.imagen.length == 0) this.datos.imagen  =  "predeterminada.png" ;
            });
            break;
          default:
            alert("Error: "+respuesta.mensaje);
            break;
        }
      }
      );
  }

  buscarOfertas(){
    this.tieneCertificado = true;
    this.controladorOfertas.CargarDesdeDB().subscribe(
      (respuesta: RespuestaInterface) =>{
        switch(respuesta.codigo){
          case 200:
            this.controladorOfertas.EstaListo("cargue",true).subscribe(()=>{
              if(this.datos.ofertas_id != null){
                
                this.controladorOfertas.registros.forEach(oferta => {
                  if(oferta.id == this.datos.ofertas_id) this.ofertaSeleccionada = oferta.descripcion;
                });
              }
            }
            );
            break;
          default:
            alert("Error: "+respuesta.mensaje);
            break;
        }
      }
    );
    
  }

  ImagenSelecionada(event){
    this.pruebaImagen  = event.target.files;
    this.datos.imagen = this.pruebaImagen[0].name;
  }

  estoyListo(controlador:String){
  
    let validador:boolean = false;
    
    if(controlador == "ofertas"){
      validador = this.controladorOfertas.EstaListo("cargue");
    }
    else{
      if(this.servicioAmbiente.eventosModo.modo == 1){
        validador = true;
      }
      else{
        validador = this.controladorEventos.EstaListo("cargue");
      }
    }

    return validador;
  }

}
