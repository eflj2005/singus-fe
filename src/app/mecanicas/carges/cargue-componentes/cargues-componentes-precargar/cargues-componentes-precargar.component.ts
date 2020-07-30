import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cargues-componentes-precargar',
  templateUrl: './cargues-componentes-precargar.component.html',
  styleUrls: ['./cargues-componentes-precargar.component.css']
})
export class CarguesComponentesPrecargarComponent implements OnInit {
  @ViewChild('inputArchivo',{static: false}) inputArchivo: ElementRef;
  @Input() controlCargue : { [inndice:string] : any};
  
  datosArchivo: File = null;

  nombreArchivo: string = "";

  arregloResumen: any[];


  constructor(
    private utilidadFechas: DatePipe
  ) { 

  }


  ngOnInit() {
    this.arregloResumen = [];
  }

  SeleccionarArchivo(fileInput: any){
    this.datosArchivo = <File>fileInput.target.files[0];
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
          initial[name] = XLSX.utils.sheet_to_json( sheet, {defval:"", range: 1, header: this.controlCargue.caracteristicas.estructura} );
        }
        return initial;
      }, {});
      
      const dataString = JSON.stringify(jsonData);
      let contendoArchivo: string = dataString;

      let ObjetoLibro = JSON.parse( contendoArchivo );
     
      if( !("Datos" in ObjetoLibro) ) {
        alert("No se encontro hoja 'datos' en archivo");
        this.nombreArchivo = "";
        this.inputArchivo.nativeElement.value = null;
        this.datosArchivo = null;
        // this.arregloResumen = [];
      }
      else{
        this.controlCargue.datos = ObjetoLibro.Datos;

        conteoRef = 1;

        this.controlCargue.datos.forEach((registro: any, indice: any) => {

          let posActual: number;
          let encontrado: boolean;
          let posicionCohorte: number;
          let posicionPrograma: number;


          registro.ref = "#"+conteoRef;
          conteoRef++;

          // registro.seleccionado = false;

          let fechaTemp = this.ExcelDateToJSDate( registro.FECHA_GRADO );
          registro.FECHA_GRADO =  this.utilidadFechas.transform( fechaTemp, 'yyyy-MM-dd');

          registro.foraneas = {};
          registro.foraneas.tiposdocumentos_id=null;
          registro.foraneas.municipios_id=null;
          registro.foraneas.programas_id=null;

        });

        this.nombreArchivo = this.datosArchivo.name
        this.inputArchivo.nativeElement.value = null;
        this.datosArchivo = null;
      }
      this.GenerarResumen();
    }
    reader.readAsBinaryString(file); 
  }

  GenerarResumen(){
    switch(this.controlCargue.caracteristicas.tipo){
      case 1:
        this.arregloResumen = [];

        this.controlCargue.datos.forEach((registro: any, indice: any) => {

          let posActual: number;
          let encontrado: boolean;
          let posicionCohorte: number;
          let posicionPrograma: number;

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

      break;
    }

  }

  ExcelDateToJSDate(excelDate: number) {

    // JavaScript dates can be constructed by passing milliseconds
    // since the Unix epoch (January 1, 1970) example: new Date(12312512312);

    // 1. Subtract number of days between Jan 1, 1900 and Jan 1, 1970, plus 1 (Google "excel leap year bug")             
    // 2. Convert to milliseconds.

  	return new Date((excelDate - (25567 + 1))*86400*1000);

  }

}
