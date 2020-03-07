import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cargue-principal',
  templateUrl: './cargue-principal.component.html',
  styleUrls: ['./cargue-principal.component.css']
})


export class CarguePrincipalComponent implements OnInit, AfterViewInit  {
  @ViewChild('inputArchivo',{static: false}) inputArchivo: ElementRef;

  controlCargue  =  { 
    tipo: 1, 
    nombre : "Graduados - Argus", 
    progresoTotal: 0, 
    pasoActualValor: 1, 
    pasoActualNombre: "Selección de Archivo", 
    pasoActualProgreso: 0  
  }

  datosArchivo: File = null;
  contendoArchivo: any = null;          //borrar y convertir en varieable local
  
  arregloArchivo: any[] = [];
  arregloResumen: any[] = [];
  
  constructor( progreso: NgbProgressbarConfig) { 

    progreso.max      = 100;
    progreso.striped  = true;
    progreso.animated = true;
    progreso.type     = 'info';
    progreso.height   = '20px';

    this.controlCargue.tipo = 1; //OJO ------------------------------------- AJUSTAR SEGUN MENU

    this.controlCargue.pasoActualValor = 1;
    this.CambiarPaso();
  }

  ngOnInit() {
  }

  ngAfterViewInit () {
    // Ahora puedes utilizar el componente hijo
  }
  
  CambiarPaso(){
    switch (this.controlCargue.tipo) {
      case 1:
        switch (this.controlCargue.pasoActualValor) {
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

    let campos = [
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
      "programa",
      "nombrePrograma",
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
      "cohorte",
      "ANIO_GRADO",
      "FECHA_GRADO",
      "ACTA_GRADO",
      "LIBRO",
      "FOLIO",
      "N_DIPLOMA",
      "SHRDGIH_HONR_CODE"        
    ]



    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        if(name == "Datos"){
          console.log( XLSX.utils.decode_range(sheet['!ref']) );
          initial[name] = XLSX.utils.sheet_to_json( sheet, {defval:"", range: 1, header: campos } );
        }
        return initial;
      }, {});
      
      // const dataString = JSON.stringify(jsonData);
      // this.contendoArchivo = dataString;

      // let ObjetoLibro = JSON.parse( this.contendoArchivo );
     
      // if( "Datos" in ObjetoLibro) this.arregloArchivo = ObjetoLibro.Datos;
      // else                        alert("No se encontro hoja 'datos' en archivo");

      // // console.log( this.arregloArchivo );


      // this.arregloResumen = [];

      // this.arregloArchivo.forEach((registro: any, indice: any) => {

      //   let posActual: number;
      //   let encontrado: boolean;
      //   let posicionCohorte: number;
      //   let posicionPrograma: number;

      //   posActual = 0;
      //   encontrado = false;
      //   while(posActual < this.arregloResumen.length && !encontrado ){
      //     if( registro.cohorte == this.arregloResumen[posActual].cohorte )  encontrado = true;
      //     else                                                              posActual++;
      //   }

      //   if(!encontrado){
      //     posicionCohorte = this.arregloResumen.length;
      //     this.arregloResumen.push( { cohorte: registro.cohorte , cantidad : 0 ,  programas : [] } );
      //   }
      //   else{
      //     posicionCohorte = posActual;
      //   }

      //   posActual = 0;
      //   encontrado = false;
      //   while(posActual < this.arregloResumen[posicionCohorte].programas.length && !encontrado ){
      //     if( registro.nombrePrograma == this.arregloResumen[posicionCohorte].programas[posActual].nombre ) encontrado = true;
      //     else                                                                                              posActual++;
      //   }

      //   if(!encontrado){
      //     posicionPrograma = this.arregloResumen[posicionCohorte].programas.length;
      //     this.arregloResumen[posicionCohorte].programas.push( { nombre: registro.nombrePrograma , cantidad : 0  } );
      //   }
      //   else{
      //     posicionPrograma = posActual;
      //   }

      //   this.arregloResumen[posicionCohorte].cantidad++;
      //   this.arregloResumen[posicionCohorte].programas[posicionPrograma].cantidad++;

      // });

      // console.log(this.arregloResumen);
  
    }
    reader.readAsBinaryString(file);    
    this.inputArchivo.nativeElement.value=null; 

  }


}
