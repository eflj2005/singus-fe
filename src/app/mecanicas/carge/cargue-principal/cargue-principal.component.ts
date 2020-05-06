import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { AmbienteService } from '@servicios/ambiente.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RespuestaInterface } from '@interfaces/respuesta.interface';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cargue-principal',
  templateUrl: './cargue-principal.component.html',
  styleUrls: ['./cargue-principal.component.css']
})


export class CarguePrincipalComponent implements OnInit, AfterViewInit  {
  @ViewChild('inputArchivo',{static: false}) inputArchivo: ElementRef;

  estructurasArchivos = { 
    tipo_1: [
      "RECTORIA",
      "NOMBRE_RECTORIA",
      "SEDE",
      "DESCRIPCION_SEDE",
      "SPRIDEN_ID",
      "TIPO_DOCUMENTO",
      "DOCUMENTO",
      "APELLIDOS",
      "P_NOMBRE",
      "S_NOMBRE",
      "SECUENCIA",
      "FACULTAD",
      "PROGRAMA",
      "NOMBRE_PROGRAMA",
      "PROGRAMAS_ACREDITADOS",
      "CARRERA",
      "CIUDAD_EXP_DOC",
      "GENERO",
      "STATUS_RESUL",
      "FEC_CAMBIO_STATUS",
      "EDAD",
      "NIVEL",
      "JORNADA_DESC",
      "TEL_RE",
      "TEL_TR",
      "TEL_CEL",
      "MAIL_ESTU",
      "CREDITOS_TOTAL_INSCRITOS",
      "CREDITOS_TOTAL_APROBADOS",
      "PROMEDIO",
      "STATUS_GRADO",
      "PER_GRADO",
      "ANIO_GRADO",
      "FECHA_GRADO",
      "ACTA_GRADO",
      "LIBRO",
      "FOLIO",
      "N_DIPLOMA",
      "SHRDGIH_HONR_CODE"        
    ],
    tipo_2: ["..."]
  }

  controlCargue  =  { 
    tipo: 1, 
    nombre : "Graduados - Argus", 
    nombreArchivo: "",
    progresoTotal: 0, 
    pasoActualValor: 1, 
    pasoActualNombre: "Selección de Archivo", 
    pasoActualProgreso: 0  
  }

  datosArchivo: File = null;
  contendoArchivo: any = null;          //borrar y convertir en varieable local
  
  seleccionarTodos: any = {
    nuevasPersonas: false,
    nuevosEstudios: false,
    conCambios: false
  }
  

  arregloArchivo: any[] = [];
  arregloResumen: any[] = [];
  arregloNuevasPersonas: any[] = [];
  arregloNuevosEstudios: any[] = [];
  arregloCambios: any[] = [];

  constructor( 
    progreso: NgbProgressbarConfig,
    private servicioAmbiente : AmbienteService,
    private llamadoHttp : HttpClient,
    private utilidadFechas: DatePipe
  ) { 

    progreso.max      = 100;
    progreso.striped  = true;
    progreso.animated = true;
    progreso.type     = 'info';
    progreso.height   = '20px';

    this.controlCargue.tipo = 1; //OJO ------------------------------------- AJUSTAR SEGUN MENU

    this.CambiarPaso(1);
  }

  ngOnInit() {
  }

  ngAfterViewInit () {
    // Ahora puedes utilizar el componente hijo
  }
  
  CambiarPaso(nuevoPaso: number){

    this.controlCargue.pasoActualValor = nuevoPaso;

    switch (this.controlCargue.tipo) {
      case 1:
        switch (nuevoPaso) {
          case 1:
            this.controlCargue.nombre =  "Graduados - Argus", 
            this.controlCargue.progresoTotal =  0, 
            this.controlCargue.pasoActualNombre =  "Selección de Archivo";
            this.controlCargue.pasoActualProgreso =  0  
          break;
          case 2:
            this.controlCargue.progresoTotal =  21, 
            this.controlCargue.pasoActualNombre =  "Analisis de Archivo";
            this.controlCargue.pasoActualProgreso =  0  
          break;
          case 3:
            this.controlCargue.progresoTotal =  61, 
            this.controlCargue.pasoActualNombre =  "Procesado de Archivo"; 
            this.controlCargue.pasoActualProgreso =  0  
          break;     
        break;
      }
    }
  
  }

  SeleccionarArchivo(fileInput: any){
    this.datosArchivo = <File>fileInput.target.files[0];
    console.log(this.datosArchivo);
  }

  CargarArchivo(){
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = this.datosArchivo;
    let conteoRef: number;

    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        if(name == "Datos"){
          console.log( XLSX.utils.decode_range(sheet['!ref']) );
          initial[name] = XLSX.utils.sheet_to_json( sheet, {defval:"", range: 1, header: this.estructurasArchivos.tipo_1} );
        }
        return initial;
      }, {});
      
      const dataString = JSON.stringify(jsonData);
      this.contendoArchivo = dataString;

      let ObjetoLibro = JSON.parse( this.contendoArchivo );
     
      if( !("Datos" in ObjetoLibro) ) {
        alert("No se encontro hoja 'datos' en archivo");
        this.controlCargue.nombreArchivo = ""
        this.inputArchivo.nativeElement.value = null;
        this.datosArchivo = null;
        this.arregloResumen = [];
      }
      else{
        this.arregloArchivo = ObjetoLibro.Datos;

        this.arregloResumen = [];
        conteoRef = 1;

        this.arregloArchivo.forEach((registro: any, indice: any) => {

          let posActual: number;
          let encontrado: boolean;
          let posicionCohorte: number;
          let posicionPrograma: number;


          this.arregloArchivo[indice].ref = "#"+conteoRef;
          conteoRef++;

          this.arregloArchivo[indice].seleccionado = false;


          let fechaTemp = this. ExcelDateToJSDate( this.arregloArchivo[indice].FECHA_GRADO );
          this.arregloArchivo[indice].FECHA_GRADO =  this.utilidadFechas.transform( fechaTemp, 'yyyy-MM-dd');

          posActual = 0;
          encontrado = false;
          while(posActual < this.arregloResumen.length && !encontrado ){
            if( registro.PER_GRADO == this.arregloResumen[posActual].cohorte )  encontrado = true;
            else                                                                posActual++;
          }

          if(!encontrado){
            posicionCohorte = this.arregloResumen.length;
            this.arregloResumen.push( { cohorte: registro.PER_GRADO , cantidad : 0 ,  programas : [] } );
          }
          else{
            posicionCohorte = posActual;
          }

          posActual = 0;
          encontrado = false;
          while(posActual < this.arregloResumen[posicionCohorte].programas.length && !encontrado ){
            if( registro.NOMBRE_PROGRAMA == this.arregloResumen[posicionCohorte].programas[posActual].nombre ) encontrado = true;
            else                                                                                              posActual++;
          }

          if(!encontrado){
            posicionPrograma = this.arregloResumen[posicionCohorte].programas.length;
            this.arregloResumen[posicionCohorte].programas.push( { nombre: registro.NOMBRE_PROGRAMA , cantidad : 0  } );
          }
          else{
            posicionPrograma = posActual;
          }

          this.arregloResumen[posicionCohorte].cantidad++;
          this.arregloResumen[posicionCohorte].programas[posicionPrograma].cantidad++;

        });

        this.controlCargue.nombreArchivo = this.datosArchivo.name
        this.inputArchivo.nativeElement.value = null;
        this.datosArchivo = null;
      }
    }
    reader.readAsBinaryString(file);    
  }


  AnalizarDatos( tipoAnalisis: string ){
    var datosAnalizados: any[] = [];
    switch(tipoAnalisis){
      case "Todos":
        datosAnalizados = this.arregloArchivo;
      break;
      case "Cambios":
        datosAnalizados = this.arregloCambios;
      break;
    }

    let parametros = {
      accion : "cargar_registros_tipo1",
      conSeguridad: true,
      modoCargue: 1,
      datos : datosAnalizados 
    };

    console.log(parametros);
    
    this.llamadoHttp.post<any>( this.servicioAmbiente.GetUrlRecursos() + "pasarela.php", parametros).subscribe(
      (respuesta: RespuestaInterface) => {
        if(respuesta.codigo == 200){
          console.log(respuesta);
          
          respuesta.mensaje.nuevasPersonas.forEach((registro: any, indice: any) => {          

            let posActual = 0;
            let encontrado = false;
            while(posActual < this.arregloArchivo.length && !encontrado ){
              if( registro == this.arregloArchivo[posActual].ref )  encontrado = true;
              else                                                  posActual++;
            }

            if(encontrado) this.arregloNuevasPersonas.push( this.arregloArchivo[posActual] );

          });

          respuesta.mensaje.nuevosEstudios.forEach((registro: any, indice: any) => {    

            let posActual = 0;
            let encontrado = false;
            while(posActual < this.arregloArchivo.length && !encontrado ){
              if( registro == this.arregloArchivo[posActual].ref )  encontrado = true;
              else                                                  posActual++;
            }

            if(encontrado) this.arregloNuevosEstudios.push(  this.arregloArchivo[posActual]  );

          });

          respuesta.mensaje.personasCambios.forEach((registro: any, indice: any) => {    

            let posActual = 0;
            let encontrado = false;
            while(posActual < this.arregloArchivo.length && !encontrado ){
              if( registro.referencia == this.arregloArchivo[posActual].ref )  encontrado = true;
              else                                                             posActual++;
            }

            this.arregloArchivo[posActual].cambios = registro.cambios;

            if(encontrado) this.arregloCambios.push( this.arregloArchivo[posActual] );

          });          


          console.log(this.arregloNuevasPersonas);
          console.log(this.arregloNuevosEstudios);
          console.log(this.arregloCambios);

          console.log(respuesta.mensaje.personasCambios);
        }
        else{
          console.log(respuesta);
          alert("Error en proceso de analisis")
        }
        
      }
    );



  }

  ValidarCampoEnObjeto( campo: string, objeto: any ){
    return ( campo in objeto);
  }


  ExcelDateToJSDate(excelDate: number) {

    // JavaScript dates can be constructed by passing milliseconds
    // since the Unix epoch (January 1, 1970) example: new Date(12312512312);

    // 1. Subtract number of days between Jan 1, 1900 and Jan 1, 1970, plus 1 (Google "excel leap year bug")             
    // 2. Convert to milliseconds.

  	return new Date((excelDate - (25567 + 1))*86400*1000);

  }

  SeleccionarTodos(control: string){
    switch(control){
      case 'nuevasPersonas':
        if(this.seleccionarTodos.nuevasPersonas){
          for (var posicion in this.arregloNuevasPersonas) {  
            this.arregloNuevasPersonas[posicion].seleccionado = false;
          }  
          this.seleccionarTodos.nuevasPersonas = false;
        }
        else{
          for (var posicion in this.arregloNuevasPersonas) {  
            this.arregloNuevasPersonas[posicion].seleccionado = true;
          }  
          this.seleccionarTodos.nuevasPersonas = true;
        }
      break;
      case 'nuevosEstudios':
        if(this.seleccionarTodos.nuevosEstudios){
          for (var posicion in this.arregloNuevosEstudios) {  
            this.arregloNuevosEstudios[posicion].seleccionado = false;
          }  
          this.seleccionarTodos.nuevosEstudios = false;
        }
        else{
          for (var posicion in this.arregloNuevosEstudios) {  
            this.arregloNuevosEstudios[posicion].seleccionado = true;
          }  
          this.seleccionarTodos.nuevosEstudios = true;
        }
      break;      
    }
  }

}
