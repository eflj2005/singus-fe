import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./reportes-predefinidos-principal.component.css']
})
export class ReportesPredefinidosPrincipalComponent implements OnInit {

  public escalaPdf = 0.6;

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

  sedes: Array<Programas> = [ 
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
        cabecera: [ "", "2013", "2014", "2015", "2016", "2017", "2018", "Total"],
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
        descripcion:["Nivel de satisfacción Por Año"],
        etiquetas:["2013", "2014", "2015", "2016", "2017", "2018"],
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
        head:[ "satisfacción con la calidad de formacion integral recibida"],
        body:["Muy Insatisfecho","Insatisfecho","Satisfecho","Muy Satisfecho"]
      },      
      torta: {
        datos:[30,27,12,20],
        descripcion:["Nivel de satisfacion con la calidad de formacion integral recibida"],
        etiquetas:['Muy Insatisfecho','Insatisfecho','Satisfecho','Muy Satisfecho'],
        colores:[{ backgroundColor:['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Nivel de satisfacion con la calidad de formacion integral recibida por año"],
        etiquetas:['2017','2018'],
        datos:[
          { 
            data:[27,3],
            label:'Muy Insatisfecho'
          },
          { 
            data:[17,10],
            label:'Insatisfecho'
          },
          { 
            data:[2,10],
            label:'Satisfecho'
          },{ 
            data:[5,15],
            label:'Muy Satisfecho'
          },
          

        ],
      }
    },{ 
      descripcion:'¿Nivel de satisfacion con la disponibilidad de tiempo de los profesores (1-4), 1 corresponde a "muy insatisfecho" y 4 a "muy satisfecho"',
      tabla:{
        head:[ "satisfacción con la disponibilidad de tiempo de los profesores"],
        body:["Muy Insatisfecho","Insatisfecho","Satisfecho","Muy Satisfecho"]
      },      
      torta: {
        datos:[20,10,30,20],
        descripcion:["Nivel de satisfacion con la disponibilidad de tiempo de los profesores"],
        etiquetas:['Muy Insatisfecho','Insatisfecho','Satisfecho','Muy Satisfecho'],
        colores:[{ backgroundColor:['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Nivel de satisfacion con la disponibilidad de tiempo de los profesores por año"],
        etiquetas:['Niveles de satisfacción 2017','Niveles de satisfacción 2018'],
        datos:[
          { 
            data:[2,18],
            label:'Muy Insatisfecho'
          },
          { 
            data:[3,7],
            label:'Insatisfecho'
          },
          { 
            data:[20,10],
            label:'Satisfecho'
          },{ 
            data:[12,8],
            label:'Muy Satisfecho'
          },
          

        ],
      }
    },
    { 
      descripcion:'¿Nivel de satisfacion con la Opotunidad de participacion  en   actividades extracurriculares (1-4), 1 corresponde a "muy insatisfecho" y 4 a "muy satisfecho"',
      tabla:{
        head:[ "satisfacción con la Opotunidad de participacion  en   actividades extracurriculares"],
        body:["Muy Insatisfecho","Insatisfecho","Satisfecho","Muy Satisfecho"]
      },
      torta: {
        datos:[10,20,30,40],
        descripcion:["Nivel de satisfacion con la Opotunidad de participacion  en   actividades extracurriculares"],
        etiquetas:['Muy Insatisfecho','Insatisfecho','Satisfecho','Muy Satisfecho'],
        colores:[{ backgroundColor:['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Nivel de satisfacion con la Opotunidad de participacion  en   actividades extracurriculares por año"],
        etiquetas:['Niveles de satisfacción 2017','Niveles de satisfacción 2018'],
        datos:[
          { 
            data:[2,8],
            label:'Muy Insatisfecho'
          },
          { 
            data:[20,10],
            label:'Insatisfecho'
          },
          { 
            data:[20,10],
            label:'Satisfecho'
          },{ 
            data:[30,10],
            label:'Muy Satisfecho'
          },
          

        ],
      }
    },
    { 
      descripcion:'¿Nivel de satisfacion con las relaciones interpersonales con la comunidad institucional (1-4), 1 corresponde a "muy insatisfecho" y 4 a "muy satisfecho"',
      tabla:{
        head:[ "satisfacción con las relaciones interpersonales con la comunidad institucional"],
        body:["Muy Insatisfecho","Insatisfecho","Satisfecho","Muy Satisfecho"]
      },      
      torta: {
        datos:[28,10,25,30],
        descripcion:["Nivel de satisfacion con las relaciones interpersonales con la comunidad institucional"],
        etiquetas:['Muy Insatisfecho','Insatisfecho','Satisfecho','Muy Satisfecho'],
        colores:[{ backgroundColor:['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Nivel de satisfacion con las relaciones interpersonales con la comunidad institucional por año"],
        etiquetas:['Niveles de satisfacción 2017','Niveles de satisfacción 2018'],
        datos:[
          { 
            data:[2,26],
            label:'Muy Insatisfecho'
          },
          { 
            data:[3,7],
            label:'Insatisfecho'
          },
          { 
            data:[15,10],
            label:'Satisfecho'
          },{ 
            data:[25,5],
            label:'Muy Satisfecho'
          },
          

        ],
      }
    },
    { 
      descripcion:'¿Existe un balance entre las actividades extracurriculares y académicas?',
      tabla:{
        head:[ "Balance entre las actividades extracurriculares y académicas"],
        body:["Si hay balance","No hay balance"]
      },      
      torta: {
        datos:[28,10],
        descripcion:["Balance entre las actividades extracurriculares y académicas"],
        etiquetas:["Si hay balance","No hay balance"],
        colores:[{ backgroundColor:['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Balance entre las actividades extracurriculares y académicas por año"],
        etiquetas:['Respuestas 2017','Respuestas 2018'],
        datos:[
          { 
            data:[14,14],
            label:'Si hay balance'
          },
          { 
            data:[3,7],
            label:'No hay balance'
          },
         
          

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

