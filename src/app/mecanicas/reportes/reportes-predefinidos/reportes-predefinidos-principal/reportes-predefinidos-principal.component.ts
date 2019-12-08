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
        descripcion:["General"],        
        etiquetas:['Muy Insatisfecho','Insatisfecho','Satisfecho','Muy Satisfecho'],
        datos:[ 62, 91, 128, 275],
        colores:[{ backgroundColor:['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Por Año"],
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
        cabecera: [ "", "2013", "2014", "2015", "2016", "2017", "2018", "Total"],
        cuerpo:[
          [ 'Muy Insatisfecho', 13, 27, 45, 26,  10, 15,  136 ],
          [ 'Insatisfecho',     9,  19, 28, 30,  22, 13,  121 ],
          [ 'Satisfecho',       30, 22, 10,  9,  15, 33,  119 ],
          [ 'Muy Satisfecho',   46, 29,  8,  2,  26, 44,  155 ],
        ],
        pie: [ 'Total', 98, 97, 91, 67, 73, 105, 531 ]
      },      
      torta: {
        descripcion:["General"],        
        etiquetas:['Muy Insatisfecho','Insatisfecho','Satisfecho','Muy Satisfecho'],
        datos:[ 136, 121, 119, 155],
        colores:[{ backgroundColor:['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Por Año"],
        etiquetas:["2013", "2014", "2015", "2016", "2017", "2018"],
        datos:[
          { data:[ 13,  27,  45, 26, 10,  15 ],  label:'Muy Insatisfecho'  },
          { data:[ 9, 19, 28, 30,  22, 13 ],  label:'Insatisfecho'      },
          { data:[ 30, 22, 10,  9,  15, 33 ],   label:'Satisfecho'        },
          { data:[ 46, 29,  8,  2,  26, 44 ],  label:'Muy Satisfecho'    },        
        ],
      }
    },{ 
      descripcion:'¿Nivel de satisfacion con la disponibilidad de tiempo de los profesores (1-4), 1 corresponde a "muy insatisfecho" y 4 a "muy satisfecho"',
      tabla:{
        cabecera: [ "", "2013", "2014", "2015", "2016", "2017", "2018", "Total"],
        cuerpo:[
          [ 'Muy Insatisfecho', 40, 27, 15, 36, 20, 10, 148 ],
          [ 'Insatisfecho',     30, 13, 10, 24, 15, 20, 112  ],
          [ 'Satisfecho',       20, 18, 25, 10, 30, 35,  138 ],
          [ 'Muy Satisfecho',   15, 32, 40, 15, 25, 45, 172 ],
        ],
        pie: [ 'Total', 105, 90, 90, 85, 90, 110, 570 ]
      },      
      torta: {
        descripcion:["General"],        
        etiquetas:['Muy Insatisfecho','Insatisfecho','Satisfecho','Muy Satisfecho'],
        datos:[ 148, 112, 138, 172],
        colores:[{ backgroundColor:['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Por Año"],
        etiquetas:["2013", "2014", "2015", "2016", "2017", "2018"],
        datos:[
          { data:[ 40, 27, 15, 36, 20, 10 ],  label:'Muy Insatisfecho'  },
          { data:[ 30, 13, 10, 24, 15, 20 ],  label:'Insatisfecho'      },
          { data:[ 20, 18, 25, 10, 30, 35 ],   label:'Satisfecho'        },
          { data:[ 15, 32, 40, 15, 25, 45 ],  label:'Muy Satisfecho'    },        
        ],
      }
    },
    { 
      descripcion:'¿Nivel de satisfacion con la Opotunidad de participacion  en   actividades extracurriculares (1-4), 1 corresponde a "muy insatisfecho" y 4 a "muy satisfecho"',
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
        descripcion:["General"],        
        etiquetas:['Muy Insatisfecho','Insatisfecho','Satisfecho','Muy Satisfecho'],
        datos:[ 62, 91, 128, 275],
        colores:[{ backgroundColor:['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Por Año"],
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
      descripcion:'¿Nivel de satisfacion con las relaciones interpersonales con la comunidad institucional (1-4), 1 corresponde a "muy insatisfecho" y 4 a "muy satisfecho"',
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
        descripcion:["General"],        
        etiquetas:['Muy Insatisfecho','Insatisfecho','Satisfecho','Muy Satisfecho'],
        datos:[ 62, 91, 128, 275],
        colores:[{ backgroundColor:['rgba(255,0,0,0.3)','rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Por Año"],
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
      descripcion:'¿Existe un balance entre las actividades extracurriculares y académicas?',
      tabla:{
        cabecera: [ "", "2013", "2014", "2015", "2016", "2017", "2018", "Total"],
        cuerpo:[
          [ 'Si', 3,  7,  15, 18, 8,  11, 62 ],
          [ 'No',     10, 13, 23, 8,  22, 15, 91  ]
        ],
        pie: [ 'Total', 69, 64, 138, 92, 132, 61, 556 ]
      },      
      torta: {
        descripcion:["General"],        
        etiquetas:['Si','No'],
        datos:[ 62, 91],
        colores:[{ backgroundColor:['rgba(0,255,0,0.3)','rgba(247, 234, 0)']}]
      },
      barras:{
        descripcion:["Por Año"],
        etiquetas:["2013", "2014", "2015", "2016", "2017", "2018"],
        datos:[
          { data:[ 3,  7,  15, 18, 8,  11 ],  label:'Si'  },
          { data:[ 10, 13, 23, 8,  22, 14 ],  label:'No'      }       
        ],
      }
    },
  ]
 
  




  seleccion: any;

  datosEstadistica: any = []

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      labels: [
        {
          render: 'label',
          position: 'outside'
        },
        {
          render: 'value'
        }
      ],
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['Agronomia, Veterinaria y afines',
                                    'Bellas artes', 
                                    'Ciencias de la educación', 
                                    'Ciencias de la salud',
                                    'Ciencias sociales y humanas',
                                    'Economia, Administración y afines',
                                    'Ingenieria, arquitectura y afines',
                                    'Matematicas y ciencias naturales' 
                                  ];
  public pieChartData: number[] = [300, 
                                  500, 
                                  100,
                                  250,
                                  305,
                                  780, 
                                  600,
                                  355];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 
                        'rgba(0,255,0,0.3)',  
                        'rgba(0,0,255,0.3)',
                        '#42A921',
                        '#2136A9',
                        '#8621A9',
                        '#A9214B',
                        '#A9212E',
                      ],
    },
  ];



  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };


  public barChartLabels: Label[] = ['2010', '2011', '2012', '2013', '2014', '2015', '2016'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Agronomia, Veterinaria y afines' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Bellas artes' },
    { data: [50, 35, 88, 20, 13, 85, 66], label: 'Ciencias de la educación' },
    { data: [86, 77, 47, 56, 76, 25, 90], label: 'Ciencias de la salud' },
    { data: [28, 38, 50, 39, 56, 20, 30], label: 'Ciencias sociales y humanas' },
    { data: [68, 78, 60, 89, 86, 77, 90], label: 'Economia, Administración y afines' },
    { data: [28, 48, 40, 20, 33, 27, 40], label: 'Ingenieria, arquitectura y afines' },
    { data: [27, 28, 30, 39, 46, 37, 45], label: 'Matematicas y ciencias naturales' }
  ];

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







}

