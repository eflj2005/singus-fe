import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

import { Label } from 'ng2-charts';

interface Cohorte { 
  Id:number,
  Nombre:number,
  Seleccionado: boolean} 

interface Programas { 
  Id:number,
  Nombre:string,
  Seleccionado: boolean} 

interface Sedes { 
  Id:number,
  Nombre:string,
  Seleccionado: boolean} 

@Component({
  selector: 'app-reportes-predefinidos-principal',
  templateUrl: './reportes-predefinidos-principal.component.html',
  styleUrls: ['./reportes-predefinidos-principal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReportesPredefinidosPrincipalComponent implements OnInit {

  public escalaPdf = 0.48;

  cohortes: Array<Cohorte> = [
    { Id:1, Nombre:201965,  Seleccionado: false },
    { Id:2, Nombre:201935,  Seleccionado: false },
    { Id:3, Nombre:201974,  Seleccionado: false },
    { Id:4, Nombre:201945,  Seleccionado: false },
    { Id:5, Nombre:201862,  Seleccionado: false }
  ];

  programas: Array<Programas> = [ 
    {  Id:1,  Nombre:'Agronomia, Veterinaria y afines',   Seleccionado: false },
    {  Id:2,  Nombre:"Bellas artes",                      Seleccionado: false },
    {  Id:3,  Nombre:"Ciencias de la educación",          Seleccionado: false },
    {  Id:4,  Nombre:'Ciencias de la salud',              Seleccionado: false },
    {  Id:5,  Nombre:'Matematicas y ciencias naturales',  Seleccionado: false }
  ];

  sedes: Array<Sedes> = [ 
    { Id:1, Nombre:'Ibagué',        Seleccionado: false },
    { Id:2, Nombre:"Puerto Boyaca", Seleccionado: false },
    { Id:3, Nombre:"Fresno",        Seleccionado: false },
    { Id:4, Nombre:'Cajamarca',     Seleccionado: false },
    { Id:5, Nombre:'Líbano',        Seleccionado: false }
  ];
  
  datos: any = [
    { 
      descripcion:'¿Nivel de satisfacion con su institucion (1-4), 1 corresponde a "muy insatisfecho" y 4 a "muy satisfecho"',
      tabla:{
        cabecera: [ "", "201610", "201660", "201710", "201760", "201810", "201860", "Total"],
        cuerpo:[
          [ 'Muy Insatisfecho', 3,  7,  15, 18, 8,  11, 62 ],
          [ 'Insatisfecho',     10, 13, 23, 8,  22, 15, 91  ],
          [ 'Satisfecho',       26, 18, 44, 22, 15, 3,  128 ],
          [ 'Muy Satisfecho',   30, 26, 56, 44, 87, 32, 275 ],
        ],
        pie: [ 'Total', 69, 64, 138, 92, 132, 61, 556 ]
      },      
      torta: {
        descripcion:["Nivel de Satisfacción General"],        
        etiquetas:['Muy Insatisfecho','Insatisfecho','Satisfecho','Muy Satisfecho'],
        datos:[ 62, 91, 128, 275],
        colores:[{ backgroundColor:['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Nivel de satisfacción por cohorte"],
        etiquetas:["201610", "201660", "201710", "201760", "201810", "201860"],
        datos:[
          { data:[ 3,  7,  15, 18, 8,  11 ],  label:'Muy Insatisfecho'  },
          { data:[ 10, 13, 23, 8,  22, 14 ],  label:'Insatisfecho'      },
          { data:[ 26, 18, 44, 22, 15, 3 ],   label:'Satisfecho'        },
          { data:[ 30, 26, 56, 44, 87, 32 ],  label:'Muy Satisfecho'    },        
        ],
      }
    },
    { 
      descripcion:'¿Nivel de satisfacion con la calidad de formacion integral recibida (1-4), 1 corresponde a "muy insatisfecho" y 4 a "muy satisfecho"',
      tabla:{
        cabecera: [ "","Ibagué", "Lerida", "Fresno", "Dorada", "Puerto Boyaca","Total"],
        cuerpo:[
          [ 'Muy Insatisfecho', 15, 27, 20, 50, 16,128],
          [ 'Insatisfecho',     20,  19, 42, 12, 33,126],
          [ 'Satisfecho',       402, 305, 135, 260, 150,1252],
          [ 'Muy Satisfecho',   200, 102, 393, 215, 146,1056],
        ],
        pie: [ 'Total', 637, 453, 590, 537,345,2562]
      },      
      torta: {
        descripcion:["Nivel genreral de satisfacción"],        
        etiquetas:['Muy Insatisfecho','Insatisfecho','Satisfecho','Muy Satisfecho'],
        datos:[ 128, 126, 1252, 1056],
        colores:[{ backgroundColor:['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Nivel de satisfacion por sedes"],
        etiquetas:["Ibagué", "Lerida", "Fresno", "Dorada", "Puerto Boyaca"],
        datos:[
          { data:[ 15, 27, 20, 50, 16],  label:'Muy Insatisfecho'  },
          { data:[ 20,  19, 42, 12, 33 ],  label:'Insatisfecho'      },
          { data:[ 402, 305, 135, 260, 150 ],   label:'Satisfecho'        },
          { data:[ 200, 102, 393, 215, 146 ],  label:'Muy Satisfecho'    },        
        ],
      }
    },
    { 
      descripcion:'¿Nivel de satisfacion con la disponibilidad de tiempo de los profesores (1-4), 1 corresponde a "muy insatisfecho" y 4 a "muy satisfecho"',
      tabla:{
        cabecera: [ "","Contaduria publica","Administracion finaciera","Administracion de empresas","Comunicaciones","Psicologia","Trabajo social","Lic. en pedagogia infantil","Administracion en seguridad y salud en el trabajo","Total"],
        cuerpo:[
          [ 'Muy Insatisfecho', 8,   15,  12, 21,  20,  30,  18,  20,  144 ],
          [ 'Insatisfecho',     20,  13,  10, 12,  15,  10,  25,  38,  143 ],
          [ 'Satisfecho',       102, 205, 89, 125, 115, 135, 148, 150, 1069 ],
          [ 'Muy Satisfecho',   111, 70,  56, 200, 330, 145, 172, 116, 1200 ],
        ],
        pie: [ 'Total', 241, 303, 167, 358, 480, 320, 363, 324, 2556 ]
      },      
      torta: {
        descripcion:["Nivel general de satisfacción "],        
        etiquetas:['Muy Insatisfecho','Insatisfecho','Satisfecho','Muy Satisfecho'],
        datos:[144,143,1069,1200],
        colores:[{ backgroundColor:['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Nivel de satisfacción por programas"],
        etiquetas:["Contaduria publica","Administracion finaciera","Administracion de empresas","Comunicaciones","Psicologia","Trabajo social","Lic. en pedagogia infantil","Administracion en seguridad y salud en el trabajo"],
        datos:[
          { data:[ 8,   15,  12, 21,  20,  30,  18,  20 ],  label:'Muy Insatisfecho'  },
          { data:[ 20,  13,  10, 12,  15,  10,  25,  38 ],  label:'Insatisfecho'      },
          { data:[ 102, 205, 89, 125, 115, 135, 148, 150 ],   label:'Satisfecho'        },
          { data:[ 111, 70,  56, 200, 330, 145, 172, 116 ],  label:'Muy Satisfecho'    },        
        ],
      }
    },
    { 
      descripcion:'¿Nivel de satisfacion con la Opotunidad de participacion  en   actividades extracurriculares (1-4), 1 corresponde a "muy insatisfecho" y 4 a "muy satisfecho"',
      tabla:{
        cabecera: [ "","201610", "201660", "201710", "201760", "201810", "201860", "Total"],
        cuerpo:[
          [ 'Muy Insatisfecho', 25,  17,  23,  12,  20,  73,  170 ],
          [ 'Insatisfecho',     7,   23,  17,  43,  32,  47,  169 ],
          [ 'Satisfecho',       120, 220, 212, 145, 78,  82,  857 ],
          [ 'Muy Satisfecho',   240, 325, 122, 134, 212, 328, 1361 ],
        ],
        pie: [ 'Total', 392, 585, 374, 334, 342, 530, 2557 ]
      },      
      torta: {
        descripcion:["Nivel de satisfaccion general"],        
        etiquetas:['Muy Insatisfecho','Insatisfecho','Satisfecho','Muy Satisfecho'],
        datos:[ 83, 109, 156, 161],
        colores:[{ backgroundColor:['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Nivel de satisfacción por cohortes"],
        etiquetas:["201610", "201660", "201710", "201760", "201810", "201860"],
        datos:[
          { data:[ 25,  17,  23,  12,  20,  73 ],  label:'Muy Insatisfecho'  },
          { data:[ 7,   23,  17,  43,  32,  47 ],  label:'Insatisfecho'      },
          { data:[ 120, 220, 212, 145, 78,  82 ],   label:'Satisfecho'        },
          { data:[ 240, 325, 122, 134, 212, 328 ],  label:'Muy Satisfecho'    },        
        ],
      }
    },
    { 
      descripcion:'¿Nivel de satisfacion con las relaciones interpersonales con la comunidad institucional (1-4), 1 corresponde a "muy insatisfecho" y 4 a "muy satisfecho"',
      tabla:{
        cabecera: [ "", "Ibagué", "Lerida", "Fresno", "Dorada", "Puerto Boyaca", "Total"],
        cuerpo:[
          [ 'Muy Insatisfecho', 22,  20,  40,  30,  26,   138 ],
          [ 'Insatisfecho',     13,  26,  22,  32,  23,   116 ],
          [ 'Satisfecho',       202, 205, 115, 160, 140,  822 ],
          [ 'Muy Satisfecho',   400, 202, 413, 315, 156,  1486 ],
        ],
        pie: [ 'Total', 637, 453, 590, 537, 345, 2562 ]
      },      
      torta: {
        descripcion:["Nivel general de satisfacción "],        
        etiquetas:['Muy Insatisfecho','Insatisfecho','Satisfecho','Muy Satisfecho'],
        datos:[ 138,116, 822, 1486],
        colores:[{ backgroundColor:['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Nivel de satisfacion por sedes"],
        etiquetas:["Ibagué", "Lerida", "Fresno", "Dorada", "Puerto Boyaca"],
        datos:[
          { data:[ 22,  20,  40,  30,  26],  label:'Muy Insatisfecho'  },
          { data:[ 13,  26,  22,  32,  23],  label:'Insatisfecho'      },
          { data:[ 202, 205, 115, 160, 140],   label:'Satisfecho'       },
          { data:[ 400, 202, 413, 315, 156],  label:'Muy Satisfecho'    },        
        ],
      }
    },
    { 
      descripcion:'¿Existe un balance entre las actividades extracurriculares y académicas?',
      tabla:{
        cabecera: [ "", "Contaduria publica","Administracion finaciera","Administracion de empresas","Comunicaciones","Psicologia","Trabajo social","Lic. en pedagogia infantil","Administracion en seguridad y salud en el trabajo", "Total"],
        cuerpo:[
          [ 'Si',  220, 200, 20,  210,   115, 205, 80, 167 ,  1217 ],
          [ 'No',  120, 220, 400, 139,  135, 166, 130, 132 , 1442 ]
        ],
        pie: [ 'Total', 340, 420, 420, 349, 250, 371,210,299, 2360 ]
      },      
      torta: {
        descripcion:["Percepción del balance general"],        
        etiquetas:['Si','No'],
        datos:[ 350, 2010],
        colores:[{ backgroundColor:['rgba(0,255,0,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Percepción del balance por programa"],
        etiquetas:["Contaduria publica","Administracion finaciera","Administracion de empresas","Comunicaciones","Psicologia","Trabajo social","Lic. en pedagogia infantil","Administracion en seguridad y salud en el trabajo"],
        datos:[
          { data:[ 250, 10, 30,   20,   25, 15 ],  label:'Si'  },
          { data:[ 120, 470, 420, 379,  245, 376 ],  label:'No'      }       
        ],
      }
    },
  ]
 
  




  seleccion: any;

  datosEstadistica: any = []


  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    plugins: {
      labels: [
        { render: 'percentage', position: 'outside' },
        { render: 'value' }
      ],
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;


  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    },    
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      labels: [
        { render: 'value', position: 'outside', fontSize: 10 },
      ],      
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };


  constructor() {
    console.log(this.datos);
   }

  ngOnInit() {


  }


crear(reporte){
  switch (reporte) {
    case 1:

      break;
  
    default:
      break;
  }
}



ExportToPdf(){

}



}

